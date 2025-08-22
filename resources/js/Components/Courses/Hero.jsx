import React from "react";
import Logo from "../../../assets/Logo.png";

export default function Hero() {
    return (
        <div className="px-5 lg:px-8">
            <div className="pt-8 pb-16">
                <img src={Logo} alt="" className="h-8 md:h-10 mx-auto" />
                <h1 className="text-xl md:text-2xl font-medium text-center my-2 md:my-3">
                    Courses from Burma Web Campus
                </h1>
                <p className="text-xs md:text-base text-gray-700 text-center">
                    Start your journey in web development with our carefully
                    crafted online courses, from beginner to advanced levels.
                </p>
                <div className="flex gap-2 items center justify-center mt-4">
                    <span className="text-xs md:text-base px-2 py-1 rounded-lg border border-gray-800">
                        Frontend Dev
                    </span>
                    <span className=" text-xs md:text-base px-2 py-1 rounded-lg border border-gray-800">
                        Backend Dev
                    </span>
                    <span className="text-xs md:text-base px-2 py-1 rounded-lg border border-gray-800">
                        Fullstack Dev
                    </span>
                </div>
            </div>
            <hr className="border-t-gray-500 mb-6" />
        </div>
    );
}
