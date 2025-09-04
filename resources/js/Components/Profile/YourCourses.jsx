import React from "react";
import { Card, CardContent } from "../ui/card";
import { Clock, Users } from "lucide-react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import CoursesImg from "../../../assets/Courses.jpg";

export default function YourCourses() {
    return (
        <div className="px-5 md:px-6 lg:px-10 py-8">
            <h1 className="text-2xl font-medium mb-6">Your Courses</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-yellow-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Enrolled
                        </span>
                    </div>

                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-yellow-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Enrolled
                        </span>
                    </div>
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-green-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Completed
                        </span>
                    </div>
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-yellow-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Enrolled
                        </span>
                    </div>
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-green-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Completed
                        </span>
                    </div>
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <div className="absolute top-0 left-6 h-24 w-10 bg-yellow-600 flex items-center justify-center clip-bookmark">
                        <span className="text-white text-xs font-semibold rotate-[-90deg] tracking-wide">
                            Enrolled
                        </span>
                    </div>
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                            />
                            <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                Frontend
                            </span>
                            <h1 className="my-3 font-medium text-lg">
                                Fluent in Javascript and its framework, ReactJS
                            </h1>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Users size={16} /> 27 students enrolled
                            </div>
                            <div className="flex items-center gap-1 text-sm py-2">
                                <Clock size={16} /> 18 hours long
                            </div>
                            <div className="py-3">
                                <div className="flex justify-between">
                                    <h1 className="text-gray-700">Progress</h1>
                                    <p className="text-black font-medium">0%</p>
                                </div>
                                <Progress value={0} className="mt-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-6 mb-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
