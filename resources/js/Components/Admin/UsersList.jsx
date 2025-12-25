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
import { Button } from "../ui/button";
import {
    BanIcon,
    ChevronDown,
    Ellipsis,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";
import Empty from "../../../assets/Empty.png";

export default function UsersList() {
    // state to store users
    let [users, setUsers] = useState([]);
    //state for users/students filter
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("all");
    // state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // state for loading
    const [loading, setLoading] = useState(true);
    // rows to show in a page
    const rowsPerPage = 10;
    // state for filter
    const [selectedFilter, setSelectedFilter] = useState("newest");

    const { query } = useSearch();

    const { darkMode } = useOutletContext();

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    // fetch data that send from backend
    let getUsers = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/users");
            let data = res.data;
            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    // call data fetching function in useEffect to run when user enter the page
    useEffect(() => {
        getUsers();
    }, []);

    const handleFilterChange = (
        sortValue = selectedFilter,
        typeValue = selectedTypeFilter
    ) => {
        setSelectedFilter(sortValue);
        setSelectedTypeFilter(typeValue);

        axios
            .get(`/api/users?sort=${sortValue}`)
            .then((response) => {
                let data = response.data.users;

                // Apply type filter client-side
                if (typeValue === "students") {
                    data = data.filter(
                        (user) => user.purchases && user.purchases.length > 0
                    );
                } else if (typeValue === "users") {
                    data = data.filter(
                        (user) => !user.purchases || user.purchases.length === 0
                    );
                }

                setUsers(data);
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
    }, []);

    const filteredUsers = users.filter((user) => {
        const q = query.toLowerCase();
        return (
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q)
        );
    });

    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const banUser = async (id, currentStatus) => {
        try {
            let newStatus = currentStatus ? 0 : 1;

            let res = await axios.post("/api/users/banned/" + id, {
                banned: newStatus,
            });
            const updatedUser = res.data.user;

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.id == id ? updatedUser : user))
            );
        } catch (error) {
            console.error("Failed:", error);
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

            <li className="basis-[20%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            <li className="basis-[30%] mr-3">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-full" />
            </li>

            <li className="basis-[19%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
            </li>

            <li className="basis-[12%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[10%]">
                <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
            </li>

            <li className="basis-[5%]">
                <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
            </li>
        </ul>
    );

    return (
        <div>
            <h1 className="text-xl font-medium">Users</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex items-center gap-2">
                    {["all", "users", "students"].map((type) => (
                        <button
                            key={type}
                            onClick={() =>
                                handleFilterChange(selectedFilter, type)
                            }
                            className={`px-2 py-1 text-xs md:text-sm border rounded-lg ${
                                selectedTypeFilter === type
                                    ? "bg-gray-900 text-white"
                                    : "border-gray-400 text-gray-600"
                            }`}
                        >
                            {type === "all"
                                ? "All"
                                : type === "users"
                                ? "Users"
                                : "Students"}
                        </button>
                    ))}
                </div>
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
                        <li className="basis-[4%]">ID</li>
                        <li className="basis-[20%]">Name</li>
                        <li className="basis-[30%] pl-2">Email</li>
                        <li className="basis-[19%]">Phone</li>
                        <li className="basis-[12%]">DoB</li>
                        <li className="basis-[10%]">Enrolled</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {loading ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                            <ul
                                className={`flex items-center px-3 py-3 border-b ${
                                    darkMode
                                        ? "border-b-gray-700"
                                        : "border-b-gray-300"
                                } my-2`}
                            >
                                <li className="basis-[4%] ">
                                    <div className="flex gap-1 items-center">
                                        {user.id}{" "}
                                        {Number(user.banned) === 1 ? (
                                            <BanIcon
                                                className="text-red-600"
                                                size={18}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </li>
                                <li className="basis-[20%]">
                                    <h1 className="font-medium">{user.name}</h1>
                                </li>
                                <li className="basis-[30%]">
                                    <p>{user.email}</p>
                                </li>
                                <li className="basis-[19%]">
                                    <p>{user.phone}</p>
                                </li>
                                <li className="basis-[12%]">
                                    <p>
                                        {user?.DoB
                                            ? new Date(
                                                  user?.DoB
                                              ).toLocaleDateString("en-GB", {
                                                  day: "numeric",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : ""}
                                    </p>
                                </li>
                                <li className="basis-[10%]">
                                    <p>{user.purchases_count}</p>
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
                                            <Link
                                                to={`/admin/${slugify(
                                                    user.name
                                                )}/details`}
                                            >
                                                <DropdownMenuItem>
                                                    View Details
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    banUser(
                                                        user.id,
                                                        Number(user.banned)
                                                    )
                                                }
                                                className={
                                                    Number(user.banned) === 1
                                                        ? "text-green-500"
                                                        : "text-yellow-500"
                                                }
                                            >
                                                {Number(user.banned) === 1
                                                    ? "Re-activate"
                                                    : "Ban"}
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
                                No users Found
                            </h2>
                            <p className="text-gray-500 text-center">
                                Sorry, there are no user created.
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
