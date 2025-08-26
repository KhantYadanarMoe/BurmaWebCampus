import React from "react";
import AboutImg from "../../../assets/About3.jpg";
import { Card, CardContent } from "../ui/card";

export default function Hero() {
    return (
        <div className="px-5 lg:px-8">
            <div className="flex gap-3 justify-between">
                <div className="md:w-1/2 pb-3 md:pb-6">
                    <h1 className="text-2xl lg:text-3xl font-medium py-3">
                        Burma Web Campus{" "}
                    </h1>
                    <p className="text-gray-800 text-sm lg:text-base">
                        BurmaWebCampus is an online website development learning
                        hub for students in Myanmar with accessible, practical,
                        and future-ready education.
                    </p>
                </div>
                <div className="w-1/2 hidden md:flex justify-end items-center gap-3">
                    <div className="w-1/2 lg:w-1/3">
                        <div className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-50">
                            <h1 className="text-xl font-medium">
                                245 Students
                            </h1>
                            <p className="text-gray-700">already joined</p>
                        </div>
                    </div>
                    <div className="w-1/2 lg:w-1/3">
                        <div className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-50">
                            <h1 className="text-xl font-medium">18 Courses</h1>
                            <p className="text-gray-700">in total</p>
                        </div>
                    </div>
                </div>
            </div>
            <img
                src={AboutImg}
                alt=""
                className="w-full h-56 md:h-64 lg:h-80 object-cover my-3 rounded-md"
            />
        </div>
    );
}
