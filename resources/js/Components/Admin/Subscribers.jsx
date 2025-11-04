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
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Subscribers() {
    let [subscribers, setSubscribers] = useState([]);

    let getSubscribers = async () => {
        try {
            let res = await axios.get("/api/subscribers");
            let data = res.data;
            setSubscribers(data.subscribes);
        } catch (error) {
            console.error("Failed to fetch subscribers:", error);
        }
    };

    useEffect(() => {
        getSubscribers();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    const indexOfLastSubscriber = currentPage * rowsPerPage;
    const indexOfFirstSubscriber = indexOfLastSubscriber - rowsPerPage;
    const currentSubscribers = subscribers?.slice(
        indexOfFirstSubscriber,
        indexOfLastSubscriber
    );

    const totalPages = Math.ceil(subscribers?.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="flex justify-between my-4">
                <h1 className="text-xl font-medium">Subscribers</h1>
                <div className="">
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
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[35%]">Email</li>
                        <li className="basis-[15%] pl-2">User ID</li>
                        <li className="basis-[25%]">Subscribed At</li>
                        <li className="basis-[15%]">Status</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {currentSubscribers?.map((subscriber) => (
                        <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                            <li className="basis-[5%]">{subscriber.id}</li>
                            <li className="basis-[35%]">{subscriber.email}</li>
                            <li className="basis-[15%] pl-2">46</li>
                            <li className="basis-[25%]">
                                {new Date(
                                    subscriber.created_at
                                ).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </li>
                            <li className="basis-[15%]">
                                <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                    Subscribed
                                </span>
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
                                        subscribers.length / rowsPerPage
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
                                            subscribers.length / rowsPerPage
                                        )
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
