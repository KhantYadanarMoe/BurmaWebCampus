import {
    ChevronsRight,
    Clock,
    CopyPlus,
    File,
    FilePlus2,
    Film,
    Upload,
    Users,
} from "lucide-react";
import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import CourseImg from "../../../assets/Courses.jpg";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

export default function CourseDetailsForm() {
    const percent = 50;

    // State for dynamic outline rows
    const [sublecture, setsublecture] = useState([{ subtitle: "", files: [] }]);

    const { darkMode } = useOutletContext();

    const addSublecture = () => {
        setsublecture([...sublecture, { subtitle: "", files: [] }]);
    };

    // State for dynamic outline rows
    const [outlines, setOutlines] = useState([{ subtitle: "", files: [] }]);

    const addOutlineRow = () => {
        setOutlines([...outlines, { subtitle: "", files: [] }]);
    };

    return (
        <div className="gap-3">
            <div className="">
                <div>
                    <div
                        className={`flex gap-1 items-end ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        } text-sm`}
                    >
                        <Link>Courses</Link>
                        <ChevronsRight size={18} />
                        <Link>Create</Link>
                        <ChevronsRight size={18} />
                        <Link
                            className={`${
                                darkMode ? "text-white" : "text-black"
                            }`}
                        >
                            Details
                        </Link>
                    </div>

                    <div className="flex justify-between mt-6 mb-8">
                        <div>
                            <h1 className="text-lg md:text-2xl font-medium">
                                Lecture Details
                            </h1>
                            <p
                                className={`text-xs md:text-base ${
                                    darkMode ? "text-gray-400" : "text-gray-800"
                                }`}
                            >
                                Please fill, and add lecture for your course.
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
                    <h1 className="text-lg font-medium">Course Outline</h1>
                    <form>
                        {outlines.map((outline, index) => (
                            <Card
                                className="px-4 py-3 mt-3 border border-gray-400"
                                key={index}
                            >
                                <div className="mb-3">
                                    <Label>Outline {index + 1}</Label>
                                    <Input
                                        className={`${
                                            darkMode
                                                ? "border-gray-200"
                                                : "border-gray-400"
                                        } mt-2`}
                                        placeholder="Write the title of outline"
                                    />
                                </div>
                                <div className="ml-8 md:ml-12">
                                    <div className="my-2">
                                        {sublecture.map((outline, index) => (
                                            <div className="flex gap-2">
                                                <div className="w-4/5 md:w-2/3">
                                                    <Input
                                                        className={`${
                                                            darkMode
                                                                ? "border-gray-200"
                                                                : "border-gray-400"
                                                        } mt-2`}
                                                        placeholder="Write the subtitle"
                                                    />
                                                </div>
                                                <div className="w-1/5 md:w-1/3">
                                                    <div className="flex flex-col w-full">
                                                        <div
                                                            className={`flex items-center justify-center gap-2 border ${
                                                                darkMode
                                                                    ? "border-gray-200"
                                                                    : "border-gray-400"
                                                            } p-2 rounded-md mt-2 cursor-pointer`}
                                                        >
                                                            <FilePlus2
                                                                size={20}
                                                                className={`${
                                                                    darkMode
                                                                        ? "text-gray-400"
                                                                        : "text-gray-700"
                                                                }`}
                                                            />
                                                            <Label
                                                                htmlFor={`lecture-upload-${index}`}
                                                                className={`${
                                                                    darkMode
                                                                        ? "text-gray-400"
                                                                        : "text-gray-700"
                                                                } cursor-pointer`}
                                                            >
                                                                <p className="hidden md:block">
                                                                    Add Files /
                                                                    Media
                                                                </p>
                                                            </Label>
                                                            <Input
                                                                id={`lecture-upload-${index}`}
                                                                type="file"
                                                                className="hidden"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className="flex gap-1 mt-2">
                                            <div className="px-3 py-2 border border-gray-500 rounded-md bg-gray-200 w-1/3">
                                                <div className="flex gap-1 items-start">
                                                    <Film size={20} />{" "}
                                                    <div>
                                                        <p className="text-sm text-gray-800 font-medium">
                                                            Recording47.mp4
                                                        </p>
                                                        <span className="text-xs text-gray-600">
                                                            234.8mb
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-3 py-2 border border-gray-500 rounded-md bg-gray-200 w-1/3">
                                                <div className="flex gap-1 items-start">
                                                    <File size={20} />{" "}
                                                    <div>
                                                        <p className="text-sm text-gray-800 font-medium">
                                                            Notes.pdf
                                                        </p>
                                                        <span className="text-xs text-gray-600">
                                                            234.8mb
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className="flex justify-end mt-5">
                                            <button
                                                type="button"
                                                onClick={addSublecture}
                                                className={`flex gap-1 items-center px-3 py-2 border border-dashed ${
                                                    darkMode
                                                        ? "border-gray-300"
                                                        : "border-gray-600"
                                                } rounded-md`}
                                            >
                                                <CopyPlus
                                                    size={18}
                                                    className={`${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-800"
                                                    }`}
                                                />
                                                <p
                                                    className={`text-sm ${
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-800"
                                                    }`}
                                                >
                                                    Add More Sub-lecture
                                                </p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {/* Add More Button */}
                        <div className="flex justify-end mt-3">
                            <button
                                type="button"
                                onClick={addOutlineRow}
                                className={`flex gap-1 items-center px-3 py-2 border border-dashed ${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-600"
                                } rounded-md`}
                            >
                                <CopyPlus
                                    size={18}
                                    className={`${
                                        darkMode
                                            ? "text-gray-400"
                                            : "text-gray-800"
                                    }`}
                                />
                                <p
                                    className={`text-sm ${
                                        darkMode
                                            ? "text-gray-400"
                                            : "text-gray-800"
                                    }`}
                                >
                                    Add More Outline
                                </p>
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <Button className="mt-12">Next</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
