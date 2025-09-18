import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import Icon from "../../../assets/FrontendIcon.jpg";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Switch } from "../ui/switch";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
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

export default function CoursesCategory() {
    return (
        <div>
            <h1 className="text-lg font-medium">Add new category</h1>
            <div className="md:flex gap-2">
                <div className="mt-3 mb-1 md:w-1/2">
                    <Label>Category Icon</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        className="border-gray-400 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Upload an icon (PNG, JPG, or SVG)
                    </p>
                </div>
                <div className="mt-3 mb-1 md:w-1/2">
                    <Label>Category Name</Label>
                    <Input
                        className="border-gray-400 mt-1"
                        placeholder="Write the title of this blog"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-5 md:mt-0">
                <Button>Create</Button>
            </div>
            <hr className="my-5 border-t-gray-400" />
            <div className="flex justify-between my-5">
                <h1 className="text-lg font-medium">Category</h1>
                <Select>
                    <SelectTrigger className="w-[180px] border-gray-700">
                        <SelectValue placeholder="Filter " />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Filter By Newest</SelectItem>
                        <SelectItem value="oldest">Filter By Oldest</SelectItem>
                        <SelectItem value="a-z">Filter By A-Z</SelectItem>
                        <SelectItem value="z-a">Filter By Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="min-w-[920px]">
                    <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                        <li className="basis-[5%]">ID</li>
                        <li className="basis-[40%]">Category</li>
                        <li className="basis-[30%]">Related Courses</li>
                        <li className="basis-[20%]">Visibility</li>
                        <li className="basis-[5%]"></li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                    </ul>
                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                        <li className="basis-[5%]">1</li>
                        <li className="basis-[40%]">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={Icon}
                                    alt=""
                                    className="w-8 h-8 object-cover"
                                />
                                <span className="font-medium">Frontend</span>
                            </div>
                        </li>
                        <li className="basis-[30%]">27</li>
                        <li className="basis-[20%]">
                            <Switch />
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
                                    <DropdownMenuItem className="text-accentYellow">
                                        <Link to="">Edit</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <button className="text-accentRed bg-white w-full text-left px-2 py-2">
                                                    Delete
                                                </button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Are you sure you want to
                                                        delete this menu?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be
                                                        undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </DropdownMenuItem>
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
