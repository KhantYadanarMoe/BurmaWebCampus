import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { LogIn, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <nav className="font-lato bg-white shadow-[0_0_20px_rgba(0,0,0,0.18)] rounded-lg px-3 py-2 md:py-5 md:px-7">
            <div className="flex justify-between items-center">
                <button
                    className="block md:hidden mr-4 text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <img src={Logo} alt="" className="h-8" />

                <ul className="hidden md:flex space-x-6 text-gray-800">
                    <li class="flex items-center justify-center">
                        <Link
                            to=""
                            class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                        >
                            <span>Home</span>
                        </Link>
                    </li>
                    <li class="flex items-center justify-center">
                        <Link
                            to=""
                            class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                        >
                            <span>Courses</span>
                        </Link>
                    </li>
                    <li class="flex items-center justify-center">
                        <Link
                            to=""
                            class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                        >
                            <span>Blogs</span>
                        </Link>
                    </li>
                </ul>

                <div className="hidden md:flex items-center justify-center space-x-4">
                    <Search size={19} className="cursor-pointer" />
                    <Link to="/">
                        <Button
                            variant="outline"
                            className="text-black border-gray-700"
                        >
                            Login
                        </Button>
                    </Link>
                </div>

                <div className="flex space-x-2 md:hidden text-gray-700 focus:outline-none">
                    <a href="#">
                        <LogIn size={20} />
                    </a>
                </div>
            </div>

            {/* Mobile NavLinks */}
            <div
                className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button
                    className="absolute top-4 right-4 text-gray-700 focus:outline-none"
                    onClick={toggleMenu}
                >
                    <X size={24} />
                </button>
                <div className="my-16 mx-5 relative">
                    <Search
                        size={19}
                        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600"
                    />

                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-7 border-0 border-b-2 border-gray-300 rounded-none focus-visible:ring-0 focus:border-black"
                    />
                </div>
                <ul className="flex flex-col space-y-6 px-5 text-gray-900">
                    <li>
                        <Link to="/" className="hover:text-gray-950">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="hover:text-gray-950">
                            Courses
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="hover:text-gray-950">
                            Blogs
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
