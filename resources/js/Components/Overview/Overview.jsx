import { CircleCheck, Clock, Play, Users } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import CoursesImg from "../../../assets/Courses.jpg";
import { Button } from "../ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function Overview({ course }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const navigate = useNavigate();

    const handleEnroll = (course) => {
        try {
            const existing =
                JSON.parse(localStorage.getItem("enrolledCourses")) || [];
            const alreadyAdded = existing.some((c) => c.id === course.id);

            if (!alreadyAdded) {
                existing.push(course);
                localStorage.setItem(
                    "enrolledCourses",
                    JSON.stringify(existing)
                );
            }

            // Redirect to checkout page
            navigate("/checkout");
        } catch (error) {
            console.error("Error storing course in localStorage:", error);
        }
    };

    return (
        <div className="px-5 lg:px-8 py-3">
            <div className="md:flex gap-3">
                <div className="md:w-3/5 mt-3 md:mt-0">
                    <h1 className="text-xl font-medium my-3">
                        About this course
                    </h1>
                    <p className="text-gray-800 text-sm leading-6">
                        {course.description}
                    </p>
                    <div className="mt-6">
                        <h1 className="text-xl font-medium my-3">
                            What you'll learn
                        </h1>
                        <div className="flex flex-wrap items-center mt-3">
                            {course.outcomes}
                        </div>
                    </div>
                    {/* <div className="mt-6">
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
                    </div> */}
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
                                {course.outlines.map((outline, index) => (
                                    <AccordionItem
                                        key={outline.id}
                                        value={`item-${index + 1}`}
                                        className="border border-gray-500 px-2 rounded-lg my-2"
                                    >
                                        <AccordionTrigger>
                                            Chapter-{index + 1}: {outline.title}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {outline.subtitles?.map((sub) => (
                                                <Link
                                                    key={sub.id}
                                                    className="flex gap-1 items-center py-2"
                                                    to={`/video/${sub.id}`}
                                                >
                                                    <Play size={18} />
                                                    <p>{sub.subtitle}</p>
                                                </Link>
                                            ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
                <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Added to cart</AlertDialogTitle>
                            <AlertDialogDescription>
                                {dialogMessage}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                onClick={() => setDialogOpen(false)}
                            >
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="md:w-2/5">
                    <hr className="block md:hidden border-t-gray-500 my-8" />
                    <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg w-full md:w-[98%] lg:w-[95%] mx-auto my-4">
                        <CardContent className="p-4">
                            <div>
                                <img
                                    src={`/storage/${course.image}`}
                                    alt=""
                                    className="w-full h-40 md:h-32 lg:h-36 object-cover rounded-md mb-4"
                                />
                                <span className="px-2 py-1 text-xs lg:text-sm border border-gray-700 rounded-lg">
                                    {course.category.name}
                                </span>
                                <h1 className="my-2 lg:my-3 font-medium text-base lg:text-lg">
                                    {course.title}
                                </h1>
                                <div className="flex items-center gap-1 text-xs lg:text-sm py-2">
                                    <Users size={16} /> {course.purchases_count}{" "}
                                    students enrolled
                                </div>
                                <div className="flex items-center gap-1 text-xs lg:text-sm py-2">
                                    <Clock size={16} /> 18 hours long
                                </div>
                                <span className="text-xl font-medium my-2 flex justify-between">
                                    <span className="text-gray-700 text-base">
                                        Price -
                                    </span>
                                    <span>{course.price} MMK</span>
                                </span>
                                <Button
                                    className="w-full mt-3"
                                    onClick={() => handleEnroll(course)}
                                >
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
