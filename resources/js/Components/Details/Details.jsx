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
import { Link, useParams } from "react-router-dom";
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

export default function Details() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showReply, setShowReply] = useState(false);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

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

    dayjs.extend(localizedFormat);

    const formatDate = (date) => dayjs(date).format("D MMM YYYY, h:mm A");

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course not found.</p>;

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
                        <div className="my-3 px-3 md:px-4 py-3 md:py-4 border border-gray-300 rounded-md shadow-lg">
                            <Textarea
                                className="border-gray-500 h-32"
                                placeholder="Write Here..."
                            />
                            <div className="flex justify-end items-end mt-3">
                                <Button>Submit</Button>
                            </div>
                        </div>
                        <div className="my-5">
                            <hr className="mt-5 mb-2 border-t-gray-500" />
                            <div className="px-3 py-3">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={Pf}
                                        alt="profile picture"
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <h1 className="text-base font-medium">
                                            Khant Yadanar Moe
                                        </h1>
                                        <p className="text-sm text-gray-700">
                                            6 hours ago
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 mt-3">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ad ipsa numquam ex
                                    voluptate, fugit nostrum mollitia ullam
                                    culpa a ab earum laborum quos aperiam aut ut
                                    dolore vero optio perferendis vitae. Quidem.
                                </p>
                                <div className="flex gap-1 items-center justify-end mt-6">
                                    <Button
                                        className="text-white"
                                        onClick={() => setShowReply(!showReply)}
                                    >
                                        Reply
                                    </Button>
                                </div>
                                {showReply && (
                                    <div className="pl-3 md:pl-4 py-4 md:py-8">
                                        <Textarea
                                            placeholder="Type your reply here..."
                                            className="w-full border-gray-500 h-32"
                                            name="message"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button className="mt-2 text-white">
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr className="my-2 border-t-gray-500" />
                            <div className="px-3 py-3">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={Pf}
                                        alt="profile picture"
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <h1 className="text-base font-medium">
                                            Khant Yadanar Moe
                                        </h1>
                                        <p className="text-sm text-gray-700">
                                            6 hours ago
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 mt-3">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ad ipsa numquam ex
                                    voluptate, fugit nostrum mollitia ullam
                                    culpa a ab earum laborum quos aperiam aut ut
                                    dolore vero optio perferendis vitae. Quidem.
                                </p>
                                <div className="flex gap-1 items-center justify-end mt-6">
                                    <Button
                                        className="text-white"
                                        onClick={() => setShowReply(!showReply)}
                                    >
                                        Reply
                                    </Button>
                                </div>
                                {showReply && (
                                    <div className="pl-3 md:pl-4 py-4 md:py-8">
                                        <Textarea
                                            placeholder="Type your reply here..."
                                            className="w-full border-gray-500 h-32"
                                            name="message"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button className="mt-2 text-white">
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <hr className="my-2 border-t-gray-500" />
                            <div className="px-3 py-3">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={Pf}
                                        alt="profile picture"
                                        className="rounded-full w-10 h-10 object-cover"
                                    />
                                    <div>
                                        <h1 className="text-base font-medium">
                                            Khant Yadanar Moe
                                        </h1>
                                        <p className="text-sm text-gray-700">
                                            6 hours ago
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-800 mt-3">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Ad ipsa numquam ex
                                    voluptate, fugit nostrum mollitia ullam
                                    culpa a ab earum laborum quos aperiam aut ut
                                    dolore vero optio perferendis vitae. Quidem.
                                </p>
                                <div className="flex gap-1 items-center justify-end mt-6">
                                    <Button
                                        className="text-white"
                                        onClick={() => setShowReply(!showReply)}
                                    >
                                        Reply
                                    </Button>
                                </div>
                                {showReply && (
                                    <div className="pl-3 md:pl-4 py-4 md:py-8">
                                        <Textarea
                                            placeholder="Type your reply here..."
                                            className="w-full border-gray-500 h-32"
                                            name="message"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button className="mt-2 text-white">
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                                    <Link className="flex gap-2 items-center py-2">
                                                        <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                            {index + 1}
                                                        </p>
                                                        <p>{sub.subtitle}</p>
                                                    </Link>
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
