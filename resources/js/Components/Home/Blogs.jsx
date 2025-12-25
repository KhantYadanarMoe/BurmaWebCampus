import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Empty from "../../../assets/Empty.png";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fetch blogs from backend
    const getBlogs = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/blogs");
            setBlogs(res.data.blogs); // assuming backend sends { blogs: [...] }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    function stripHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    function getReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min${minutes > 1 ? "s" : ""} read`;
    }

    const SkeletonCard = () => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 mt-4 md:mt-8">
                <div className="h-52 md:h-56 w-full rounded-lg border-2 border-gray-600 bg-gray-300 animate-pulse" />

                <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="w-20 h-5 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-12 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>

                        <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded-md" />

                        <div className="space-y-2">
                            <div className="w-full h-3 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-5/6 h-3 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-4/6 h-3 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-1/2 h-3 bg-gray-300 animate-pulse rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>
    );

    return (
        <div className="px-3 md:px-5 lg:px-8">
            <div className="pb-12">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mx-auto"
                >
                    <div className="flex items-center justify-between md:justify-normal md:gap-4">
                        <h1 className="text-3xl font-medium mb-5">Blogs</h1>
                        <hr className="hidden md:flex flex-grow border-t border-gray-700" />
                        <div className="flex gap-1">
                            <CarouselPrevious className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                            <CarouselNext className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                        </div>
                    </div>
                    <div>
                        <CarouselContent>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, idx) => (
                                    <SkeletonCard key={idx} />
                                ))
                            ) : blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1 mt-4 md:mt-8">
                                            {blog.cover && (
                                                <img
                                                    src={`/storage/${blog.cover}`}
                                                    alt={blog.title}
                                                    className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                                />
                                            )}
                                            <Link
                                                to={`/blog/${slugify(
                                                    blog.title
                                                )}`}
                                            >
                                                <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                                    <CardContent className="p-4">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                                    {
                                                                        blog
                                                                            .category
                                                                            .name
                                                                    }
                                                                </span>
                                                                <p className="text-sm text-gray-600">
                                                                    {getReadingTime(
                                                                        blog?.paragraph
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <h1 className="my-2 font-medium text-lg">
                                                                {blog.title}
                                                            </h1>
                                                            <div className="text-sm line-clamp-4">
                                                                {stripHtml(
                                                                    blog.paragraph
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <div className="w-full flex justify-center py-6">
                                    <div className="text-center font-medium text-accentRed">
                                        <img
                                            src={Empty}
                                            alt="No data"
                                            className="mx-auto w-60"
                                        />
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            No data to show.
                                        </h2>
                                        <p className="text-gray-500 mb-4 text-sm">
                                            The data you are looking for is
                                            empty.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <hr className="border-t-gray-600" />
        </div>
    );
}
