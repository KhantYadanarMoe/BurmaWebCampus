import { ChevronRight, ChevronsRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div className="px-5 lg:px-8">
            <div className="pt-10 pb-16">
                <ul className="flex text-gray-800">
                    <li>
                        <Link className="flex items-center">
                            <span className="mb-1">Home</span>{" "}
                            <ChevronsRight size={20} />
                        </Link>
                    </li>
                    <li>
                        <Link className="flex items-center">
                            <span className="mb-1">Courses</span>{" "}
                        </Link>
                    </li>
                </ul>
                <h1 className="text-xl md:text-2xl font-medium my-2">
                    Full-Stack Web Development Pathway
                </h1>
            </div>
            <hr className="border-t-gray-500" />
        </div>
    );
}
