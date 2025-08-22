import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import CoursesImg from "../../../assets/Courses.jpg";
import { Progress } from "@/components/ui/progress";
import { Button } from "../ui/button";
import { Clock, Users } from "lucide-react";

export default function AllCourses() {
    return (
        <div className="px-5 lg:px-8">
            <div>
                <h2 className="text-xl md:text-2xl font-medium mb-1 relative inline-block">
                    All Courses
                </h2>
                <div className="flex items-center">
                    <div className="w-10 md:w-20 h-[2px] bg-accentRed"></div>
                    <div className="w-1 h-1 bg-accentRed rounded-full ml-2"></div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="my-4 relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CoursesImg}
                                alt=""
                                className="w-full h-40 lg:h-36 object-cover rounded-md"
                            />
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
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="my-4">
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
