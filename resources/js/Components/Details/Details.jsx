import { ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Details() {
    return (
        <div className="px-5 lg:px-8">
            <div className="pt-6 pb-12 flex">
                <div className="w-2/3">
                    <ul className="flex text-gray-800 mb-8">
                        <li>
                            <Link className="flex items-center text-gray-600 text-sm">
                                <span className="mb-1">Home</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center text-gray-600 text-sm">
                                <span className="mb-1">Courses</span>{" "}
                                <ChevronsRight size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link className="flex items-center text-sm">
                                <span className="mb-1 text-black">
                                    Full-Stack Web Development Pathway
                                </span>{" "}
                            </Link>
                        </li>
                    </ul>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-xl md:text-2xl font-medium mb-1">
                                Full-Stack Web Development Pathway
                            </h1>
                            <p className="text-sm text-gray-600">
                                18th Jun 2025, 6:35 PM
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                            <p className="text-sm">Chapter 2/12</p>
                            <Button
                                variant="outline"
                                className="px-1 py-1 border-none shadow-none hover:bg-white"
                            >
                                <ChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="px-1 py-1 border-none shadow-none hover:bg-white"
                            >
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                    {/* video */}
                </div>
            </div>
        </div>
    );
}
