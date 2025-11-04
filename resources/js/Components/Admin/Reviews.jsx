import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";
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
import { useEffect } from "react";

export default function Reviews() {
    let [reviews, setReviews] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState("newest");

    const [activeTab, setActiveTab] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 10;

    let getReviews = async () => {
        try {
            let res = await axios.get("/api/reviews");
            let data = res.data;
            setReviews(data.reviews);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
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
        if (activeTab === "all") return true;
        if (activeTab === "unread") return index < 10;
        if (activeTab === "published") return Number(review.visibility) === 1;
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

    return (
        <div>
            <div className="flex justify-between mb-7">
                <h1 className="text-xl font-medium">Reviews</h1>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <button className="flex gap-1 items-center px-2 py-1 border border-gray-800 rounded-md">
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
                {currentReviews.map((review) => (
                    <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
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
                                            <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                                <EllipsisVertical size={18} />
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
                                                {Number(review.visibility) === 1
                                                    ? "Unpublish"
                                                    : "Publish"}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    markReview(
                                                        review.id,
                                                        Number(review.marked)
                                                    )
                                                }
                                                className={
                                                    Number(review.marked) === 1
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
                            <q className="text-gray-900 text-sm">
                                {review.review}
                            </q>
                            <hr className="my-4 border-t-gray-400" />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={Profile}
                                        alt=""
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                    <div>
                                        <h1 className="text-sm font-medium">
                                            {review.name}
                                        </h1>
                                        <div className="flex gap-2 items-center mt-2">
                                            <p className="text-xs text-gray-600">
                                                Review to:
                                            </p>
                                            <p className="text-xs text-gray-800 font-medium">
                                                {review.course_id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1 flex-col justify-end items-end">
                                    {Number(review.marked) === 1 ? (
                                        <Flag
                                            size={16}
                                            className="text-yellow-400 fill-yellow-400"
                                        />
                                    ) : null}
                                    {Number(review.visibility) === 1 ? (
                                        <span className="p-1 text-green-600 bg-green-100 text-xs rounded-md">
                                            Published
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
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
