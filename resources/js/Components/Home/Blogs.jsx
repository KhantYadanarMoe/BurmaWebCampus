import React from "react";
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
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    Clock,
    Users,
} from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link } from "react-router-dom";

export default function Blogs() {
    return (
        <div className="px-3 md:px-5 lg:px-8">
            <div className="pb-12">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mx-auto"
                >
                    <div className="flex items-center justify-between md:justify-normal md:gap-4">
                        <h1 className="text-3xl font-medium mb-5">Blogs</h1>
                        <hr className="hidden md:flex flex-grow border-t border-gray-700" />
                        <div className="flex gap-1">
                            <CarouselPrevious className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                            <CarouselNext className="static md:inline-flex p-2 mt-3 bg-black text-white hover:bg-gray-900 hover:text-white duration-300" />
                        </div>
                    </div>
                    <div>
                        <CarouselContent>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 mt-4 md:mt-8">
                                    <img
                                        src={BlogImg}
                                        alt=""
                                        className="h-52 md:h-56 object-cover w-full rounded-lg border-2 border-gray-600"
                                    />
                                    <Link>
                                        <Card className="relative w-[93%] mx-auto -mt-28 h-58 bg-white border border-gray-600 shadow-lg rounded-lg">
                                            <CardContent className="p-4">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <span className="px-2 py-1 text-sm border border-gray-700 rounded-lg">
                                                            Frontend
                                                        </span>
                                                        <p className="text-sm text-gray-600">
                                                            3 mins read
                                                        </p>
                                                    </div>
                                                    <h1 className="my-2 font-medium text-lg">
                                                        Learning Paths for
                                                        Website Developers -
                                                        2025 Edition
                                                    </h1>
                                                    <p className="text-sm line-clamp-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur,
                                                        adipisicing elit. Natus
                                                        iusto, voluptate eius
                                                        beatae, illum laudantium
                                                        libero debitis veritatis
                                                        ullam tempora,
                                                        recusandae odit itaque!
                                                        Eveniet reiciendis
                                                        excepturi perspiciatis.
                                                        Tempora fugit a
                                                        obcaecati odit
                                                        similique? Accusantium
                                                        reprehenderit facilis
                                                        quidem maiores!
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                    </div>
                </Carousel>
            </div>
            <hr className="border-t-gray-600" />
        </div>
    );
}
