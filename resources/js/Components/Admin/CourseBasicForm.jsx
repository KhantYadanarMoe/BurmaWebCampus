import { ChevronsRight, Clock, Upload, Users } from "lucide-react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import CourseImg from "../../../assets/Courses.jpg";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";

export default function CourseBasicForm() {
    const { darkMode } = useOutletContext();
    const percent = 50;

    return (
        <div className="lg:flex gap-3">
            <div className="lg:w-2/3">
                <div>
                    <div
                        className={`flex gap-1 items-end ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        } text-sm`}
                    >
                        <Link>Courses</Link>
                        <ChevronsRight size={18} />
                        <Link
                            className={`${
                                darkMode ? "text-white" : "text-black"
                            }`}
                        >
                            Add new course
                        </Link>
                    </div>

                    <div className="flex justify-between mt-6 mb-8">
                        <div>
                            <h1 className="text-lg md:text-2xl font-medium">
                                Add a New Course
                            </h1>
                            <p
                                className={`text-xs md:text-base ${
                                    darkMode ? "text-gray-400" : "text-gray-800"
                                }`}
                            >
                                Please fill in all the details of your course.
                            </p>
                        </div>
                        <Button className="flex gap-1 items-center">
                            Next <ChevronsRight size={18} className="mt-0.5" />
                        </Button>
                    </div>

                    <div className="w-full">
                        <div className="relative">
                            <div
                                className={`w-full ${
                                    darkMode ? "bg-slate-700" : "bg-slate-200"
                                } rounded-full h-1.5`}
                            />

                            <div
                                className="absolute left-0 top-0 bottom-0 rounded-full overflow-hidden pointer-events-none h-1.5"
                                style={{ width: `${percent}%` }}
                            >
                                <div
                                    className={`h-full ${
                                        darkMode ? "bg-gray-200" : "bg-gray-800"
                                    }`}
                                />
                            </div>

                            <div className="absolute inset-0 flex items-center px-0">
                                <div className="flex-1 flex justify-center relative">
                                    <div
                                        className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                            darkMode
                                                ? "bg-gray-800"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span className="block w-4 h-4 rounded-full transform" />
                                    </div>
                                    <div
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                            darkMode
                                                ? "ring-white"
                                                : "ring-black"
                                        }`}
                                        style={{
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </div>

                                <div className="flex-1 flex justify-center relative">
                                    <div
                                        className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                            darkMode
                                                ? "bg-gray-800"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span className="block w-4 h-4 rounded-full transform" />
                                    </div>
                                    <div
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                            darkMode
                                                ? "ring-white"
                                                : "ring-black"
                                        }`}
                                        style={{
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </div>

                                <div className="flex-1 flex justify-center relative">
                                    <div
                                        className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                            darkMode
                                                ? "bg-gray-800"
                                                : "bg-white"
                                        }`}
                                    >
                                        <span className="block w-4 h-4 rounded-full transform" />
                                    </div>
                                    <div
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                            darkMode
                                                ? "ring-white"
                                                : "ring-black"
                                        }`}
                                        style={{
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between text-sm mt-3 px-1">
                            <div className="text-center flex-1">
                                <div className="truncate">
                                    Basic Information
                                </div>
                            </div>
                            <div className="text-center flex-1">
                                <div className="truncate">Course Details</div>
                            </div>
                            <div className="text-center flex-1">
                                <div className="truncate">Final Quiz</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h1 className="text-lg font-medium">Course Information</h1>
                    <form action="">
                        <div className="flex justify-center mt-5 px-4 py-4 border border-gray-400  rounded-md">
                            <div className="w-full p-8 rounded-md text-center">
                                <div className="flex flex-col items-center">
                                    <Upload
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        } text-4xl mb-4`}
                                    />

                                    <Label
                                        htmlFor="image-upload"
                                        className={`flex items-center gap-1 justify-center cursor-pointer ${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        <p className="hidden md:block">
                                            Drop your image here or
                                        </p>
                                        <p className="text-accentRed font-bold">
                                            Click to browse
                                        </p>
                                    </Label>
                                    <Input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        className="hidden"
                                    />
                                    <p className="mt-4 text-sm">
                                        or drag and drop an image
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex items-center gap-2">
                            <div className="my-3 md:w-1/2">
                                <Label>Course Title</Label>
                                <Input
                                    className="border-gray-400 mt-1"
                                    placeholder="Write the title of your course"
                                />
                            </div>
                            <div className="my-3 md:w-1/2">
                                <Label htmlFor="category_id">Category</Label>
                                <Select>
                                    <SelectTrigger
                                        id="category_id"
                                        name="category_id"
                                        className="mt-1 border-gray-400"
                                    >
                                        <span>Select Category</span>{" "}
                                    </SelectTrigger>
                                    <SelectContent className="w-96 max-h-60">
                                        <SelectItem value="frontend">
                                            Frontend
                                        </SelectItem>
                                        <SelectItem value="backend">
                                            Backend
                                        </SelectItem>
                                        <SelectItem value="fullstack">
                                            Fullstack
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="my-3">
                            <Label>Price</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="Enter the price"
                            />
                        </div>
                        <div className="my-3">
                            <Label>About this course</Label>
                            <Textarea
                                className="border-gray-400 mt-1"
                                placeholder="Explain about your course"
                            ></Textarea>
                        </div>
                        <div className="my-3">
                            <Label>What you'll learn</Label>
                            <Textarea
                                className="border-gray-400 mt-1"
                                placeholder="Skills students will gain from this course"
                            ></Textarea>
                        </div>
                        <div className="flex justify-end">
                            <Button className="mt-5">Next</Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/3">
                <Card className="relative  border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div>
                            <img
                                src={CourseImg}
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
                            <span className="text-xl font-medium my-2 flex justify-between">
                                <span
                                    className={`${
                                        darkMode
                                            ? "text-gray-100"
                                            : "text-gray-700"
                                    } text-base`}
                                >
                                    Price -
                                </span>
                                <span>300,000 MMK</span>
                            </span>
                            <Button className="w-full mt-3">Enroll Now</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
