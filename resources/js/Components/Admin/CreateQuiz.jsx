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
import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";
import { getUploadedOutlines } from "@/utils/uploadStore";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function CreateQuiz() {
    const percent = 83; // final step
    const { darkMode } = useOutletContext();
    const navigate = useNavigate();
    const [alertDialog, setAlertDialog] = useState({
        open: false,
        title: "",
        description: "",
    });

    // --- Quiz structure ---
    const [questions, setQuestions] = useState([
        {
            question: "",
            options: [{ text: "", correct: false }],
        },
    ]);

    // --- Load existing quiz from localStorage ---
    useEffect(() => {
        const saved = localStorage.getItem("course_quiz");
        if (saved) setQuestions(JSON.parse(saved));
    }, []);

    // --- Save to localStorage whenever it changes ---
    useEffect(() => {
        localStorage.setItem("course_quiz", JSON.stringify(questions));
    }, [questions]);

    // --- Handle question text ---
    const handleQuestionChange = (index, value) => {
        const updated = [...questions];
        updated[index].question = value;
        setQuestions(updated);
    };

    // --- Handle option text ---
    const handleOptionChange = (qIndex, oIndex, value) => {
        const updated = [...questions];
        updated[qIndex].options[oIndex].text = value;
        setQuestions(updated);
    };

    // --- Mark correct answer ---
    const toggleCorrect = (qIndex, oIndex) => {
        const updated = [...questions];
        // Make only one correct per question
        updated[qIndex].options = updated[qIndex].options.map((opt, i) => ({
            ...opt,
            correct: i === oIndex,
        }));
        setQuestions(updated);
    };

    // --- Add new option ---
    const addOption = (qIndex) => {
        const updated = [...questions];
        updated[qIndex].options.push({ text: "", correct: false });
        setQuestions(updated);
    };

    // --- Remove option ---
    const removeOption = (qIndex, oIndex) => {
        const updated = [...questions];
        updated[qIndex].options.splice(oIndex, 1);
        setQuestions(updated);
    };

    // --- Add new question ---
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { question: "", options: [{ text: "", correct: false }] },
        ]);
    };

    // --- Delete question ---
    const deleteQuestion = (index) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    // --- Final Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        const basic = JSON.parse(localStorage.getItem("course_basic") || "{}");
        const details = JSON.parse(
            localStorage.getItem("course_details") || "[]"
        );
        const quiz = questions;

        // 🧠 Get the in-memory files from CourseDetailsForm
        const uploadedOutlines = getUploadedOutlines();

        if (!basic.title || details.length === 0 || quiz.length === 0) {
            setAlertDialog({
                open: true,
                title: "Questions and Options Required",
                description:
                    "Please fill data for final quiz first before submitting.",
            });
            return;
        }

        try {
            let imageFile = null;

            // Try to restore from memory
            if (window._courseImageFile) {
                imageFile = window._courseImageFile;
            } else {
                // Optional fallback if you want to reselect or reload later
                const storedName = sessionStorage.getItem("course_image_name");
                console.log("Image name from session:", storedName);
            }
            const formData = new FormData();

            // 🪄 Append basic info
            formData.append("title", basic.title);
            formData.append("category", basic.category_id);
            formData.append("price", basic.price);
            formData.append("description", basic.description);
            formData.append("outcomes", basic.outcomes);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            // 🪄 Append course details (JSON)
            formData.append("details", JSON.stringify(details));

            // 🪄 Append quiz (JSON)
            formData.append("quiz", JSON.stringify(quiz));

            // 🪄 Now attach each uploaded video file
            uploadedOutlines.forEach((unit, uIndex) => {
                unit.sublectures.forEach((sub, sIndex) => {
                    if (sub.files && sub.files.length > 0) {
                        const uploadKey = `video_${uIndex}_${sIndex}`;
                        formData.append(uploadKey, sub.files[0]); // only first file
                        // Also tell backend which key to look for
                        if (details[uIndex]?.sublectures?.[sIndex]) {
                            details[uIndex].sublectures[sIndex].upload_key =
                                uploadKey;
                        }
                    }
                });
            });

            // Important: re-append updated details with upload keys
            formData.set("details", JSON.stringify(details));

            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const res = await axios.post("/api/courses/create", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                localStorage.removeItem("course_basic");
                localStorage.removeItem("course_details");
                localStorage.removeItem("course_quiz");
                setAlertDialog({
                    open: true,
                    title: "Course Created Successfully!",
                    description:
                        "Your course is recorded in our database. Thank you!",
                    onClose: () => navigate("/admin/courses"),
                });
            }
        } catch (error) {
            console.error("Error creating course:", error);
            setAlertDialog({
                open: true,
                title: "Failed to Create Course",
                description:
                    "An error occurred while creating the course. Check console for details.",
            });
        }
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div
                className={`flex gap-1 items-end ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                } text-sm`}
            >
                <Link to="/admin/courses">Courses</Link>
                <ChevronsRight size={18} />
                <Link className={`${darkMode ? "text-white" : "text-black"}`}>
                    Final Quiz
                </Link>
            </div>

            {/* Header */}
            <div className="flex justify-between mt-6 mb-8">
                <div>
                    <h1 className="text-lg md:text-2xl font-medium">
                        Create Final Quiz
                    </h1>
                    <p
                        className={`text-xs md:text-base ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Add your course quiz questions and correct answers.
                    </p>
                </div>
                <Button onClick={handleSubmit}>Submit</Button>
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

            {/* Quiz Form */}
            <form onSubmit={handleSubmit}>
                {questions.map((q, qIndex) => (
                    <Card
                        key={qIndex}
                        className="px-4 py-3 mt-3 border border-gray-400"
                    >
                        <div className="flex justify-between my-2">
                            <h1 className="text-lg font-medium">
                                Question {qIndex + 1}
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
                                    <DropdownMenuItem
                                        className="text-red-600"
                                        onClick={() => deleteQuestion(qIndex)}
                                    >
                                        Delete Question
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <hr className="my-4 border-t-gray-400" />

                        <div className="mb-3">
                            <Label>Question</Label>
                            <Textarea
                                value={q.question}
                                onChange={(e) =>
                                    handleQuestionChange(qIndex, e.target.value)
                                }
                                className="border-gray-400 mt-1"
                                placeholder="Enter the question"
                            />
                        </div>

                        <div>
                            <h1 className="text-sm font-medium my-2">
                                Choices
                            </h1>
                            {q.options.map((opt, oIndex) => (
                                <div
                                    key={oIndex}
                                    className="flex items-center gap-2 mt-2"
                                >
                                    <input
                                        type="checkbox"
                                        checked={opt.correct}
                                        onChange={() =>
                                            toggleCorrect(qIndex, oIndex)
                                        }
                                        className="w-5 h-5 accent-black"
                                    />
                                    <Input
                                        value={opt.text}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                qIndex,
                                                oIndex,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Option ${oIndex + 1}`}
                                        className="border-gray-400 mt-1"
                                    />
                                    <Trash2
                                        size={20}
                                        className="text-red-500 cursor-pointer"
                                        onClick={() =>
                                            removeOption(qIndex, oIndex)
                                        }
                                    />
                                </div>
                            ))}

                            <div className="flex justify-end mt-5">
                                <button
                                    type="button"
                                    onClick={() => addOption(qIndex)}
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
                    </Card>
                ))}

                {/* Add More Question */}
                <div className="flex justify-end mt-4">
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

                {/* Submit */}
                <div className="flex justify-end">
                    <Button type="submit" className="mt-5">
                        Submit
                    </Button>
                </div>
            </form>
            <AlertDialog
                open={alertDialog.open}
                onOpenChange={(open) =>
                    setAlertDialog((prev) => ({ ...prev, open }))
                }
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertDialog.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => {
                                setAlertDialog((prev) => ({
                                    ...prev,
                                    open: false,
                                }));
                                if (alertDialog.onClose) alertDialog.onClose();
                            }}
                        >
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
