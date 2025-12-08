import React from "react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { ChevronDown, Ellipsis, Plus } from "lucide-react";
import Empty from "../../../assets/Empty.png";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSearch } from "@/contexts/SearchContext";

export default function BlogsList() {
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [selectedFilter, setSelectedFilter] = useState("newest");

    const [blogs, setBlogs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    const { query } = useSearch();

    const { darkMode } = useOutletContext();

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

    const getBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data.blogs);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const filteredBlogs = blogs
        .filter((blog) =>
            selectedCategory ? blog.category?.id === selectedCategory : true
        )
        .filter((blog) =>
            blog.title?.toLowerCase().includes(query.toLowerCase())
        );

    const indexOfLastBlog = currentPage * rowsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - rowsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(filteredBlogs.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/blogs?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.blogs) {
                    setBlogs(data.blogs);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
    }, []);

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    const deleteBlog = async (id) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            await axios.delete("/api/blog/" + id, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    const SkeletonCard = () => (
        <ul
            className={`flex items-center px-3 py-3 border-b ${
                darkMode ? "border-b-gray-700" : "border-b-gray-300"
            } my-2`}
        >
            <li className="basis-[4%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            <li className="basis-[40%] flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-300 rounded-md animate-pulse flex-shrink-0" />
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-1/2" />
            </li>

            <li className="basis-[13%] pl-2">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            <li className="basis-[13%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[10%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[14%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4 mb-1" />
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-1/2" />
            </li>

            <li className="basis-[6%]">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            </li>
        </ul>
    );

    return (
        <div>
            <>
                <h1 className="text-xl font-medium">Blogs</h1>
                <div className="flex flex-col md:flex-row justify-between items-center my-4">
                    <div className="flex gap-2 flex-wrap">
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
                                        onSelect={() =>
                                            handleFilterChange("a-z")
                                        }
                                        className="cursor-pointer"
                                    >
                                        Filter By A-Z
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onSelect={() =>
                                            handleFilterChange("z-a")
                                        }
                                        className="cursor-pointer"
                                    >
                                        Filter By Z-A
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Link to="/admin/blogs/create">
                            <Button className="flex gap-1 -mt-8 md:-mt-0 items-center">
                                <Plus />
                                Create
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto w-full">
                    <div className="min-w-[920px]">
                        <ul
                            className={`flex items-center px-3 py-4 border-b ${
                                darkMode
                                    ? "border-b-gray-200"
                                    : "border-b-gray-700"
                            } my-3`}
                        >
                            <li className="basis-[4%]">ID</li>
                            <li className="basis-[40%]">Title</li>
                            <li className="basis-[13%] pl-2">Category</li>
                            <li className="basis-[13%]">Status</li>
                            <li className="basis-[10%]">View</li>
                            <li className="basis-[14%]">Created at</li>
                            <li className="basis-[6%]"></li>
                        </ul>
                        {loading ? (
                            Array.from({ length: 10 }).map((_, idx) => (
                                <SkeletonCard key={idx} />
                            ))
                        ) : currentBlogs.length > 0 ? (
                            currentBlogs.map((blog) => (
                                <ul
                                    className={`flex items-center px-3 py-3 border-b ${
                                        darkMode
                                            ? "border-b-gray-700"
                                            : "border-b-gray-300"
                                    } my-2`}
                                >
                                    <li className="basis-[4%]">{blog.id}</li>
                                    <li className="basis-[40%] flex items-center gap-2">
                                        {blog.cover && (
                                            <img
                                                src={`/storage/${blog.cover}`}
                                                alt={blog.title}
                                                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                                            />
                                        )}

                                        <p className="text-sm font-medium">
                                            {blog.title}
                                        </p>
                                    </li>
                                    <li className="basis-[13%] pl-2">
                                        <span className="px-2 py-1 text-xs border border-gray-500 rounded-lg">
                                            {blog.category?.name}
                                        </span>
                                    </li>
                                    <li className="basis-[13%]">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-lg ${
                                                blog.visibility
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                        >
                                            {blog.visibility
                                                ? "Public"
                                                : "Draft"}
                                        </span>
                                    </li>
                                    <li className="basis-[10%]">
                                        {blog.view || 0}
                                    </li>
                                    <li className="basis-[14%]">
                                        <p className="text-sm">
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            {new Date(
                                                blog.created_at
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </p>
                                    </li>
                                    <li className="basis-[6%]">
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
                                                <Link
                                                    to={`/blog/${slugify(
                                                        blog.title
                                                    )}`}
                                                >
                                                    <DropdownMenuItem>
                                                        Read
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem>
                                                    <Link
                                                        to={`/admin/blogs/${slugify(
                                                            blog.title
                                                        )}/edit`}
                                                    >
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            asChild
                                                        >
                                                            <button
                                                                className={`text-accentRed ${
                                                                    darkMode
                                                                        ? "bg-[#09090B] hover:bg-[#212121]"
                                                                        : "bg-white hover:bg-gray-100"
                                                                } w-full text-left text-sm px-2 py-2 rounded-md`}
                                                            >
                                                                Delete
                                                            </button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Are you sure
                                                                    you want to
                                                                    delete this
                                                                    menu?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action
                                                                    cannot be
                                                                    undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() =>
                                                                        deleteBlog(
                                                                            blog.id
                                                                        )
                                                                    }
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <div className="w-full h-[80vh] flex items-center justify-center">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <img
                                        src={Empty}
                                        alt="Empty"
                                        className="w-48 opacity-80 mx-auto"
                                    />
                                    <h2 className="text-xl font-semibold text-gray-600 mt-4">
                                        No blogs found
                                    </h2>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Try changing filters or create a new
                                        blog.
                                    </p>
                                    <Link to="/admin/blogs/create">
                                        <Button>
                                            <Plus size={16} /> Add Blog
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
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
                                            blogs.length / rowsPerPage
                                        ),
                                    },
                                    (_, index) => (
                                        <PaginationItem key={index}>
                                            <PaginationLink
                                                onClick={() =>
                                                    handlePageChange(index + 1)
                                                }
                                                isActive={
                                                    currentPage === index + 1
                                                }
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
                                                blogs.length / rowsPerPage
                                            )
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </>
        </div>
    );
}
