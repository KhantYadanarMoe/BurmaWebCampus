import React from "react";
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
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function AllBlogs() {
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [blogs, setBlogs] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 6;

    const getCategories = async () => {
        try {
            let res = await axios.get("/api/blog/categories");
            setCategories(res.data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    const getBlogs = async () => {
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const filteredBlogs = selectedCategory
        ? blogs.filter((blog) => blog.category?.id === selectedCategory)
        : blogs;

    const indexOfLastBlog = currentPage * rowsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - rowsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function stripHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function getReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min${minutes > 1 ? "s" : ""} read`;
    }

    const selectedCategoryName = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.name
        : null;

    return (
        <div className="px-5 lg:px-8">
            <div className="flex items-center justify-between mb-2 md:mb-0">
                <div>
                    <h2 className="text-xl md:text-2xl font-medium relative inline-block">
                        {selectedCategoryName
                            ? `${selectedCategoryName} Blogs`
                            : "All Blogs"}
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
                {currentBlogs.length > 0 ? (
                    currentBlogs.map((blog) => (
                        <div className="p-1 mt-4 md:mt-8">
                            {blog.cover && (
                                <img
                                    src={`/storage/${blog.cover}`}
                                    alt={blog.title}
                                    className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                />
                            )}
                            <Link to={`/blog/${slugify(blog.title)}`}>
                                <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div>
                                            <div className="flex justify-between">
                                                <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                    {blog.category.name}
                                                </span>
                                                <p className="text-sm text-gray-600">
                                                    {getReadingTime(
                                                        blog?.paragraph
                                                    )}
                                                </p>
                                            </div>
                                            <h1 className="my-2 font-medium text-lg">
                                                {blog.title}
                                            </h1>
                                            <div className="text-sm line-clamp-4">
                                                {stripHtml(blog.paragraph)}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-5">
                        <img
                            src={Empty}
                            alt="No blogs"
                            className="w-32 h-32 mb-4 object-contain"
                        />
                        <h2 className="text-xl font-semibold mb-2">
                            No Blogs Found
                        </h2>
                        <p className="text-gray-500 text-center">
                            Sorry, there are no blogs available for this
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
                        {Array.from(
                            {
                                length: Math.ceil(blogs.length / rowsPerPage),
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
                                    Math.ceil(blogs.length / rowsPerPage)
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
