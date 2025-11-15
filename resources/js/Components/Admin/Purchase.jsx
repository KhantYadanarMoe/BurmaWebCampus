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
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function Purchase() {
    const { darkMode } = useOutletContext();
    let [purchases, setPurchases] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("newest");

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    let getPurchases = async () => {
        try {
            let res = await axios.get("/api/course/purchase");
            let data = res.data;
            setPurchases(data.purchases);
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        }
    };

    useEffect(() => {
        getPurchases();
    }, []);

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/course/purchase?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.purchases) {
                    setPurchases(data.purchases);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest");
    }, []);

    const indexOfLastPurchase = currentPage * rowsPerPage;
    const indexOfFirstPurchase = indexOfLastPurchase - rowsPerPage;
    const currentPurchases = purchases.slice(
        indexOfFirstPurchase,
        indexOfLastPurchase
    );
    const totalPages = Math.ceil(purchases.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <h1 className="text-xl font-medium">Purchased Courses</h1>
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[4%]">ID</li>
                        <li className="basis-[10%]">Invoice</li>
                        <li className="basis-[30%] pl-2">Course Name</li>
                        <li className="basis-[20%]">Student Name</li>
                        <li className="basis-[10%]">Payment</li>
                        <li className="basis-[11%]">Date</li>
                        <li className="basis-[10%]">Access</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    {currentPurchases.map((purchase) => (
                        <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">{purchase.id}</li>
                            <li className="basis-[10%]">
                                {purchase.invoice_no}
                            </li>
                            <li className="basis-[30%] flex items-center gap-2">
                                <img
                                    src={CourseImg}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                />
                                <p className="text-sm font-medium">
                                    {purchase.course.title}
                                </p>
                            </li>
                            <li className="basis-[20%]">{purchase.name}</li>
                            <li className="basis-[10%]">
                                {purchase.payment_method}
                            </li>
                            <li className="basis-[11%]">
                                <p className="text-sm">
                                    {new Date(
                                        purchase.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "numeric",
                                        year: "numeric",
                                    })}
                                </p>
                                <p className="text-sm">
                                    {new Date(
                                        purchase.created_at
                                    ).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                            </li>
                            <li className="basis-[10%]">Life-time</li>
                            <li className="basis-[5%]">
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={`p-1 rounded-md ${
                                                darkMode
                                                    ? "hover:bg-gray-800"
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
                                        purchases.length / rowsPerPage
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
                                            purchases.length / rowsPerPage
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
