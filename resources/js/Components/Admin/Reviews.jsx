import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { ChevronDown, EllipsisVertical, Flag, Star } from "lucide-react";
import Profile from "../../../assets/Profile.jpg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { useState } from "react";
import axios from "axios";
import Empty from "../../../assets/Empty.png";
import { useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";

export default function Reviews() {
    let [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedFilter, setSelectedFilter] = useState("newest");

    const [activeTab, setActiveTab] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const { query } = useSearch();

    const rowsPerPage = 10;

    let getReviews = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/reviews");
            let data = res.data;
            setReviews(data.reviews);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    const handleFilterChange = (filterValue) => {
        setSelectedFilter(filterValue);

        axios
            .get(`/api/reviews?sort=${filterValue}`)
            .then((response) => {
                const data = response.data;
                if (data.reviews) {
                    setReviews(data.reviews);
                }
            })
            .catch((error) => {
                console.error("Axios request failed:", error);
            });
    };

    useEffect(() => {
        handleFilterChange("newest"); // initial load
    }, []);

    const filteredReviews = reviews.filter((review, index) => {
        // Filter by activeTab
        if (activeTab === "unread" && index >= 10) return false;
        if (activeTab === "published" && Number(review.visibility) !== 1)
            return false;

        // Filter by search query
        const q = query.toLowerCase();
        if (
            !review.name.toLowerCase().includes(q) &&
            !review.course.title.toLowerCase().includes(q)
        )
            return false;

        return true;
    });

    const indexOfLastReview = currentPage * rowsPerPage;
    const indexOfFirstReview = indexOfLastReview - rowsPerPage;
    const currentReviews = filteredReviews.slice(
        indexOfFirstReview,
        indexOfLastReview
    );
    const totalPages = Math.ceil(filteredReviews.length / rowsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const markReview = async (id, currentMarked) => {
        try {
            let newMarked = currentMarked ? 0 : 1;

            let res = await axios.post("/api/review/marked/" + id, {
                marked: newMarked,
            });
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.id == id ? { ...review, marked: newMarked } : review
                )
            );
        } catch (error) {
            console.error("Failed to mark review:", error);
        }
    };

    const publishReview = async (id, currentVisibility) => {
        try {
            let newVisibility = currentVisibility ? 0 : 1;

            let res = await axios.post("/api/review/published/" + id, {
                visibility: newVisibility,
            });
            setReviews((prevReviews) =>
                prevReviews.map((review) =>
                    review.id == id
                        ? { ...review, visibility: newVisibility }
                        : review
                )
            );
        } catch (error) {
            console.error("Failed to publish review:", error);
        }
    };

    const { darkMode } = useOutletContext();

    const SkeletonCard = () => (
        <Card className="relative border border-gray-600 shadow-lg rounded-lg">
            <CardContent className="p-4 space-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-1 items-center mb-4">
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                        <div className="w-6 h-4 bg-gray-300 rounded-md animate-pulse" />
                    </div>
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                </div>

                <div className="h-20 bg-gray-300 rounded-md animate-pulse w-full" />

                <hr className="my-4 border-t-gray-400" />

                {/* Footer: User Info and Status */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center w-4/5">
                        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
                        <div className="space-y-2 flex-1">
                            <div className="w-1/2 h-4 bg-gray-300 rounded-md animate-pulse" />
                            <div className="flex gap-2 mt-2">
                                <div className="w-1/3 h-3 bg-gray-300 rounded-md animate-pulse" />
                                <div className="w-2/3 h-3 bg-gray-300 rounded-md animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5 flex flex-col gap-2 items-end">
                        <div className="w-16 h-4 bg-gray-300 rounded-md animate-pulse" />
                        <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div>
            <div className="flex justify-between mb-7">
                <h1 className="text-xl font-medium">Reviews</h1>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className={`flex gap-1 items-center px-2 py-1 border ${
                                darkMode ? "border-gray-300" : "border-gray-800"
                            } rounded-md`}
                        >
                            {
                                {
                                    newest: "Filter By Newest",
                                    oldest: "Filter By Oldest",
                                    "a-z": "Filter By A-Z",
                                    "z-a": "Filter By Z-A",
                                    "1-5": "Filter By Rating 1-5",
                                    "5-1": "Filter By Rating 5-1",
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
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("1-5")}
                            className="cursor-pointer"
                        >
                            Filter By Rating 1-5
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => handleFilterChange("5-1")}
                            className="cursor-pointer"
                        >
                            Filter By Rating 5-1
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <ul className="flex space-x-6 my-7 md:my-5">
                {["all", "unread", "published"].map((tab) => (
                    <li key={tab}>
                        <button
                            onClick={() => {
                                setActiveTab(tab);
                                setCurrentPage(1); // reset pagination
                            }}
                            className={`
                                ${
                                    activeTab === tab
                                        ? "font-semibold underline"
                                        : ""
                                }`}
                        >
                            <span className="capitalize">{tab}</span>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 md:mt-0">
                {loading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <SkeletonCard key={idx} />
                    ))
                ) : currentReviews.length > 0 ? (
                    currentReviews.map((review) => (
                        <Card className="relative border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-4">
                                <div className="flex justify-between">
                                    <div className="flex gap-1 items-center mb-4">
                                        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                        <span className="font-medium">
                                            {review.rating}
                                        </span>
                                    </div>
                                    <div>
                                        <DropdownMenu modal={false}>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className={`p-1 rounded-md ${
                                                        darkMode
                                                            ? "hover:bg-gray-600"
                                                            : "hover:bg-gray-100"
                                                    } outline-none`}
                                                >
                                                    <EllipsisVertical
                                                        size={18}
                                                    />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-40"
                                            >
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        publishReview(
                                                            review.id,
                                                            Number(
                                                                review.visibility
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        Number(
                                                            review.visibility
                                                        ) === 1
                                                            ? "text-accentRed cursor-pointer"
                                                            : "text-accentGreen cursor-pointer"
                                                    }
                                                >
                                                    {Number(
                                                        review.visibility
                                                    ) === 1
                                                        ? "Unpublish"
                                                        : "Publish"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        markReview(
                                                            review.id,
                                                            Number(
                                                                review.marked
                                                            )
                                                        )
                                                    }
                                                    className={
                                                        Number(
                                                            review.marked
                                                        ) === 1
                                                            ? "text-accentRed cursor-pointer"
                                                            : "text-accentGreen cursor-pointer"
                                                    }
                                                >
                                                    {Number(review.marked) === 1
                                                        ? "Remove Mark"
                                                        : "Mark"}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <q
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-800"
                                    } text-sm`}
                                >
                                    {review.review}
                                </q>
                                <hr className="my-4 border-t-gray-400" />
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2 items-center w-4/5">
                                        <img
                                            src={Profile}
                                            alt=""
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                        <div>
                                            <h1 className="text-sm font-medium">
                                                {review.name}
                                            </h1>
                                            <div className="flex gap-2 items-start mt-2">
                                                <p
                                                    className={`w-1/3 text-xs ${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-800"
                                                    }`}
                                                >
                                                    Review to:
                                                </p>
                                                <p
                                                    className={`w-2/3 text-xs ${
                                                        darkMode
                                                            ? "text-gray-300"
                                                            : "text-gray-800"
                                                    } font-medium`}
                                                >
                                                    {review.course?.title || ""}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/5 flex gap-1 flex-col justify-end items-end">
                                        {Number(review.visibility) === 1 ? (
                                            <span className="p-1 text-green-600 bg-green-100 text-xs rounded-md">
                                                Published
                                            </span>
                                        ) : null}
                                        {Number(review.marked) === 1 ? (
                                            <Flag
                                                size={16}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-5">
                        <img
                            src={Empty}
                            alt="No blogs"
                            className="w-32 h-32 mb-4 object-contain"
                        />
                        <h2 className="text-xl font-semibold mb-2">
                            No reviews Found
                        </h2>
                        <p className="text-gray-500 text-center">
                            Sorry, there are no review created.
                        </p>
                    </div>
                )}
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
                                        reviews.length / rowsPerPage
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
                                        Math.ceil(reviews.length / rowsPerPage)
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
