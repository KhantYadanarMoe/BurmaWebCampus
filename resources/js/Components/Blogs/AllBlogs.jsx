import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import BlogImg from "../../../assets/Blog.jpg";
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AllBlogs() {
    return (
        <div className="px-5 lg:px-8">
            <div className="flex items-center justify-between mb-2 md:mb-0">
                <div>
                    <h2 className="text-xl md:text-2xl font-medium relative inline-block">
                        All Blogs
                    </h2>
                    <div className="flex items-center">
                        <div className="w-10 md:w-20 h-[2px] bg-accentRed"></div>
                        <div className="w-1 h-1 bg-accentRed rounded-full ml-2"></div>
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter By Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
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
                                        Learning Paths for Website Developers -
                                        2025 Edition
                                    </h1>
                                    <p className="text-sm line-clamp-3">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Natus iusto, voluptate
                                        eius beatae, illum laudantium libero
                                        debitis veritatis ullam tempora,
                                        recusandae odit itaque! Eveniet
                                        reiciendis excepturi perspiciatis.
                                        Tempora fugit a obcaecati odit
                                        similique? Accusantium reprehenderit
                                        facilis quidem maiores!
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
            <div className="my-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
