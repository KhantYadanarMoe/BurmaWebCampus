import React, { useEffect, useState } from "react";
import { BookOpenText, MoveUpRight, Users } from "lucide-react";
import { Button } from "../ui/button";
import Frontend from "../../../assets/Frontend.jpg";
import Backend from "../../../assets/Backend.jpg";
import Blog from "../../../assets/Blog.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSetting } from "../Admin/contexts/SiteInfoContext";

export default function Hero() {
    let [categories, setCategories] = useState([]);
    const [topCategories, setTopCategories] = useState([]);
    const { form } = useSetting();

    let getCategories = async () => {
        try {
            let res = await axios.get("/api/course/categories");
            let data = res.data;

            setCategories(data.categories);
            const sorted = [...data.categories]
                .sort((a, b) => b.courses_count - a.courses_count)
                .slice(0, 2);

            setTopCategories(sorted);

            const visibilityMap = {};
            data.categories.forEach((cat) => {
                visibilityMap[cat.id] = !!+cat.is_visible;
            });
            setVisibility(visibilityMap);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <div className="px-5 md:px-8">
            <div className="md:flex gap-3">
                <div className="md:w-1/2">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl md:mb-6 leading-[38px] md:leading-[46px] lg:leading-[50px]">
                        {form.header ||
                            "Start Your Web Developer Journey With Us."}
                    </h1>
                    <div className="flex md:hidden">
                        <p className="my-3 text-gray-800 text-sm lg:text-base">
                            {form.description ||
                                `You don’t need any coding background or prior
experience. All you need to bring is your effort and
curiosity. We’ll take you from zero to hero in web
development.`}
                        </p>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Link to="/courses">
                            <Button className="rounded-xl flex gap-1 items-center">
                                Start Learning <MoveUpRight />
                            </Button>
                        </Link>
                        <Link to="/blogs">
                            <Button
                                variant="outline"
                                className="border-gray-800 rounded-xl flex gap-1 items-center"
                            >
                                Read Blogs
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex md:w-1/2">
                    <p className="mt-2 text-gray-800 text-sm lg:text-base">
                        You don’t need any coding background or prior
                        experience. All you need to bring is your effort and
                        curiosity. We’ll take you from zero to hero in web
                        development — guiding you step by step with lessons,
                        quizzes, and hands-on practice.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-5">
                <Link
                    to={`/courses?category=${topCategories[0]?.id}`}
                    className="md:w-1/3 xl:w-2/5 flex flex-col justify-end"
                >
                    <div className="relative group md:mt-20">
                        <img
                            src={Frontend}
                            alt=""
                            className="w-full h-[270px] object-cover rounded-xl"
                        />
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                <MoveUpRight />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-xl">
                            <h1 className="text-lg font-semibold">
                                {topCategories[0]?.name} Courses
                            </h1>
                            <p className="text-xs md:text-sm">
                                Explore our courses and upgrade your career.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to={`/courses?category=${topCategories[1]?.id}`}
                    className="md:w-1/3 xl:w-1/5 flex md:flex-col gap-3"
                >
                    <div className="relative group flex-1">
                        <img
                            src={Backend}
                            alt=""
                            className="w-full h-[195px] object-cover rounded-xl"
                        />

                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                <MoveUpRight />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-2 md:p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-xl">
                            <h1 className="text-base md:text-lg font-semibold">
                                {topCategories[1]?.name} Courses
                            </h1>
                            <p className="text-xs md:text-sm">
                                Explore our courses and upgrade your career.
                            </p>
                        </div>
                    </div>

                    <div className="relative group flex-1 bg-gray-600 rounded-xl">
                        <div className="absolute top-4 left-4 text-white">
                            <span className="border border-white px-2 py-1 rounded-xl text-sm">
                                Special Offer
                            </span>
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 text-white">
                            <p className="text-sm md:text-base">
                                Get 20% off by registering your very first
                                course.
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    to="/blogs"
                    className="md:w-1/3 xl:w-2/5 flex flex-col justify-end"
                >
                    <div className="relative group">
                        <img
                            src={Blog}
                            alt=""
                            className="w-full h-[200px] md:h-auto lg:h-[380px] object-cover rounded-xl"
                        />

                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                <MoveUpRight />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-xl">
                            <h1 className="text-lg font-semibold">
                                Blog Articles
                            </h1>
                            <p className="text-sm">
                                Tips, tutorials, and updates for web developers
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
