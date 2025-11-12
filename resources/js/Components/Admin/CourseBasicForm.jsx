import { ChevronsRight, Clock, Upload, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import CourseImg from "../../../assets/Courses.jpg";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import axios from "axios";

export default function CourseBasicForm() {
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();
    const percent = 33; // progress bar step 1
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        image: null,
        imagePreview: "",
        title: "",
        category_id: "",
        price: "",
        description: "",
        outcomes: "",
    });

    const getCategories = async () => {
        try {
            const res = await axios.get("/api/course/categories");
            setCategories(res.data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // --- restore from localStorage if exists ---
    useEffect(() => {
        const saved = localStorage.getItem("course_basic");
        if (saved) {
            const data = JSON.parse(saved);
            setForm((prev) => ({
                ...prev,
                ...data,
                imagePreview: data.imagePreview || "",
            }));
        }
    }, []);

    // --- handle change ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCustomChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // --- handle image upload ---
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // --- handle Next button ---
    const handleNext = (e) => {
        e.preventDefault();

        if (!form.title || !form.category_id) {
            alert("Please fill out required fields before continuing.");
            return;
        }

        // Save form (without file) to localStorage
        localStorage.setItem(
            "course_basic",
            JSON.stringify({
                ...form,
                imagePreview, // just for display if needed
            })
        );

        // Save actual file temporarily to sessionStorage (for reload safety)
        if (imageFile) {
            sessionStorage.setItem("course_image_name", imageFile.name);
            window._courseImageFile = imageFile; // store in memory globally
        }

        navigate("/admin/courses/create/details");
    };

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
                        <Button
                            onClick={handleNext}
                            className="flex gap-1 items-center"
                        >
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
                    <form onSubmit={handleNext}>
                        {/* Image upload */}
                        <div className="my-4 border border-gray-400 p-6 rounded-md text-center">
                            {form.imagePreview ? (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={form.imagePreview}
                                        alt="preview"
                                        className="w-48 h-32 object-cover rounded-md mb-3"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview("");
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        } text-4xl mb-3`}
                                    />
                                    <Label
                                        htmlFor="image-upload"
                                        className={`cursor-pointer ${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        Click to upload or drag an image
                                    </Label>
                                    <Input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Title & Category */}
                        <div className="md:flex gap-2">
                            <div className="my-3 md:w-1/2">
                                <Label>Course Title</Label>
                                <Input
                                    name="title"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    className="border-gray-400 mt-1"
                                    placeholder="Write the title of your course"
                                />
                            </div>
                            <div className="my-3 md:w-1/2">
                                <Label>Category</Label>
                                <Select
                                    onValueChange={(val) =>
                                        handleCustomChange("category_id", val)
                                    }
                                >
                                    <SelectTrigger className="mt-1 border-gray-400">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-60">
                                        {categories.map((cat) => (
                                            <SelectItem
                                                key={cat.id}
                                                value={cat.id.toString()}
                                            >
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="my-3">
                            <Label>Price</Label>
                            <Input
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                                placeholder="Enter course price"
                            />
                        </div>

                        {/* Description */}
                        <div className="my-3">
                            <Label>About this course</Label>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                                placeholder="Explain about your course"
                            />
                        </div>

                        {/* Outcomes */}
                        <div className="my-3">
                            <Label>What you’ll learn</Label>
                            <Textarea
                                name="outcomes"
                                value={form.outcomes}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                                placeholder="Skills students will gain from this course"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" className="mt-5">
                                Next
                            </Button>
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
