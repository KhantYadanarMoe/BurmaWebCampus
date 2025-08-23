import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import BlogImg from "../../../assets/Blog.jpg";

export default function RelatedBlogs() {
    return (
        <div className="px-4 md:px-5 lg:px-8 pb-8">
            <hr className="my-5 border-t-gray-500" />
            <div className="pt-3">
                <h1 className="text-2xl font-medium">Related Blogs</h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="p-1 mt-4 md:mt-6">
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
                <div className="p-1 mt-4 md:mt-6">
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
                <div className="p-1 mt-4 md:mt-6 md:hidden lg:block sm:block">
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
        </div>
    );
}
