import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Button } from "../ui/button";
import CourseImg from "../../../assets/Courses.jpg";
import { Ellipsis, GraduationCap, Plus, Users } from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link, useOutletContext } from "react-router-dom";

export default function Purchase() {
    const { darkMode } = useOutletContext();
    return (
        <div>
            <h1 className="text-xl font-medium">Purchased Courses</h1>
            <div className="flex flex-col md:flex-row justify-between my-4">
                <div className="flex items-center gap-2">
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Frontend
                        </span>
                    </Link>
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Backend
                        </span>
                    </Link>
                    <Link to="">
                        <span className="px-2 py-1 text-xs md:text-sm border border-gray-500 rounded-lg">
                            Fullstack
                        </span>
                    </Link>
                </div>
                <div className="hidden md:block">
                    <Select>
                        <SelectTrigger className="w-[180px] border-gray-600">
                            <SelectValue placeholder="Filter " />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">
                                Filter By Newest
                            </SelectItem>
                            <SelectItem value="oldest">
                                Filter By Oldest
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[4%]">ID</li>
                        <li className="basis-[8%]">Invoice</li>
                        <li className="basis-[31%] pl-2">Course Name</li>
                        <li className="basis-[20%]">Student Name</li>
                        <li className="basis-[10%]">Payment</li>
                        <li className="basis-[12%]">Date</li>
                        <li className="basis-[10%]">Access</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[4%]">1</li>
                        <li className="basis-[8%]">T3475</li>
                        <li className="basis-[31%] flex items-center gap-2">
                            <img
                                src={CourseImg}
                                alt=""
                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                            />
                            <p className="text-sm font-medium">
                                Full-Stack Web Development Pathway
                            </p>
                        </li>
                        <li className="basis-[20%]">Khant Yadanar Moe</li>
                        <li className="basis-[10%]">Kpay</li>
                        <li className="basis-[12%]">
                            <p className="text-sm">9.10.2025</p>
                            <p className="text-sm">10:28 AM</p>
                        </li>
                        <li className="basis-[10%]">Life-time</li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button
                                        className={`p-1 rounded-md ${
                                            darkMode
                                                ? "hover:bg-gray-800"
                                                : "hover:bg-gray-100"
                                        } outline-none`}
                                    >
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Details
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 flex">
                <div className="ml-auto">
                    <Pagination className="text-accentRed">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}
