import {
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    PanelRightOpen,
    Play,
    Trophy,
    X,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import Course from "../../../assets/Courses.jpg";
import { Progress } from "@/components/ui/progress";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import Pf from "../../../assets/Profile.jpg";
import ReviewModal from "../ReviewModal";
import axios from "axios";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default function Details() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showReply, setShowReply] = useState(false);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        content: "",
        subtitle_id: null,
        parent_id: null,
    });
    const [errors, setErrors] = useState({});
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    // Fetch course details
    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`/api/course/${id}`);
                setCourse(res.data.course);
            } catch (err) {
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };
        getDetails();
    }, [id]);

    // Fetch comments whenever selected subtitle changes
    useEffect(() => {
        if (!form.subtitle_id) return;

        const fetchComments = async () => {
            try {
                const res = await axios.get(
                    `/api/subtitle/${form.subtitle_id}/comments`
                );
                setComments(res.data.comments);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };
        fetchComments();
    }, [form.subtitle_id]);

    const formatDate = (date) => dayjs(date).format("D MMM YYYY, h:mm A");

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course not found.</p>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.subtitle_id) return alert("Select a subtitle first!");

        const url = "/api/comment/create";
        const formData = new FormData();
        formData.append("content", form.content);
        formData.append("subtitle_id", form.subtitle_id);
        if (form.parent_id) {
            formData.append("parent_id", form.parent_id);
        }

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const res = await axios.post(url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (
                res.data.message === "Comment posted successfully." ||
                res.data.message === "Reply posted successfully."
            ) {
                setForm({ ...form, content: "" });
                setShowReply(null);
                // Refresh comments
                const updated = await axios.get(
                    `/api/subtitle/${form.subtitle_id}/comments`
                );
                setComments(updated.data.comments);
            }
        } catch (error) {
            console.error("Error sending comment:", error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="px-5 lg:px-8">
            <div className="pb-12 flex gap-3">
                <div
                    className={`
                    ${isSidebarOpen ? "lg:w-2/3" : "lg:w-full"} 
                    w-full 
                    transition-all duration-300 pt-3 md:pt-6 
          `}
                >
                    <ul className="flex text-gray-800 mb-8">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center text-gray-600 text-xs md:text-sm"
                            >
                                <span className="mb-1">Home</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/courses"
                                className="flex items-center text-gray-600 text-xs md:text-sm"
                            >
                                <span className="mb-1">Courses</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center text-xs md:text-sm">
                                <span className="mb-1 text-black">
                                    {course.title}
                                </span>{" "}
                            </Link>
                        </li>
                    </ul>
                    <div className="md:flex justify-between items-start">
                        <div>
                            <h1 className="text-xl md:text-2xl font-medium mb-1">
                                {course.title}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {formatDate(course.created_at)}
                            </p>
                        </div>
                        <div>
                            <div className="hidden md:flex items-center justify-center gap-1">
                                <p className="text-sm">Chapter 2/12</p>

                                <Button
                                    variant="outline"
                                    className="px-1 py-1 border-none shadow-none hover:bg-white"
                                >
                                    <ChevronLeft />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="px-1 py-1 border-none shadow-none hover:bg-white"
                                >
                                    <ChevronRight />
                                </Button>
                            </div>
                            {/* <ReviewModal /> */}
                        </div>
                    </div>
                    {/* video */}
                    <img
                        src={Course}
                        alt=""
                        className="w-full h-64 md:h-96 object-cover my-5"
                    />

                    {/* <div className="my-3">
                        <h1 className="text-lg font-medium">Resources</h1>
                        <ul className="list-disc my-3">
                            <li className="ml-4 my-2">
                                <Link
                                    to="https://genovotechnology.com/backend-development/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base hover:underline"
                                >
                                    A Comprehensive Guide to understanding
                                    website development
                                </Link>
                            </li>
                            <li className="ml-4 my-2">
                                <Link
                                    to="https://genovotechnology.com/backend-development/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base hover:underline"
                                >
                                    What Is Backend Development?
                                </Link>
                            </li>
                            <li className="ml-4 my-2">
                                <Link
                                    to="https://genovotechnology.com/backend-development/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base hover:underline"
                                >
                                    What Is Back-End Development? (Definition,
                                    Features)
                                </Link>
                            </li>
                            <li className="ml-4 my-2">
                                <Link
                                    to="https://genovotechnology.com/backend-development/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm md:text-base hover:underline"
                                >
                                    Backend Development: Ultimate Guide (2025) -
                                    Mastering Backend
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                    <hr className="mt-7 border-t-gray-500" />
                    <div className="my-3">
                        <h1 className="text-lg font-medium mb-3">Comments</h1>
                        <p className="text-sm text-gray-500">
                            Commenting on subtitle:{" "}
                            {form.subtitle_id
                                ? `#${form.subtitle_id}`
                                : "(not selected)"}
                        </p>

                        <div className="my-3 px-3 md:px-4 py-3 md:py-4 border border-gray-300 rounded-md shadow-lg">
                            <Textarea
                                id="content"
                                name="content"
                                value={form.content}
                                onChange={handleInputChange}
                                className="border-gray-500 h-32"
                                placeholder="Write Here..."
                            />
                            <div className="flex justify-end items-end mt-3">
                                <Button onClick={submit}>Submit</Button>
                            </div>
                        </div>
                        <div className="my-5">
                            {comments.length === 0 && (
                                <p className="text-gray-500 text-sm">
                                    No comments for this lecture yet.
                                </p>
                            )}
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="px-3 py-3 border-b border-gray-200"
                                >
                                    {/* Parent comment */}
                                    <div className="flex gap-2 items-center">
                                        <img
                                            src={
                                                comment.user?.image
                                                    ? `/storage/${comment.user.image}`
                                                    : Pf
                                            }
                                            alt="profile"
                                            className="rounded-full w-10 h-10 object-cover"
                                        />
                                        <div>
                                            <h1 className="text-base font-medium">
                                                {comment.user?.name}
                                            </h1>
                                            <p className="text-sm text-gray-700">
                                                {dayjs(
                                                    comment.created_at
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-800 mt-3">
                                        {comment.content}
                                    </p>

                                    {/* Reply button for parent only */}
                                    <div className="flex justify-end">
                                        <Button
                                            className="mt-3"
                                            onClick={() =>
                                                setShowReply(
                                                    showReply === comment.id
                                                        ? null
                                                        : comment.id
                                                )
                                            }
                                        >
                                            Reply
                                        </Button>
                                    </div>

                                    {/* Reply input */}
                                    {showReply === comment.id && (
                                        <div className="mt-3 ml-10">
                                            <Textarea
                                                name="content"
                                                value={
                                                    form.parent_id ===
                                                    comment.id
                                                        ? form.content
                                                        : ""
                                                }
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        content: e.target.value,
                                                        parent_id: comment.id,
                                                    })
                                                }
                                                className="border-gray-400 h-24"
                                                placeholder="Write your reply..."
                                            />
                                            <div className="flex justify-end mt-2">
                                                <Button onClick={submit}>
                                                    Submit Reply
                                                </Button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Nested replies */}
                                    {comment.replies &&
                                        comment.replies.length > 0 && (
                                            <div className="mt-2">
                                                {comment.replies.map(
                                                    (reply) => (
                                                        <div
                                                            key={reply.id}
                                                            className="ml-6 my-4 border-l border-gray-300 pl-4"
                                                        >
                                                            <div className="flex gap-2 items-center">
                                                                <img
                                                                    src={
                                                                        reply
                                                                            .user
                                                                            ?.image
                                                                            ? `/storage/${reply.user.image}`
                                                                            : Pf
                                                                    }
                                                                    alt="profile"
                                                                    className="rounded-full w-8 h-8 object-cover"
                                                                />
                                                                <div>
                                                                    <h2 className="text-sm font-medium">
                                                                        {
                                                                            reply
                                                                                .user
                                                                                ?.name
                                                                        }
                                                                    </h2>
                                                                    <p className="text-xs text-gray-600">
                                                                        {dayjs(
                                                                            reply.created_at
                                                                        ).fromNow()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm text-gray-700 mt-1 ml-10">
                                                                {reply.content}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isSidebarOpen && (
                    <div
                        className={`
                           w-full lg:w-1/3
      z-40 bg-white
      flex flex-col pt-3 px-4 lg:px-0 lg:pr-3
      transform transition-transform duration-300 ease-in-out
       ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} 

       right-0 h-[calc(100vh-75px)] md:h-[calc(100vh-110px)] lg:h-[80vh]

      /* Large = sidebar fixed height & scrollable internally */
      lg:sticky lg:top-32
      scrollbar-hover
            `}

                        // right-0 h-[80vh]  /* fits under navbar */

                        // /* Sticky for large screens */
                        // lg:sticky lg:top-32

                        // /* Scroll inside the sidebar */
                        // overflow-y-auto
                        // scrollbar-hover
                    >
                        <div className="flex justify-between items-center">
                            <h1 className="text-base md:text-lg font-medium mb-1">
                                {course.title}
                            </h1>
                            <button
                                className="px-1 py-1 bg-black text-white rounded-full"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="my-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-700">
                                    Completed 45% out of 100%
                                </p>
                                <Trophy size={20} />
                            </div>
                            <Progress value={45} className="mt-2" />
                        </div>
                        <div>
                            <Accordion
                                type="single"
                                collapsible
                                className="mt-5"
                            >
                                {course.outlines.map((outline, index) => (
                                    <AccordionItem
                                        key={outline.id}
                                        value={`item-${index + 1}`}
                                        className="px-2 py-2 rounded-lg border-b-gray-300"
                                    >
                                        <AccordionTrigger>
                                            Chapter-{index + 1}: {outline.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {outline.subtitles?.map(
                                                (sub, index) => (
                                                    <button
                                                        key={sub.id}
                                                        className="flex gap-2 items-center py-2"
                                                        onClick={() =>
                                                            setForm((prev) => ({
                                                                ...prev,
                                                                subtitle_id:
                                                                    sub.id,
                                                            }))
                                                        }
                                                    >
                                                        <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                            {index + 1}
                                                        </p>
                                                        <p>{sub.subtitle}</p>
                                                    </button>
                                                )
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                )}

                {/* Floating reopen button when sidebar is hidden */}
                {!isSidebarOpen && (
                    <button
                        className="absolute mt-8 md:mt-0 right-4 bg-black text-white p-2 rounded-full shadow-md"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <PanelRightOpen size={20} />
                    </button>
                )}
            </div>
        </div>
    );
}
