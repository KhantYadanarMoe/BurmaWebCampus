import { ChevronsRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function QuizDetails() {
    return (
        <div className="md:flex gap-3 px-5 lg:px-8">
            <div className="md:w-2/3">
                <div className="flex gap-1 items-end text-gray-800 my-3 text-sm md:text-base">
                    <Link>Full-Stack Web Development Pathway</Link>
                    <ChevronsRight size={18} />
                    <Link className="text-black">Final Quiz</Link>
                </div>
                <h1 className="text-2xl font-medium my-5">Final Quiz</h1>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                    <CardContent className="p-4">
                        <div>
                            <h1 className="font-medium">Question 1</h1>
                            <hr className="my-3 border-t-gray-400" />
                            <div>
                                <h1 className="text-sm md:text-base">
                                    Which of the following planets is often
                                    referred to as the "Red Planet" due to the
                                    iron oxide (rust) that covers its surface,
                                    giving it a reddish appearance when viewed
                                    from Earth?
                                </h1>
                                <div className="mt-5 text-sm md:text-base">
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Earth</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Mars</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Venus</p>
                                    </div>
                                    <div className="flex gap-2 items-center my-3">
                                        <input
                                            type="radio"
                                            className="w-4 h-4 accent-black"
                                        />
                                        <p>Jupiter</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end items-end mb-3">
                    <Button>Submit</Button>
                </div>
            </div>
            <div className="hidden md:block md:w-1/3 md:sticky md:top-24 md:self-start">
                <h1 className="text-lg font-medium my-3 pl-3">Navigation</h1>
                <div className="overflow-y-auto custom-scrollbar max-h-[80vh] px-3">
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 1</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 2</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 3</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 4</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 5</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 6</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 7</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 8</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 9</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3">
                            <CardContent className="p-3">
                                <div className="flex gap-2 items-center justify-between">
                                    <p>Question 10</p>
                                    <span className="bg-green-50 text-green-600 px-2 py-1 text-sm border border-green-200 shadow-sm rounded-md">
                                        Done
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}
