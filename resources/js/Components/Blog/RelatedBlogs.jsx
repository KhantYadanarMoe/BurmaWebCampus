import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import BlogImg from "../../../assets/Blog.jpg";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function RelatedBlogs() {
    let [blogs, setBlogs] = useState([]);

    const shuffledBlogs = [...blogs].sort(() => Math.random() - 0.5);

    const randomBlogs = shuffledBlogs.slice(0, 3);

    let getBlogs = async () => {
        let res = await axios.get("/api/blogs");
        let data = res.data;
        const visibleBlogs = data.blogs.filter((blog) => blog.visibility == 1);
        setBlogs(visibleBlogs);
    };

    useEffect(() => {
        getBlogs();
    }, []);

    function stripHtml(html) {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    function getReadingTime(content) {
        const wordsPerMinute = 200;
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min${minutes > 1 ? "s" : ""} read`;
    }

    return (
        <div className="px-4 md:px-5 lg:px-8 pb-8">
            <hr className="my-5 border-t-gray-500" />
            <div className="pt-3">
                <h1 className="text-2xl font-medium">Related Blogs</h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {randomBlogs.map((blog) => (
                    <Link to={`/blog/${blog.id}`} className="p-1 mt-4 md:mt-6">
                        <img
                            src={`/storage/${blog.cover}`}
                            alt={blog.title}
                            className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                        />
                        <Link to={`/blog/${blog.id}`}>
                            <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                <CardContent className="p-4">
                                    <div>
                                        <div className="flex justify-between">
                                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                {blog.category.name}
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
                                        <p className="text-sm line-clamp-3">
                                            {stripHtml(blog.paragraph)
                                                .split(" ")
                                                .slice(0, 18)
                                                .join(" ") + "..."}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </Link>
                ))}
            </div>
        </div>
    );
}
