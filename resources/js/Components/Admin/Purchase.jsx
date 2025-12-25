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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useSearch } from "@/contexts/SearchContext";
import Empty from "../../../assets/Empty.png";

export default function Purchase() {
    const { darkMode } = useOutletContext();
    let [purchases, setPurchases] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("newest");
    const { query } = useSearch();

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    let getPurchases = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/course/purchase");
            let data = res.data;
            setPurchases(data.purchases);
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        } finally {
            setLoading(false);
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

    const filteredPurchases = purchases.filter((purchase) => {
        const q = query.toLowerCase();
        return (
            purchase.course.title.toLowerCase().includes(q) ||
            purchase.invoice_no.toLowerCase().includes(q) ||
            purchase.name.toLowerCase().includes(q)
        );
    });

    const indexOfLastPurchase = currentPage * rowsPerPage;
    const indexOfFirstPurchase = indexOfLastPurchase - rowsPerPage;
    const currentPurchases = filteredPurchases.slice(
        indexOfFirstPurchase,
        indexOfLastPurchase
    );
    const totalPages = Math.ceil(filteredPurchases.length / rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const SkeletonCard = () => (
        <div className="w-full space-y-3">
            <ul className="flex items-center px-3 py-3 border-b border-b-gray-300">
                <li className="basis-[4%]">
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
                </li>
                <li className="basis-[10%]">
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-4/5" />
                </li>
                <li className="basis-[30%] flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-md animate-pulse flex-shrink-0" />
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
                </li>
                <li className="basis-[20%]">
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
                </li>
                <li className="basis-[10%]">
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
                </li>
                <li className="basis-[11%] space-y-1">
                    <div className="h-3 bg-gray-300 rounded-md animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-300 rounded-md animate-pulse w-2/3" />
                </li>
                <li className="basis-[10%]">
                    <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
                </li>
                <li className="basis-[5%]">
                    <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse" />
                </li>
            </ul>
        </div>
    );

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
                    {loading ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))
                    ) : currentPurchases.length > 0 ? (
                        currentPurchases.map((purchase) => (
                            <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                                <li className="basis-[4%]">{purchase.id}</li>
                                <li className="basis-[10%]">
                                    {purchase.invoice_no}
                                </li>
                                <li className="basis-[30%] flex items-center gap-2">
                                    <img
                                        src={`/storage/${purchase.course.image}`}
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
                                            <DropdownMenuItem
                                                className="text-accentGreen"
                                                onSelect={(e) => {
                                                    e.preventDefault(); // Prevent Dropdown from closing immediately
                                                    setOpen(true); // Open the Dialog
                                                }}
                                            >
                                                View Details
                                            </DropdownMenuItem>

                                            <Dialog
                                                open={open}
                                                onOpenChange={setOpen}
                                            >
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Invoice{" "}
                                                            {
                                                                purchase.invoice_no
                                                            }
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Enrolled at{" "}
                                                            {new Date(
                                                                purchase.created_at
                                                            ).toLocaleDateString(
                                                                "en-GB",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="flex gap-2 items-center mt-4 mb-2">
                                                        <img
                                                            src={`/storage/${purchase.course.image}`}
                                                            alt={
                                                                purchase.course
                                                                    .title
                                                            }
                                                            className="w-12 h-12 object-cover rounded-md"
                                                        />
                                                        <h1 className="font-medium">
                                                            {
                                                                purchase.course
                                                                    .title
                                                            }
                                                        </h1>
                                                    </div>
                                                    <hr className="border-t-gray-500 border-dashed" />
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Name -
                                                        </p>
                                                        <p className="text-gray-700">
                                                            {purchase.name}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Email -
                                                        </p>
                                                        <p className="text-gray-700">
                                                            {purchase.email}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Phone -
                                                        </p>
                                                        <p className="text-gray-700">
                                                            {purchase.phone}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Price -
                                                        </p>
                                                        <p className="text-gray-700">
                                                            {
                                                                purchase.course
                                                                    .price
                                                            }{" "}
                                                            MMK
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Discount -
                                                        </p>
                                                        <p className="text-gray-700">
                                                            0 MMK
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-medium">
                                                            Pay with -
                                                        </p>
                                                        <p className="text-gray-700 uppercase">
                                                            {
                                                                purchase.payment_method
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="mt-20 md:mt-40 lg:mt-16">
                                                        <hr className="border-t border-dashed border-gray-500" />
                                                        <div className="flex items-center justify-between my-3">
                                                            <p className="font-medium">
                                                                Total -
                                                            </p>
                                                            <p className="text-gray-700">
                                                                {
                                                                    purchase
                                                                        .course
                                                                        .price
                                                                }{" "}
                                                                MMK
                                                            </p>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
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
                                No Purchase Histories Found
                            </h2>
                            <p className="text-gray-500 text-center">
                                Sorry, there are no purchase histories for now.
                            </p>
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
