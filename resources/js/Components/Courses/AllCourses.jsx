import React, { useEffect, useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import CoursesImg from "../../../assets/Courses.jpg";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import { Clock, Users } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const getCourses = async () => {
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/course/categories");
            setCategories(res.data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const filteredCourses = selectedCategory
        ? courses.filter((course) => course.category?.id === selectedCategory)
        : courses;

    const indexOfLastCourse = currentPage * rowsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - rowsPerPage;
    const currentCourses = filteredCourses.slice(
        indexOfFirstCourse,
        indexOfLastCourse
    );

    const totalPages = Math.ceil(filteredCourses.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="px-5 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-medium relative inline-block">
                        All Courses
                    </h2>
                    <div className="flex items-center">
                        <div className="w-10 md:w-20 h-[2px] bg-accentRed"></div>
                        <div className="w-1 h-1 bg-accentRed rounded-full ml-2"></div>
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter By Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem value={category.name}>
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setCurrentPage(1);
                                    }}
                                >
                                    {category.name}
                                </button>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentCourses.map((course) => (
                    <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                        <CardContent className="p-4">
                            <div>
                                <img
                                    src={`/storage/${course.image}`}
                                    alt=""
                                    className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                                />
                                <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                    {course.category.name}
                                </span>
                                <h1 className="my-3 font-medium text-lg">
                                    {course.title}
                                </h1>
                                <div className="flex items-center gap-1 text-sm py-2">
                                    <Users size={16} /> {course.purchases_count}{" "}
                                    students enrolled
                                </div>
                                <div className="flex items-center gap-1 text-sm py-2">
                                    <Clock size={16} /> 18 hours long
                                </div>
                                <div className="py-3">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-700">
                                            Progress
                                        </h1>
                                        <p className="text-black font-medium">
                                            0%
                                        </p>
                                    </div>
                                    <Progress value={0} className="mt-2" />
                                </div>
                                <Link to={`/course/${course.id}`}>
                                    <Button className="w-full mt-3">
                                        Enroll Now
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="my-4">
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
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    onClick={() => handlePageChange(index + 1)}
                                    isActive={currentPage === index + 1}
                                    className="cursor-pointer"
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

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
                                    Math.ceil(courses.length / rowsPerPage)
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
