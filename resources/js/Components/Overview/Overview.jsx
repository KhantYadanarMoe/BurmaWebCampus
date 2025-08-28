import { CircleCheck, Clock, Play, Users } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import CoursesImg from "../../../assets/Courses.jpg";
import { Button } from "../ui/button";

export default function Overview() {
    return (
        <div className="px-5 lg:px-8 py-3">
            <div className="md:flex gap-3">
                <div className="md:w-3/5 mt-3 md:mt-0">
                    <h1 className="text-xl font-medium my-3">
                        About this course
                    </h1>
                    <p className="text-gray-800 text-sm leading-6">
                        The Full-Stack Web Development Pathway is a structured
                        program that takes learners from the foundations of
                        coding to building fully functional, production-ready
                        web applications. It blends both front-end and back-end
                        development, ensuring a complete understanding of how
                        modern websites and apps are designed, developed, and
                        deployed. <br />
                        Through practical projects and hands-on learning,
                        students will not only master the core technologies
                        behind full-stack development but also gain the
                        confidence to create scalable applications, manage
                        databases, and work with cloud deployment tools—skills
                        that are in high demand across the tech industry.
                    </p>
                    <div className="mt-6">
                        <h1 className="text-xl font-medium my-3">
                            What you'll learn
                        </h1>
                        <div className="flex flex-wrap items-center mt-3">
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Build responsive and accessible web pages
                                    using HTML, CSS, and JavaScript.
                                </p>
                            </span>
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Master popular front-end frameworks like
                                    React for interactive user interfaces.
                                </p>
                            </span>
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Develop powerful back-end services using
                                    Node.js and RESTful APIs.
                                </p>
                            </span>
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Work with databases (SQL and NoSQL) to
                                    store, manage, and retrieve data.
                                </p>
                            </span>
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Deploy applications to the cloud with
                                    platforms like AWS or Heroku.
                                </p>
                            </span>
                            <span className="lg:w-1/2 flex gap-1 my-2 pr-2">
                                <CircleCheck
                                    size={22}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Create a professional portfolio of
                                    full-stack projects to showcase your skills.
                                </p>
                            </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h1 className="text-xl font-medium my-3">
                            Requirements
                        </h1>
                        <div className="mt-4">
                            <span className="flex gap-2 my-4">
                                <CircleCheck
                                    size={18}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    No prior programming experience is
                                    required—beginners are welcome.
                                </p>
                            </span>
                            <span className="flex gap-2 my-4">
                                <CircleCheck
                                    size={18}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    A computer with internet access is essential
                                    for coding and project work.
                                </p>
                            </span>
                            <span className="flex gap-2 my-4">
                                <CircleCheck
                                    size={18}
                                    className="text-green-600"
                                />{" "}
                                <p className="text-gray-700 text-sm">
                                    Dedication to consistent practice and
                                    project-based learning ensures success.
                                </p>
                            </span>
                        </div>
                    </div>
                    <hr className="border-t-gray-500 mt-6" />
                    <div className="my-5">
                        <div className="flex justify-between items-center mt-4">
                            <h1 className="font-medium text-lg">Curriculum</h1>
                            <p className="text-gray-700 text-sm">23 Hours</p>
                        </div>
                        <div className="my-2">
                            <Accordion
                                type="single"
                                collapsible
                                className="mt-5"
                            >
                                <AccordionItem
                                    value="item-1"
                                    className="border border-gray-500 px-2 rounded-lg my-2"
                                >
                                    <AccordionTrigger>
                                        Chapter-1: Introduction to Web
                                        Development
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-2"
                                    className="border border-gray-500 px-2 rounded-lg my-2"
                                >
                                    <AccordionTrigger>
                                        Chapter-2: Frontend Fundamentals (HTML &
                                        CSS)
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                HTML basics: structure, tags,
                                                and attributes
                                            </p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                Creating forms and input fields
                                            </p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                CSS basics: selectors,
                                                properties, and values
                                            </p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                The CSS box model and layout
                                                techniques
                                            </p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                Responsive design with media
                                                queries
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-3"
                                    className="border border-gray-500 px-2 rounded-lg my-2"
                                >
                                    <AccordionTrigger>
                                        Chapter-3: JavaScript Essentials
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-4"
                                    className="border border-gray-500 px-2 rounded-lg my-2"
                                >
                                    <AccordionTrigger>
                                        Chapter-4: Introduction to Backend
                                        Development
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>
                                                Introduction to HTML, CSS, and
                                                JavaScript
                                            </p>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem
                                    value="item-5"
                                    className="border border-gray-500 px-2 rounded-lg my-2"
                                >
                                    <AccordionTrigger>
                                        Chapter-5: Advanced PHP Concepts
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>What is web development?</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
                                            <p>The client-server model</p>
                                        </Link>
                                        <Link className="flex gap-1 items-center py-2">
                                            <Play size={18} />{" "}
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
                </div>
                <div className="md:w-2/5">
                    <hr className="block md:hidden border-t-gray-500 my-8" />
                    <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg w-full md:w-[98%] lg:w-[95%] mx-auto my-4">
                        <CardContent className="p-4">
                            <div>
                                <img
                                    src={CoursesImg}
                                    alt=""
                                    className="w-full h-40 md:h-32 lg:h-36 object-cover rounded-md mb-4"
                                />
                                <span className="px-2 py-1 text-xs lg:text-sm border border-gray-700 rounded-lg">
                                    Frontend
                                </span>
                                <h1 className="my-2 lg:my-3 font-medium text-base lg:text-lg">
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </h1>
                                <div className="flex items-center gap-1 text-xs lg:text-sm py-2">
                                    <Users size={16} /> 27 students enrolled
                                </div>
                                <div className="flex items-center gap-1 text-xs lg:text-sm py-2">
                                    <Clock size={16} /> 18 hours long
                                </div>
                                <span className="text-xl font-medium my-2 flex justify-between">
                                    <span className="text-gray-700 text-base">
                                        Price -
                                    </span>
                                    <span>300,000 MMK</span>
                                </span>
                                <Button className="w-full mt-3">
                                    Enroll Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
