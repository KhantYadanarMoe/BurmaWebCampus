import React from "react";
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
import { Ellipsis, Plus } from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function BlogsList() {
    const [blogs, setBlogs] = useState([]);

    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // rows to show in a page
    const rowsPerPage = 10;

    // Fetch blogs from backend
    const getBlogs = async () => {
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data.blogs); // assuming backend sends { blogs: [...] }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const indexOfLastBlog = currentPage * rowsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - rowsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const totalPages = Math.ceil(blogs.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    let deleteBlog = async (id) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            let res = await axios.delete("/api/blog/" + id, {
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

    return (
        <div>
            <h1 className="text-xl font-medium">Blogs</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                        Frontend
                    </span>
                    <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                        Backend
                    </span>
                    <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                        Fullstack
                    </span>
                </div>
                <div className="flex items-center justify-end md:justify-normal gap-2">
                    <div className="hidden md:block">
                        <Select>
                            <SelectTrigger className="w-[180px] border-gray-700">
                                <SelectValue placeholder="Filter " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">
                                    Filter By Newest
                                </SelectItem>
                                <SelectItem value="oldest">
                                    Filter By Oldest
                                </SelectItem>
                                <SelectItem value="a-z">
                                    Filter By A-Z
                                </SelectItem>
                                <SelectItem value="z-a">
                                    Filter By Z-A
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[4%]">ID</li>
                        <li className="basis-[40%]">Title</li>
                        <li className="basis-[13%] pl-2">Category</li>
                        <li className="basis-[13%]">Status</li>
                        <li className="basis-[10%]">View</li>
                        <li className="basis-[14%]">Created at</li>
                        <li className="basis-[6%]"></li>
                    </ul>
                    {blogs.map((blog) => (
                        <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
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
                                    {blog.visibility ? "Public" : "Draft"}
                                </span>
                            </li>
                            <li className="basis-[10%]">{blog.view || 0}</li>
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
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <Ellipsis size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to={`/blog/${blog.id}`}>
                                            <DropdownMenuItem className="text-accentGreen">
                                                Read
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem className="text-accentYellow">
                                            <Link
                                                to={`/admin/blogs/${blog.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                        Delete
                                                    </button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Are you sure you
                                                            want to delete this
                                                            menu?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot
                                                            be undone.
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
                                        blogs.length / rowsPerPage
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
                                        Math.ceil(blogs.length / rowsPerPage)
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
