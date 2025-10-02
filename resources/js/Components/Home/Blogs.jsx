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
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    Clock,
    Users,
} from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

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

    function stripHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

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
                            {blogs.map((blog) => (
                                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1 mt-4 md:mt-8">
                                        {blog.cover && (
                                            <img
                                                src={`/storage/${blog.cover}`}
                                                alt={blog.title}
                                                className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                            />
                                        )}
                                        <Link to={`/blog/${blog.id}`}>
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
                                                                3 mins read
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
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <hr className="border-t-gray-600" />
        </div>
    );
}
