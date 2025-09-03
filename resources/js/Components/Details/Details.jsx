import {
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
    PanelRightOpen,
    Play,
    Trophy,
    X,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Course from "../../../assets/Courses.jpg";
import { Progress } from "@/components/ui/progress";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import Pf from "../../../assets/Profile.jpg";

export default function Details() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showReply, setShowReply] = useState(false);
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
                            <Link className="flex items-center text-gray-600 text-xs md:text-sm">
                                <span className="mb-1">Home</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center text-gray-600 text-xs md:text-sm">
                                <span className="mb-1">Courses</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center text-xs md:text-sm">
                                <span className="mb-1 text-black">
                                    Full-Stack Web Development Pathway
                                </span>{" "}
                            </Link>
                        </li>
                    </ul>
                    <div className="md:flex justify-between items-start">
                        <div>
                            <h1 className="text-xl md:text-2xl font-medium mb-1">
                                How backend works in real life
                            </h1>
                            <p className="text-sm text-gray-600">
                                18th Jun 2025, 6:35 PM
                            </p>
                        </div>
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
                    </div>
                    {/* video */}
                    <img
                        src={Course}
                        alt=""
                        className="w-full h-64 md:h-96 object-cover my-5"
                    />
                    <div className="my-3">
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
                    </div>
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
                                Full-Stack Web Development Pathway
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
                                <AccordionItem
                                    value="item-1"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-1: Introduction to Web
                                        Development
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-2"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-2: Frontend Fundamentals (HTML &
                                        CSS)
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>
                                                HTML basics: structure, tags,
                                                and attributes
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>
                                                Creating forms and input fields
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                CSS basics: selectors,
                                                properties, and values
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                4
                                            </p>
                                            <p>
                                                The CSS box model and layout
                                                techniques
                                            </p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                5
                                            </p>
                                            <p>
                                                Responsive design with media
                                                queries
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-3"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-3: JavaScript Essentials
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-4"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-4: Introduction to Backend
                                        Development
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-5"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-5: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-6"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-6: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-7"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-7: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-8"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-8: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-9"
                                    className="px-2 py-2 rounded-lg border-b-gray-300"
                                >
                                    <AccordionTrigger>
                                        Chapter-9: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                1
                                            </p>
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                2
                                            </p>
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-2 items-center py-2">
                                            <p className="px-4 py-2 rounded-full border-2 border-gray-800">
                                                3
                                            </p>
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
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
