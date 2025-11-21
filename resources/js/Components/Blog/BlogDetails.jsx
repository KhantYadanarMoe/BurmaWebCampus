import React from "react";
import BlogImg from "../../../assets/Blog.jpg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function BlogDetails() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper to create slug from title
    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    useEffect(() => {
        const loadBlog = async () => {
            try {
                // 1) Fetch all blogs
                const res = await axios.get("/api/blogs");
                const blogs = res.data.blogs;

                // 2) Find blog with matching slug
                const found = blogs.find((b) => slugify(b.title) === slug);

                if (!found) {
                    setLoading(false);
                    return;
                }

                // 3) Fetch full blog details using the ID
                const detailRes = await axios.get(`/api/blog/${found.id}`);
                setBlog(detailRes.data.blog);

                // 4) Increment view
                await axios.post(`/api/blog/${found.id}/view`);
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        loadBlog();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!blog) return <p>Blog not found.</p>;

    const words = (blog.paragraph || "").split(/\s+/);
    const mid = Math.ceil(words.length / 2);
    const firstHalf = words.slice(0, mid).join(" ");
    const secondHalf = words.slice(mid).join(" ");

    return (
        <div className="px-4 md:px-5 lg:px-8 w-full md:w-[90%] lg:w-[80%] flex flex-col items-start mx-auto">
            <span className="px-2 py-1  border border-gray-700 rounded-lg">
                {blog.category.name}
            </span>
            <p className="py-4 text-sm text-gray-600">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>
            <h1 className="text-2xl md:text-3xl font-medium">{blog.title}</h1>
            {blog.cover && (
                <img
                    src={`/storage/${blog.cover}`}
                    alt={blog.title}
                    className="my-6 w-full h-72 object-cover rounded-bl-3xl rounded-br-3xl"
                />
            )}
            <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: firstHalf }}
            />
            <div className="flex gap-2 my-6">
                <div className="w-1/2 aspect-video">
                    {blog.detail_image_1 && (
                        <img
                            src={`/storage/${blog.detail_image_1}`}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-bl-3xl rounded-br-3xl"
                        />
                    )}
                </div>
                <div className="w-1/2 aspect-video">
                    {blog.detail_image_2 && (
                        <img
                            src={`/storage/${blog.detail_image_2}`}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded-bl-3xl rounded-br-3xl"
                        />
                    )}
                </div>
            </div>
            <div
                className="rich-text-content"
                dangerouslySetInnerHTML={{ __html: secondHalf }}
            />
        </div>
    );
}
