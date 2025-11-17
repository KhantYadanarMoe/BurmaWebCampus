import React, { useEffect, useState } from "react";
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
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function CoursesList() {
    const { darkMode } = useOutletContext();
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState("newest");

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

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/courses?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.courses) {
                    setCourses(data.courses);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
    }, []);
    return (
        <div>
            <h1 className="text-xl font-medium">Courses</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSelectedCategory(null);
                            setCurrentPage(1);
                        }}
                        className={`px-2 py-1 text-xs md:text-sm border rounded-lg ${
                            !selectedCategory
                                ? "bg-gray-800 text-white border-gray-800"
                                : "border-gray-500"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => {
                                setSelectedCategory(category.id);
                                setCurrentPage(1);
                            }}
                            className={`px-2 py-1 text-xs md:text-sm border rounded-lg ${
                                selectedCategory === category.id
                                    ? "bg-gray-800 text-white border-gray-800"
                                    : "border-gray-500"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
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
                                    {
                                        {
                                            newest: "Filter By Newest",
                                            oldest: "Filter By Oldest",
                                            "a-z": "Filter By A-Z",
                                            "z-a": "Filter By Z-A",
                                        }[selectedFilter]
                                    }
                                    <ChevronDown size={16} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-40"
                                avoidCollisions={false}
                            >
                                <DropdownMenuItem
                                    onSelect={() =>
                                        handleFilterChange("newest")
                                    }
                                    className="cursor-pointer"
                                >
                                    Filter By Newest
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() =>
                                        handleFilterChange("oldest")
                                    }
                                    className="cursor-pointer"
                                >
                                    Filter By Oldest
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => handleFilterChange("a-z")}
                                    className="cursor-pointer"
                                >
                                    Filter By A-Z
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => handleFilterChange("z-a")}
                                    className="cursor-pointer"
                                >
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
                            <li className="basis-[10%]">
                                {course.purchases_count}
                            </li>
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
