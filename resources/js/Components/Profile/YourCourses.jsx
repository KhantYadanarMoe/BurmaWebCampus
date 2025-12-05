import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Clock, Users } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function YourCourses() {
    const { user, loading } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const SkeletonCard = () => (
        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
            <CardContent className="p-4">
                <div className="space-y-4">
                    <div className="w-full h-40 lg:h-36 bg-gray-300 animate-pulse rounded-md" />

                    <div className="w-24 h-5 bg-gray-300 animate-pulse rounded-md" />

                    <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded-md" />

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
                        <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md" />
                    </div>

                    <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-300 animate-pulse rounded-full" />
                        <div className="w-28 h-4 bg-gray-300 animate-pulse rounded-md" />
                    </div>

                    <div className="py-1">
                        <div className="flex justify-between mb-2">
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-10 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>

                        <div className="w-full h-3 bg-gray-300 animate-pulse rounded-md" />
                    </div>

                    <div className="w-full h-10 bg-gray-300 animate-pulse rounded-lg mt-3" />
                </div>
            </CardContent>
        </Card>
    );

    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <CourseCardSkeleton key={idx} />
                ))}
            </div>
        );
    }

    if (!user || !user.courses || user.courses.length === 0)
        return <div>You have no enrolled courses.</div>;

    const uniqueCourses = Array.from(
        new Map(user.courses.map((c) => [c.id, c])).values()
    );

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    const indexOfLastCourse = currentPage * rowsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - rowsPerPage;
    const currentCourses = uniqueCourses.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    const totalPages = Math.ceil(uniqueCourses.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const formatHours = (totalHours) => {
        const hours = Math.floor(totalHours);
        const minutes = Math.round((totalHours - hours) * 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="px-5 md:px-6 lg:px-10 py-8">
            <h1 className="text-2xl font-medium mb-6">Your Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentCourses.map((course) => (
                    <Card
                        key={course.id}
                        className="relative bg-white border border-gray-600 shadow-lg rounded-lg"
                    >
                        <div
                            className={`absolute top-0 left-6 h-24 w-10 flex items-center justify-center clip-bookmark ${
                                course.completed
                                    ? "bg-green-600"
                                    : "bg-yellow-600"
                            }`}
                        >
                            <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                                {course.completed ? "Completed" : "Enrolled"}
                            </span>
                        </div>

                        <CardContent className="p-4">
                            <Link
                                to={`/course/${slugify(course.title)}/details/${
                                    course.outlines?.[0]?.subtitles?.[0]
                                        ? slugify(
                                              course.outlines[0].subtitles[0]
                                                  .subtitle
                                          )
                                        : ""
                                }`}
                            >
                                <img
                                    src={
                                        course.image
                                            ? `/storage/${course.image}`
                                            : "/default-course.jpg"
                                    }
                                    alt={course.title}
                                    className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                                />
                                <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                    {course.category || "General"}
                                </span>
                                <h1 className="my-3 font-medium text-lg">
                                    {course.title}
                                </h1>
                                <div className="flex items-center gap-1 text-sm py-2">
                                    <Users size={16} />{" "}
                                    {course.purchases_count || 0} students
                                    enrolled
                                </div>
                                <div className="flex items-center gap-1 text-sm py-2">
                                    <Clock size={16} />{" "}
                                    {formatHours(course.total_hours)} long
                                </div>
                                <div className="py-3">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-700">
                                            Progress
                                        </h1>
                                        <p className="text-black font-medium">
                                            {course.progress || 0}%
                                        </p>
                                    </div>
                                    <Progress
                                        value={course.progress || 0}
                                        className="mt-2"
                                    />
                                </div>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-6 mb-4">
                <Pagination className="text-accentRed">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className={`cursor-pointer ${
                                    currentPage === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            />
                        </PaginationItem>
                        {Array.from(
                            {
                                length: Math.ceil(
                                    uniqueCourses.length / rowsPerPage
                                ),
                            },
                            (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                        className="cursor-pointer"
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                className={`cursor-pointer ${
                                    currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                disabled={
                                    currentPage ===
                                    Math.ceil(
                                        uniqueCourses.length / rowsPerPage
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
