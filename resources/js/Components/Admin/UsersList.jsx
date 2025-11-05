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
import { Button } from "../ui/button";
import { Ellipsis, GraduationCap, Plus, Users } from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function UsersList() {
    // state to store users
    let [users, setUsers] = useState([]);
    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // rows to show in a page
    const rowsPerPage = 10;

    // fetch data that send from backend
    let getUsers = async () => {
        try {
            let res = await axios.get("/api/users");
            let data = res.data;
            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    // call data fetching function in useEffect to run when user enter the page
    useEffect(() => {
        getUsers();
    }, []);

    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <h1 className="text-xl font-medium">Users</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex items-center gap-2">
                    <Link to="">
                        <span className="px-2 py-1 text-xs flex gap-1 items-center md:text-sm border border-gray-500 rounded-lg">
                            <Users size={16} />
                            Users
                        </span>
                    </Link>
                    <Link to="">
                        <span className="px-2 py-1 text-xs flex gap-1 items-center md:text-sm border border-gray-500 rounded-lg">
                            <GraduationCap size={16} />
                            Students
                        </span>
                    </Link>
                </div>
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
                            <SelectItem value="a-z">Filter By A-Z</SelectItem>
                            <SelectItem value="z-a">Filter By Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[4%]">ID</li>
                        <li className="basis-[20%]">Name</li>
                        <li className="basis-[30%] pl-2">Email</li>
                        <li className="basis-[19%]">Phone</li>
                        <li className="basis-[12%]">DoB</li>
                        <li className="basis-[10%]">Enrolled</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {users.map((user) => (
                        <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">{user.id}</li>
                            <li className="basis-[20%]">
                                <h1 className="font-medium">{user.name}</h1>
                            </li>
                            <li className="basis-[30%]">
                                <p>{user.email}</p>
                            </li>
                            <li className="basis-[19%]">
                                <p>+959 258 383 766</p>
                            </li>
                            <li className="basis-[12%]">
                                <p>9.10.2025</p>
                            </li>
                            <li className="basis-[10%]">
                                <p>2</p>
                            </li>
                            <li className="basis-[5%]">
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
                                        <Link to="">
                                            <DropdownMenuItem className="text-accentGreen">
                                                View Profile
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem className="text-accentYellow">
                                            <Link to="">Ban</Link>
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
                    <Pagination>
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
                                        users.length / rowsPerPage
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
                                        Math.ceil(users.length / rowsPerPage)
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
