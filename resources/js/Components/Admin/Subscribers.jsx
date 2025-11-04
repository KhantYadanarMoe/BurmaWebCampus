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
import { Ellipsis, GraduationCap, Plus, Users } from "lucide-react";
import BlogImg from "../../../assets/Blogs.jpg";
import { Link } from "react-router-dom";

export default function Subscribers() {
    return (
        <div>
            <div className="flex justify-between my-4">
                <h1 className="text-xl font-medium">Subscribers</h1>
                <div className="">
                    <Select>
                        <SelectTrigger className="w-[180px] border-gray-700">
                            <SelectValue placeholder="Filter " />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="newest">
                                Filter By Newest
                            </SelectItem>
                            <SelectItem value="oldest">
                                Filter By Oldest
                            </SelectItem>
                            <SelectItem value="a-z">Filter By A-Z</SelectItem>
                            <SelectItem value="z-a">Filter By Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[35%]">Email</li>
                        <li className="basis-[15%] pl-2">User ID</li>
                        <li className="basis-[25%]">Subscribed At</li>
                        <li className="basis-[15%]">Status</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[35%]">
                            khantyadanarmoe@gmail.com
                        </li>
                        <li className="basis-[15%] pl-2">46</li>
                        <li className="basis-[25%]">24th Sep 2025</li>
                        <li className="basis-[15%]">
                            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-md">
                                Subscribed
                            </span>
                        </li>
                        <li className="basis-[5%]">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                        <Ellipsis size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <Link to="">
                                        <DropdownMenuItem className="text-accentGreen">
                                            View Profile
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
