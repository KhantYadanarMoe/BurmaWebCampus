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
import Empty from "../../../assets/Empty.png";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCartAlert, setShowCartAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6;

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const defaultCategory = params.get("category");

    const categoryId = new URLSearchParams(location.search).get("category");

    useEffect(() => {
        if (defaultCategory) {
            setSelectedCategory(Number(defaultCategory));
            setCurrentPage(1);
        }
    }, [defaultCategory]);

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

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

    const navigate = useNavigate();

    const handleEnrollClick = (course) => {
        const storedCart = JSON.parse(
            localStorage.getItem("enrolledCourses") || "[]"
        );

        if (storedCart.length > 0) {
            // Something is already in the cart
            setShowCartAlert(true);
        } else {
            // Add course to cart and navigate to checkout
            localStorage.setItem("enrolledCourses", JSON.stringify([course]));
            navigate(`/course/${slugify(course.title)}`);
        }
    };

    const selectedCategoryName = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.name
        : null;

    const formatHours = (totalHours) => {
        const hours = Math.floor(totalHours); // full hours
        const minutes = Math.round((totalHours - hours) * 60); // remaining minutes
        return `${hours}h ${minutes}m`;
    };

    return (
        <div className="px-5 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-medium relative inline-block">
                        {selectedCategoryName
                            ? `${selectedCategoryName} Courses`
                            : "All Courses"}
                    </h2>
                    <div className="flex items-center">
                        <div className="w-10 md:w-20 h-[2px] bg-accentRed"></div>
                        <div className="w-1 h-1 bg-accentRed rounded-full ml-2"></div>
                    </div>
                </div>
                <Select
                    value={selectedCategory ? String(selectedCategory) : "all"}
                    onValueChange={(value) => {
                        if (value === "all") {
                            setSelectedCategory(null);
                        } else {
                            setSelectedCategory(Number(value));
                        }
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter By Categories" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>

                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentCourses.length > 0 ? (
                    currentCourses.map((course) => (
                        <Card
                            key={course.id}
                            className="relative bg-white border border-gray-600 shadow-lg rounded-lg"
                        >
                            <CardContent className="p-4">
                                <div>
                                    <img
                                        src={`/storage/${course.image}`}
                                        alt={course.title}
                                        className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                                    />
                                    <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                        {course.category.name}
                                    </span>
                                    <h1 className="my-3 font-medium text-lg">
                                        {course.title}
                                    </h1>
                                    <div className="flex items-center gap-1 text-sm py-2">
                                        <Users size={16} />{" "}
                                        {course.purchases_count} students
                                        enrolled
                                    </div>
                                    <div className="flex items-center gap-1 text-sm py-2">
                                        <Clock size={16} />{" "}
                                        {formatHours(course.total_hours)} {}
                                        long
                                    </div>
                                    <div className="py-3">
                                        <div className="flex justify-between">
                                            <h1 className="text-gray-700">
                                                Progress
                                            </h1>
                                            <p className="text-black font-medium">
                                                {course.progress_percentage}%
                                            </p>
                                        </div>
                                        <Progress
                                            value={course.progress_percentage}
                                            className="mt-2"
                                        />
                                    </div>
                                    <Button
                                        className="w-full mt-3"
                                        onClick={() =>
                                            handleEnrollClick(course)
                                        }
                                    >
                                        Enroll Now
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-2">
                        <img
                            src={Empty}
                            alt="No courses"
                            className="w-32 h-32 mb-4 object-contain"
                        />
                        <h2 className="text-xl font-semibold mb-2">
                            No Courses Found
                        </h2>
                        <p className="text-gray-500 text-center">
                            Sorry, there are no courses available for this
                            category right now. Please check back later or
                            select a different category.
                        </p>
                    </div>
                )}
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
                <AlertDialog
                    open={showCartAlert}
                    onOpenChange={setShowCartAlert}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Cart Alert</AlertDialogTitle>
                            <AlertDialogDescription>
                                Something is already in your cart!
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => setShowCartAlert(false)}
                                className="rounded-lg px-4 py-2 bg-black text-white hover:bg-gray-800"
                            >
                                OK
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
