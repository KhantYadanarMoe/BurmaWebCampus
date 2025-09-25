import { Card, CardContent } from "@/Components/ui/card";
import Pf from "../../assets/Profile.jpg";
import React from "react";
import { BookCheck, BookOpen, ScrollText } from "lucide-react";
import CourseImg from "../../assets/Courses.jpg";
import { Progress } from "@/Components/ui/progress";

export default function UserProfile() {
    return (
        <div className="px-5 lg:px-8 pb-3 md:flex gap-3 items-start">
            <div className="w-full md:w-1/3 lg:w-2/5 md:sticky md:top-24 md:self-start">
                <Card className="my-3 bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex flex-col items-center justify-center text-center">
                            <img
                                src={Pf}
                                alt="User Profile"
                                className="w-20 h-20 object-cover rounded-full p-1 border border-gray-800"
                            />
                            <h1 className="text-lg font-medium my-2">
                                Khant Yadanar Moe
                            </h1>
                            <p className="text-sm text-gray-800">
                                khantyadanarmoe@gmail.com
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className=" bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="">
                            <h1 className="text-lg font-medium mb-7">
                                General Information
                            </h1>
                            <div className="flex items-center my-4 text-sm md:text-xs lg:text-sm">
                                <p className="w-1/2 font-medium">
                                    First Name -
                                </p>
                                <p className="w-1/2">Khant Yadanar</p>
                            </div>
                            <div className="flex items-center my-4 text-sm md:text-xs lg:text-sm">
                                <p className="w-1/2 font-medium">Last Name -</p>
                                <p className="w-1/2">Moe</p>
                            </div>
                            <div className="flex items-center my-4 text-sm md:text-xs lg:text-sm">
                                <p className="w-1/2 font-medium">Phone -</p>
                                <p className="w-1/2">+959 253 123 456</p>
                            </div>
                            <div className="flex items-center my-4 text-sm md:text-xs lg:text-sm">
                                <p className="w-1/2 font-medium">
                                    Date of Birth -
                                </p>
                                <p className="w-1/2">18th June 2004</p>
                            </div>
                            <div className="mt-4 text-sm md:text-xs lg:text-sm">
                                <p className="font-medium">Bio -</p>
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Corrupti, non nostrum.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/5">
                <div className="md:flex items-center gap-3">
                    <Card className="my-3 bg-white border border-gray-600 shadow-lg rounded-lg lg:w-1/3 md:w-1/2">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <BookOpen />
                                <h1 className="text-xs lg:text-sm font-medium mt-1">
                                    Enrolled Courses
                                </h1>
                                <span className="flex gap-1 items-center mt-2">
                                    <p className="text-xl font-medium">8</p>
                                    <p>courses</p>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="my-3 bg-white border border-gray-600 shadow-lg rounded-lg lg:w-1/3 md:w-1/2 block md:hidden lg:block">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <BookCheck />
                                <h1 className="text-xs lg:text-sm font-medium mt-1">
                                    Completed Courses
                                </h1>
                                <span className="flex gap-1 items-center mt-2">
                                    <p className="text-xl font-medium">5</p>
                                    <p>courses</p>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="my-3 bg-white border border-gray-600 shadow-lg rounded-lg lg:w-1/3 md:w-1/2">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                <ScrollText />
                                <h1 className="text-xs lg:text-sm font-medium mt-1">
                                    Certificates
                                </h1>
                                <span className="flex gap-1 items-center mt-2">
                                    <p className="text-xl font-medium">4</p>
                                    <p>certificates</p>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg ">
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
                                    <p className="text-sm text-gray-700">
                                        Enrolled at 14 Nov 2024
                                    </p>
                                </div>
                                <div className="py-1">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-700">
                                            Progress
                                        </h1>
                                        <p className="text-black font-medium">
                                            54%
                                        </p>
                                    </div>
                                    {/* 👇 force progress bar to take full width */}
                                    <Progress
                                        value={54}
                                        className="mt-2 w-full"
                                    />
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
                                    <p className="text-sm text-gray-700">
                                        Enrolled at 14 Nov 2024
                                    </p>
                                </div>
                                <div className="py-1">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-700">
                                            Progress
                                        </h1>
                                        <p className="text-black font-medium">
                                            54%
                                        </p>
                                    </div>
                                    {/* 👇 force progress bar to take full width */}
                                    <Progress
                                        value={54}
                                        className="mt-2 w-full"
                                    />
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
                                    <p className="text-sm text-gray-700">
                                        Enrolled at 14 Nov 2024
                                    </p>
                                </div>
                                <div className="py-1">
                                    <div className="flex justify-between">
                                        <h1 className="text-gray-700">
                                            Progress
                                        </h1>
                                        <p className="text-black font-medium">
                                            54%
                                        </p>
                                    </div>
                                    {/* 👇 force progress bar to take full width */}
                                    <Progress
                                        value={54}
                                        className="mt-2 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
