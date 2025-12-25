import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Profile from "../../../assets/Profile.jpg";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Empty from "../../../assets/Empty.png";

export default function Reviews() {
    let [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    let getReviews = async () => {
        setLoading(true);
        try {
            let res = await axios.get("/api/reviews");
            let data = res.data;
            const filteredReviews = data.reviews.filter(
                (review) => review.visibility == 1
            );
            setReviews(filteredReviews);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getReviews();
    }, []);

    const SkeletonCard = () => (
        <CarouselItem className="lg:basis-1/2">
            <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                <CardContent className="p-4 space-y-4">
                    <div className="flex gap-2 items-center mb-4">
                        <div className="w-6 h-6 bg-gray-300 animate-pulse rounded" />
                        <div className="w-8 h-4 bg-gray-300 animate-pulse rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <div className="w-full h-3 bg-gray-300 animate-pulse rounded-md" />
                        <div className="w-5/6 h-3 bg-gray-300 animate-pulse rounded-md" />
                        <div className="w-4/6 h-3 bg-gray-300 animate-pulse rounded-md" />
                    </div>

                    <hr className="my-4 border-t-gray-400" />

                    <div className="flex gap-3 items-center">
                        <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full" />

                        <div className="space-y-2">
                            <div className="w-24 h-4 bg-gray-300 animate-pulse rounded-md" />

                            <div className="flex gap-2 items-center">
                                <div className="w-14 h-3 bg-gray-300 animate-pulse rounded-md" />
                                <div className="w-20 h-3 bg-gray-300 animate-pulse rounded-md" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </CarouselItem>
    );
    return (
        <div className="px-5 lg:px-8">
            <div className="md:flex gap-8 items-center py-8 md:my-12">
                <div className="md:w-1/2 lg:w-1/3">
                    <h1 className="text-3xl font-medium italic">
                        What our students says
                    </h1>
                    <p className="text-sm text-gray-600 py-2">
                        Here's how our students describe us in case you need to
                        make sure our courses are effective.
                    </p>
                </div>

                <div className="w-[96%] mx-auto md:w-1/2 lg:w-2/3 mt-5 md:mt-0">
                    <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent>
                            {loading ? (
                                Array.from({ length: 6 }).map((_, idx) => (
                                    <SkeletonCard key={idx} />
                                ))
                            ) : reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <CarouselItem
                                        className={`lg:basis-1/2 ${
                                            review.id % 2 !== 0
                                                ? "lg:mt-12"
                                                : ""
                                        }`}
                                    >
                                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div className="flex gap-1 items-center mb-4">
                                                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                                    <span className="font-medium">
                                                        {review.rating}
                                                    </span>
                                                </div>
                                                <q className="text-gray-900 text-sm">
                                                    {review.review}
                                                </q>
                                                <hr className="my-4 border-t-gray-400" />
                                                <div className="flex gap-2 items-center">
                                                    <img
                                                        src={Profile}
                                                        alt=""
                                                        className="w-12 h-12 object-cover rounded-full"
                                                    />
                                                    <div>
                                                        <h1 className="text-sm font-medium">
                                                            {review.name}
                                                        </h1>
                                                        <div className="flex gap-2 mt-2 items-center">
                                                            <p className="text-xs text-gray-600">
                                                                Review to:
                                                            </p>
                                                            <p className="text-xs text-gray-800 font-medium">
                                                                {review.course
                                                                    ?.title ||
                                                                    ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
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
                    </Carousel>
                </div>
            </div>
            <hr className="flex md:hidden border-t-gray-500 mb-8 md:mb-0" />
        </div>
    );
}
