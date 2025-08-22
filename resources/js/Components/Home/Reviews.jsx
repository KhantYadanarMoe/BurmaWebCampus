import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Profile from "../../../assets/Profile.jpg";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Reviews() {
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
                            <CarouselItem className="lg:basis-1/2 lg:mt-12">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2 lg:mt-12">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2 lg:mt-12">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem className="lg:basis-1/2">
                                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                                    <CardContent className="p-4">
                                        <div className="flex gap-1 items-center mb-4">
                                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                            <span className="font-medium">
                                                4.5
                                            </span>
                                        </div>
                                        <q className="text-gray-900 text-sm">
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit.
                                            Numquam nesciunt vero recusandae
                                            illo alias deserunt praesentium,
                                            labore saepe placeat laboriosam
                                            nulla ut voluptate quae, iste
                                            excepturi nostrum.
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
                                                    Khant Yadanar Moe
                                                </h1>
                                                <p className="text-xs mt-2 text-gray-600">
                                                    Review to:
                                                </p>
                                                <p className="text-xs text-gray-800 font-medium">
                                                    Fluent in Javascript and its
                                                    framework, ReactJS
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
            <hr className="flex md:hidden border-t-gray-500 mb-8 md:mb-0" />
        </div>
    );
}
