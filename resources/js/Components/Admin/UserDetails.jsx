import React from "react";
import { Button } from "../ui/button";
import {
    ChevronsRight,
    Ellipsis,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";
import Pf from "../../../assets/Profile.jpg";
import { Link, useOutletContext } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import CourseImg from "../../../assets/Courses.jpg";
import { Progress } from "../ui/progress";

export default function UsersList() {
    const { darkMode } = useOutletContext();
    return (
        <div>
            <div
                className={`flex gap-1 items-end ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                } text-sm`}
            >
                <Link>Dashboard</Link>
                <ChevronsRight size={18} />
                <Link>user</Link>
                <ChevronsRight size={18} />
                <Link className={`${darkMode ? "text-white" : "text-black"}`}>
                    Khant Yadanar Moe
                </Link>
            </div>
            <h1 className="text-xl font-medium my-5">Profile Details</h1>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-2 items-center">
                            <img
                                src={Pf}
                                alt=""
                                className="w-16 h-16 object-cover p-0.5 border border-gray-400 rounded-full"
                            />
                            <div>
                                <h1 className="text-lg font-medium">
                                    Khant Yadanar Moe
                                </h1>
                                <p
                                    className={`text-sm ${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    }`}
                                >
                                    khantyadanarmoe@gmail.com
                                </p>
                            </div>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-xl">
                            Active
                        </span>
                    </div>
                </CardContent>
            </Card>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg mt-5">
                <CardContent className="p-4">
                    <h1 className="text-lg font-medium mb-9">
                        Personal Information
                    </h1>
                    <div className="w-full md:w-[75%]">
                        <div className="flex justify-between my-7">
                            <div className="w-1/2">
                                <h1 className="font-medium">First Name</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    Khant Yadanar
                                </p>
                            </div>
                            <div className="w-1/2">
                                <h1 className="font-medium">Last Name</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    Moe
                                </p>
                            </div>
                        </div>
                        <div className="md:flex justify-between my-7">
                            <div className="md:w-1/2 my-7 md:my-0">
                                <h1 className="font-medium">Email</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    khantyadanarmoe@gmail.com
                                </p>
                            </div>
                            <div className="md:w-1/2 my-7 md:my-0">
                                <h1 className="font-medium">Phone</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    +959 123 456 789
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between my-7">
                            <div className="w-1/2">
                                <h1 className="font-medium">Date of Birth</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    18 Jun 2004
                                </p>
                            </div>
                            <div className="w-1/2">
                                <h1 className="font-medium">Joined at</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    9 Sep 2024
                                </p>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-medium">Bio</h1>
                            <p
                                className={`${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                } text-sm`}
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Minus voluptatem ut voluptates
                                omnis atque nostrum. Accusantium velit pariatur
                                reiciendis, blanditiis libero eos, dolorum
                                aspernatur vero reprehenderit sapiente nostrum
                                inventore veniam quia dolores.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg mt-5">
                <CardContent className="p-4">
                    <h1 className="text-lg font-medium mb-8">
                        Enrolled Courses
                    </h1>
                    <div className="flex gap-3 my-8">
                        <img
                            src={CourseImg}
                            alt="course image"
                            className="hidden md:block w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <div>
                                <h1 className="text-lg font-medium">
                                    Full-Stack Web Development Pathway
                                </h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    Enrolled at 14 Nov 2024
                                </p>
                            </div>
                            <div className="py-1">
                                <div className="flex justify-between">
                                    <h1
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        Progress
                                    </h1>
                                    <p className="text-black font-medium">
                                        54%
                                    </p>
                                </div>
                                {/* 👇 force progress bar to take full width */}
                                <Progress value={54} className="mt-2 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 my-8">
                        <img
                            src={CourseImg}
                            alt="course image"
                            className="hidden md:block w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <div>
                                <h1 className="text-lg font-medium">
                                    Full-Stack Web Development Pathway
                                </h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    Enrolled at 14 Nov 2024
                                </p>
                            </div>
                            <div className="py-1">
                                <div className="flex justify-between">
                                    <h1
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        Progress
                                    </h1>
                                    <p className="text-black font-medium">
                                        54%
                                    </p>
                                </div>
                                {/* 👇 force progress bar to take full width */}
                                <Progress value={54} className="mt-2 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 my-8">
                        <img
                            src={CourseImg}
                            alt="course image"
                            className="hidden md:block w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <div>
                                <h1 className="text-lg font-medium">
                                    Full-Stack Web Development Pathway
                                </h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    Enrolled at 14 Nov 2024
                                </p>
                            </div>
                            <div className="py-1">
                                <div className="flex justify-between">
                                    <h1
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        Progress
                                    </h1>
                                    <p className="text-black font-medium">
                                        54%
                                    </p>
                                </div>
                                {/* 👇 force progress bar to take full width */}
                                <Progress value={54} className="mt-2 w-full" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
