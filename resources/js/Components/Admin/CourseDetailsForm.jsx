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
import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { setUploadedOutlines } from "@/utils/uploadStore";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function CourseDetailsForm() {
    const percent = 50; // step 2 of 3
    const navigate = useNavigate();
    const { darkMode } = useOutletContext();
    const [showAlert, setShowAlert] = useState(false);

    // --- outline structure ---
    const [outlines, setOutlines] = useState([
        { title: "", sublectures: [{ subtitle: "", files: [] }] },
    ]);

    // --- restore saved outlines from localStorage ---
    useEffect(() => {
        const saved = localStorage.getItem("course_details");
        if (saved) {
            setOutlines(JSON.parse(saved));
        }
    }, []);

    // --- save outlines to localStorage whenever they change ---
    useEffect(() => {
        localStorage.setItem("course_details", JSON.stringify(outlines));
    }, [outlines]);

    // --- handle outline title change ---
    const handleOutlineTitle = (index, value) => {
        const updated = [...outlines];
        updated[index].title = value;
        setOutlines(updated);
    };

    // --- handle subtitle change ---
    const handleSubtitle = (outlineIndex, subIndex, value) => {
        const updated = [...outlines];
        updated[outlineIndex].sublectures[subIndex].subtitle = value;
        setOutlines(updated);
    };

    // --- handle file upload ---
    const handleFileUpload = (outlineIndex, subIndex, e) => {
        const files = Array.from(e.target.files);
        const updated = [...outlines];
        updated[outlineIndex].sublectures[subIndex].files = files;
        setOutlines(updated);
    };

    // --- add new outline (unit) ---
    const addOutline = () => {
        setOutlines([
            ...outlines,
            { title: "", sublectures: [{ subtitle: "", files: [] }] },
        ]);
    };

    // --- add new sublecture (chapter) under an outline ---
    const addSublecture = (outlineIndex) => {
        const updated = [...outlines];
        updated[outlineIndex].sublectures.push({ subtitle: "", files: [] });
        setOutlines(updated);
    };

    // --- handle Next button ---
    const handleNext = (e) => {
        e.preventDefault();

        const hasEmpty = outlines.some(
            (outline) =>
                !outline.title.trim() ||
                outline.sublectures.some((s) => !s.subtitle.trim())
        );

        if (hasEmpty) {
            setShowAlert(true);
            return;
        }

        // ✅ Store the real files temporarily (in memory)
        setUploadedOutlines(outlines);

        // ✅ Only store metadata in localStorage
        const outlinesCopy = outlines.map((outline) => ({
            title: outline.title,
            sublectures: outline.sublectures.map((sub) => ({
                subtitle: sub.subtitle,
                fileName: sub.files[0]?.name || null,
            })),
        }));

        localStorage.setItem("course_details", JSON.stringify(outlinesCopy));

        navigate("/admin/courses/create/quiz");
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
                        <Link to="/admin/courses">Courses</Link>
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
                    <h1 className="text-lg font-medium">Course Outline</h1>
                    <form onSubmit={handleNext}>
                        {outlines.map((outline, outlineIndex) => (
                            <Card
                                key={outlineIndex}
                                className="px-4 py-3 mt-4 border border-gray-400"
                            >
                                <div className="mb-3">
                                    <Label>Outline {outlineIndex + 1}</Label>
                                    <Input
                                        value={outline.title}
                                        onChange={(e) =>
                                            handleOutlineTitle(
                                                outlineIndex,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Write the title of outline"
                                        className={`${
                                            darkMode
                                                ? "border-gray-200"
                                                : "border-gray-400"
                                        } mt-2`}
                                    />
                                </div>

                                <div className="ml-8 md:ml-12 mt-4">
                                    {outline.sublectures.map(
                                        (sub, subIndex) => (
                                            <div
                                                className="flex flex-col md:flex-row gap-3 mb-4"
                                                key={subIndex}
                                            >
                                                <div className="w-full md:w-2/3">
                                                    <Input
                                                        value={sub.subtitle}
                                                        onChange={(e) =>
                                                            handleSubtitle(
                                                                outlineIndex,
                                                                subIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Write the subtitle"
                                                        className={`${
                                                            darkMode
                                                                ? "border-gray-200"
                                                                : "border-gray-400"
                                                        }`}
                                                    />
                                                </div>
                                                <div className="w-full md:w-1/3">
                                                    <div
                                                        className={`flex items-center justify-center gap-2 border ${
                                                            darkMode
                                                                ? "border-gray-200"
                                                                : "border-gray-400"
                                                        } p-2 rounded-md cursor-pointer`}
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
                                                            htmlFor={`lecture-upload-${outlineIndex}-${subIndex}`}
                                                            className={`cursor-pointer ${
                                                                darkMode
                                                                    ? "text-gray-400"
                                                                    : "text-gray-700"
                                                            }`}
                                                        >
                                                            <p className="hidden md:block">
                                                                {outline
                                                                    .sublectures[
                                                                    subIndex
                                                                ].files.length >
                                                                0
                                                                    ? outline.sublectures[
                                                                          subIndex
                                                                      ].files
                                                                          .map(
                                                                              (
                                                                                  f
                                                                              ) =>
                                                                                  f.name
                                                                          )
                                                                          .join(
                                                                              ", "
                                                                          )
                                                                    : "Add Files / Media"}
                                                            </p>
                                                        </Label>
                                                        <Input
                                                            id={`lecture-upload-${outlineIndex}-${subIndex}`}
                                                            type="file"
                                                            multiple
                                                            onChange={(e) =>
                                                                handleFileUpload(
                                                                    outlineIndex,
                                                                    subIndex,
                                                                    e
                                                                )
                                                            }
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}

                                    {/* Add Sublecture Button */}
                                    <div className="flex justify-end mt-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addSublecture(outlineIndex)
                                            }
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
                            </Card>
                        ))}

                        {/* Add Outline Button */}
                        <div className="flex justify-end mt-4">
                            <button
                                type="button"
                                onClick={addOutline}
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

                        {/* Next Button */}
                        <div className="flex justify-end mt-12">
                            <Button type="submit">Next</Button>
                        </div>
                    </form>
                    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Units and Lectures Required
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please fill all outlines and subtitles
                                    before continuing.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <Button onClick={() => setShowAlert(false)}>
                                    OK
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}
