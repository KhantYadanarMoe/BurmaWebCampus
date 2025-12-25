import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Clock, Users } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Empty from "../../../assets/Empty.png";

export default function Courses() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [alertAction, setAlertAction] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showCartAlert, setShowCartAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    const getCourses = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    const navigate = useNavigate();

    const handleEnrollClick = (course) => {
        if (!user) {
            setAlertMessage("You must register first!");
            setAlertAction(() => () => navigate("/register"));
            setShowCartAlert(true);
            return;
        }

        const alreadyEnrolled = user?.courses?.some((c) => c.id === course.id);

        if (alreadyEnrolled) {
            setAlertMessage("You already enrolled this course!");
            setShowCartAlert(true);
            return;
        }

        const storedCart = JSON.parse(
            localStorage.getItem("enrolledCourses") || "[]"
        );

        if (storedCart.length > 0) {
            setAlertMessage("Something is already in your cart!");
            setShowCartAlert(true);
        } else {
            localStorage.setItem("enrolledCourses", JSON.stringify([course]));
            navigate(`/course/${slugify(course.title)}`);
        }
    };

    function slugify(text) {
        return text
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }

    const formatHours = (totalHours) => {
        const hours = Math.floor(totalHours); // full hours
        const minutes = Math.round((totalHours - hours) * 60); // remaining minutes
        return `${hours}h ${minutes}m`;
    };

    const SkeletonCard = () => (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1 mt-4 md:mt-8">
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4 space-y-4">
                        <div className="w-full h-40 lg:h-36 bg-gray-300 animate-pulse rounded-md" />

                        <div className="w-24 h-5 bg-gray-300 animate-pulse rounded-md" />

                        <div className="w-3/4 h-5 bg-gray-300 animate-pulse rounded-md" />

                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded" />
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-300 animate-pulse rounded" />
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="w-20 h-4 bg-gray-300 animate-pulse rounded-md" />
                            <div className="w-10 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>

                        <div className="w-full h-2 bg-gray-300 animate-pulse rounded-md" />

                        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md mt-3" />
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>
    );

    return (
        <div className="px-5 lg:px-8">
            <div className="pb-8 md:pb-12">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mx-auto"
                >
                    <div className="flex items-center justify-between md:justify-normal md:gap-4">
                        <h1 className="text-3xl font-medium mb-5">
                            Our Courses
                        </h1>
                        <hr className="hidden md:flex flex-grow border-t border-gray-700" />
                        <div className="flex gap-1">
                            <CarouselPrevious className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                            <CarouselNext className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                        </div>
                    </div>
                    <div>
                        <CarouselContent>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, idx) => (
                                    <SkeletonCard key={idx} />
                                ))
                            ) : courses.length > 0 ? (
                                courses.map((course) => (
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                        <div className="p-1 mt-4 md:mt-8">
                                            <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                                <CardContent className="p-4">
                                                    <div>
                                                        <img
                                                            src={`/storage/${course.image}`}
                                                            alt=""
                                                            className="w-full h-40 lg:h-36 object-cover rounded-md mb-4"
                                                        />
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            {
                                                                course.category
                                                                    .name
                                                            }
                                                        </span>
                                                        <h1 className="my-3 font-medium text-lg">
                                                            {course.title}
                                                        </h1>
                                                        <div className="flex items-center gap-1 text-sm py-2">
                                                            <Users size={16} />{" "}
                                                            {
                                                                course.purchases_count
                                                            }{" "}
                                                            students enrolled
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm py-2">
                                                            <Clock size={16} />{" "}
                                                            {formatHours(
                                                                course.total_hours
                                                            )}
                                                            {} long
                                                        </div>
                                                        <div className="py-3">
                                                            <div className="flex justify-between">
                                                                <h1 className="text-gray-700">
                                                                    Progress
                                                                </h1>
                                                                <p className="text-black font-medium">
                                                                    {
                                                                        course.progress_percentage
                                                                    }
                                                                    %
                                                                </p>
                                                            </div>
                                                            <Progress
                                                                value={
                                                                    course.progress_percentage
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                        <Button
                                                            className="w-full mt-3"
                                                            onClick={() =>
                                                                handleEnrollClick(
                                                                    course
                                                                )
                                                            }
                                                        >
                                                            Enroll Now
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))
                            ) : (
                                <div className="w-full flex justify-center py-6">
                                    <div className="text-center font-medium text-accentRed">
                                        <img
                                            src={Empty}
                                            alt="No data"
                                            className="mx-auto w-60"
                                        />
                                        <h2 className="text-xl font-semibold text-gray-700 mb-2">
                                            No data to show.
                                        </h2>
                                        <p className="text-gray-500 mb-4 text-sm">
                                            The data you are looking for is
                                            empty.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <hr className="border-t-gray-600" />
            <AlertDialog open={showCartAlert} onOpenChange={setShowCartAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cart Alert</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setShowCartAlert(false)}
                            className="rounded-lg px-4 py-2"
                        >
                            OK
                        </AlertDialogCancel>
                        {alertAction && (
                            <Button
                                onClick={() => {
                                    setShowCartAlert(false);
                                    alertAction();
                                }}
                                className="rounded-lg px-4 py-2"
                            >
                                Register Now
                            </Button>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
