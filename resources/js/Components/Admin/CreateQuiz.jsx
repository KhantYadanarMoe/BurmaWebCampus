import {
    ChevronsRight,
    Clock,
    CopyPlus,
    EllipsisVertical,
    FilePlus2,
    Trash2,
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function CreateQuiz() {
    const percent = 83;

    // State for dynamic outline rows
    const [option, setOption] = useState([{ subtitle: "", files: [] }]);

    const addOption = () => {
        setOption([...option, { subtitle: "", files: [] }]);
    };

    const [questions, setQuestions] = useState([{ subtitle: "", files: [] }]);

    const addQuestion = () => {
        setQuestions([...questions, { subtitle: "", files: [] }]);
    };

    const { darkMode } = useOutletContext();

    return (
        <div>
            <div>
                <div
                    className={`flex gap-1 items-end ${
                        darkMode ? "text-gray-300" : "text-gray-800"
                    } text-sm`}
                >
                    <Link>Courses</Link>
                    <ChevronsRight size={18} />
                    <Link
                        className={`${darkMode ? "text-white" : "text-black"}`}
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
                                darkMode ? "text-gray-300" : "text-gray-800"
                            }`}
                        >
                            Please fill in all the details of your course.
                        </p>
                    </div>
                    <Button>Submit</Button>
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
                                        darkMode ? "bg-gray-800" : "bg-white"
                                    }`}
                                >
                                    <span className="block w-4 h-4 rounded-full transform" />
                                </div>
                                <div
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                        darkMode ? "ring-white" : "ring-black"
                                    }`}
                                    style={{
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>

                            <div className="flex-1 flex justify-center relative">
                                <div
                                    className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                        darkMode ? "bg-gray-800" : "bg-white"
                                    }`}
                                >
                                    <span className="block w-4 h-4 rounded-full transform" />
                                </div>
                                <div
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                        darkMode ? "ring-white" : "ring-black"
                                    }`}
                                    style={{
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            </div>

                            <div className="flex-1 flex justify-center relative">
                                <div
                                    className={`flex items-center justify-center w-4 h-4 rounded-full ${
                                        darkMode ? "bg-gray-800" : "bg-white"
                                    }`}
                                >
                                    <span className="block w-4 h-4 rounded-full transform" />
                                </div>
                                <div
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none rounded-full w-4 h-4 ring-2 ${
                                        darkMode ? "ring-white" : "ring-black"
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
                            <div className="truncate">Basic Information</div>
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
                <h1 className="text-lg font-medium">Create Final Quiz</h1>
                <form action="">
                    {questions.map((outline, index) => (
                        <Card
                            className="px-4 py-3 mt-3 border border-gray-400"
                            key={index}
                        >
                            <div className="flex justify-between my-2">
                                <h1 className="text-lg font-medium">
                                    Multiple Choice
                                </h1>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className={`p-1 rounded-md ${
                                                darkMode
                                                    ? "hover:bg-gray-600"
                                                    : "hover:bg-gray-100"
                                            } outline-none`}
                                        >
                                            <EllipsisVertical size={20} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem className="text-accentGreen">
                                                Delete
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <hr className="my-4 border-t-gray-400" />
                            <div className="mb-3">
                                <Label>Question {index + 1}</Label>
                                <Textarea
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter the question"
                                ></Textarea>
                            </div>
                            <div>
                                <div className="my-3">
                                    <h1 className="text-sm font-medium">
                                        Choices
                                    </h1>
                                    {option.map((outline, index) => (
                                        <div className="flex items-center gap-1 md:gap-2 mt-2">
                                            <input
                                                type="checkbox"
                                                class="w-5 h-5 accent-black p-1 mx-1 md:mx-2"
                                            />
                                            <Input
                                                className="border-gray-400 mt-1"
                                                placeholder="Enter the option"
                                            />
                                            <Trash2
                                                size={22}
                                                className="text-red-500 mx-1 md:mx-2"
                                            />
                                        </div>
                                    ))}

                                    <div className="flex justify-end mt-5">
                                        <button
                                            type="button"
                                            onClick={addOption}
                                            className="flex gap-1 items-center px-3 py-2 border border-dashed border-gray-600 rounded-md"
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
                                                Add More Option
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
                            onClick={addQuestion}
                            className="flex gap-1 items-center px-3 py-2 border border-dashed border-gray-600 rounded-md"
                        >
                            <CopyPlus
                                size={18}
                                className={`${
                                    darkMode ? "text-gray-400" : "text-gray-800"
                                }`}
                            />
                            <p
                                className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-800"
                                }`}
                            >
                                Add More Question
                            </p>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <Button className="mt-5">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
