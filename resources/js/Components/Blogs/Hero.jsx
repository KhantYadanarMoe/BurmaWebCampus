import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="px-5 lg:px-8 mb-4">
            <div className="pt-10 pb-16">
                <div className="">
                    <h1 className="text-2xl md:text-3xl font-medium">
                        Welcome to BurmaWebCampus's Blogs.
                    </h1>
                    <p className="text-sm md:text-base text-gray-700 mt-4 md:w-[75%] lg:w-[50%]">
                        Dive into our web development blog, where we share
                        tutorials, tips, industry insights, and best practices
                        to help you stay updated, sharpen your coding skills,
                        and grow as a modern web developer.
                    </p>
                </div>
            </div>

            <hr className=" border-t-gray-500" />
        </div>
    );
}
