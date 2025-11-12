import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import CourseImg from "../../../assets/Courses.jpg";
import {
    ChevronDown,
    Ellipsis,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function CoursesList() {
    const { darkMode } = useOutletContext();
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

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

    const indexOfLastCourse = currentPage * rowsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - rowsPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(courses.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div>
            <h1 className="text-xl font-medium">Courses</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex items-center gap-2">
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Frontend
                        </span>
                    </Link>
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Backend
                        </span>
                    </Link>
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Fullstack
                        </span>
                    </Link>
                </div>
                <div className="flex items-center justify-end md:justify-normal gap-2">
                    <div className="hidden md:block">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`flex gap-1 items-center px-2 py-1 border ${
                                        darkMode
                                            ? "border-gray-300"
                                            : "border-gray-800"
                                    } rounded-md`}
                                >
                                    <ChevronDown size={16} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-40"
                                avoidCollisions={false}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    Filter By Newest
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    Filter By Oldest
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    Filter By A-Z
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    Filter By Z-A
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Button className="flex gap-1 -mt-8 md:-mt-0 items-center">
                        <Plus />
                        Create
                    </Button>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul
                        className={`flex items-center px-3 py-4 border-b ${
                            darkMode ? "border-b-gray-200" : "border-b-gray-700"
                        } my-3`}
                    >
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[33%]">Course Name</li>
                        <li className="basis-[13%] pl-2">Category</li>
                        <li className="basis-[14%]">Price</li>
                        <li className="basis-[10%]">Enrolled</li>
                        <li className="basis-[10%]">Certified</li>
                        <li className="basis-[10%]">Time</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {currentCourses.map((course) => (
                        <ul
                            className={`flex items-center px-3 py-3 border-b ${
                                darkMode
                                    ? "border-b-gray-700"
                                    : "border-b-gray-300"
                            } my-2`}
                        >
                            <li className="basis-[5%]">{course.id}</li>
                            <li className="basis-[33%] flex items-center gap-2">
                                <img
                                    src={`/storage/${course.image}`}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                />
                                <p className="text-sm font-medium">
                                    {course.title}
                                </p>
                            </li>
                            <li className="basis-[13%] pl-2">
                                <span className="px-2 py-1 text-xs border border-gray-500 rounded-lg">
                                    {course.category.name}
                                </span>
                            </li>
                            <li className="basis-[14%]">{course.price} MMK</li>
                            <li className="basis-[10%]">76</li>
                            <li className="basis-[10%]">42</li>
                            <li className="basis-[10%]">18 hours</li>
                            <li className="basis-[5%]">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={`p-1 rounded-md ${
                                                darkMode
                                                    ? "hover:bg-gray-600"
                                                    : "hover:bg-gray-100"
                                            } outline-none`}
                                        >
                                            <Ellipsis size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem className="text-accentGreen">
                                                View Details
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
            <div className="mt-8 flex">
                <div className="ml-auto">
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
                                        courses.length / rowsPerPage
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
                                        Math.ceil(courses.length / rowsPerPage)
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
