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
import CoursesImg from "../../../assets/Courses.jpg";
import axios from "axios";

export default function Courses() {
    const [courses, setCourses] = useState([]);

    const getCourses = async () => {
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

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
                            {courses.map((course) => (
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
                                                        {course.category.name}
                                                    </span>
                                                    <h1 className="my-3 font-medium text-lg">
                                                        {course.title}
                                                    </h1>
                                                    <div className="flex items-center gap-1 text-sm py-2">
                                                        <Users size={16} />{" "}
                                                        {course.purchases_count}{" "}
                                                        students enrolled
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm py-2">
                                                        <Clock size={16} /> 18
                                                        hours long
                                                    </div>
                                                    <div className="py-3">
                                                        <div className="flex justify-between">
                                                            <h1 className="text-gray-700">
                                                                Progress
                                                            </h1>
                                                            <p className="text-black font-medium">
                                                                0%
                                                            </p>
                                                        </div>
                                                        <Progress
                                                            value={0}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <Button className="w-full mt-3">
                                                        Enroll Now
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <hr className="border-t-gray-600" />
        </div>
    );
}
