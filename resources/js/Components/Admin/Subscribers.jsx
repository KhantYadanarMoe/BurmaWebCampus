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
import {
    ChevronDown,
    Ellipsis,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Subscribers() {
    let [subscribers, setSubscribers] = useState([]);
    // state for loading
    const [loading, setLoading] = useState(true);
    // state for filter
    const [selectedFilter, setSelectedFilter] = useState("newest");

    const { darkMode } = useOutletContext();

    let getSubscribers = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/subscribers");
            let data = res.data;
            setSubscribers(data.subscribes);
        } catch (error) {
            console.error("Failed to fetch subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubscribers();
    }, []);

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/subscribers?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.subscribes) {
                    setSubscribers(data.subscribes);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
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

    const SkeletonCard = () => (
        <ul
            className={`flex items-center px-3 py-3 border-b ${
                darkMode ? "border-b-gray-700" : "border-b-gray-300"
            } my-2`}
        >
            <li className="basis-[5%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            <li className="basis-[35%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-full" />
            </li>

            <li className="basis-[15%] pl-2">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[25%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[15%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[5%]">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            </li>
        </ul>
    );

    return (
        <div>
            <div className="flex justify-between my-4">
                <h1 className="text-xl font-medium">Subscribers</h1>
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
                                onSelect={() => handleFilterChange("newest")}
                                className="cursor-pointer"
                            >
                                Filter By Newest
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => handleFilterChange("oldest")}
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
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul
                        className={`flex items-center px-3 py-4 border-b ${
                            darkMode ? "border-b-gray-200" : "border-b-gray-700"
                        } my-3`}
                    >
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[35%]">Email</li>
                        <li className="basis-[15%] pl-2">User ID</li>
                        <li className="basis-[25%]">Subscribed At</li>
                        <li className="basis-[15%]">Status</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))
                    ) : currentSubscribers.length > 0 ? (
                        currentSubscribers?.map((subscriber) => (
                            <ul
                                className={`flex items-center px-3 py-3 border-b ${
                                    darkMode
                                        ? "border-b-gray-700"
                                        : "border-b-gray-300"
                                } my-2`}
                            >
                                <li className="basis-[5%]">{subscriber.id}</li>
                                <li className="basis-[35%]">
                                    {subscriber.email}
                                </li>
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
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    navigator.clipboard.writeText(
                                                        subscriber.email
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                Copy Email
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            </ul>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-5">
                            <img
                                src={Empty}
                                alt="No blogs"
                                className="w-32 h-32 mb-4 object-contain"
                            />
                            <h2 className="text-xl font-semibold mb-2">
                                No subscribers Found
                            </h2>
                            <p className="text-gray-500 text-center">
                                Sorry, there are no subscriber created.
                            </p>
                        </div>
                    )}
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
