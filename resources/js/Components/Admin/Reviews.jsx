import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { EllipsisVertical, Star } from "lucide-react";
import Profile from "../../../assets/Profile.jpg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";

export default function Reviews() {
    return (
        <div>
            <div className="flex justify-between mb-7">
                <h1 className="text-xl font-medium">Reviews</h1>
                <Select>
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="highest">Highest Rated</SelectItem>
                        <SelectItem value="lowest">Lowest Rated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <ul className="flex space-x-6 my-7 md:my-5">
                <li>
                    <Link
                        to=""
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span>All</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to=""
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span>Unread</span>
                    </Link>
                </li>
                <li>
                    <Link
                        to=""
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span>Published</span>
                    </Link>
                </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 md:mt-0">
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-4">
                        <div className="flex justify-between">
                            <div className="flex gap-1 items-center mb-4">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 stroke-yellow-400" />{" "}
                                <span className="font-medium">4.5</span>
                            </div>
                            <div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <button className="p-1 rounded-md hover:bg-gray-100 outline-none">
                                            <EllipsisVertical size={18} />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-40"
                                    >
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Publish
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link to="">
                                            <DropdownMenuItem>
                                                Mark
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <q className="text-gray-900 text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Numquam nesciunt vero recusandae illo alias
                            deserunt praesentium, labore saepe placeat
                            laboriosam nulla ut voluptate quae, iste excepturi
                            nostrum.
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
                                    Fluent in Javascript and its framework,
                                    ReactJS
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
