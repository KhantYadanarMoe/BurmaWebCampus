import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { ChevronDown, LogIn, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useSetting } from "./Admin/contexts/SiteInfoContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const { user, setUser } = useAuth();
    const { form } = useSetting();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.post("/api/logout", null, {
                withCredentials: true,
            });
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    return (
        <div className="fixed top-0 inset-x-0 z-50">
            <div className="p-4 md:-6">
                <nav className="font-lato bg-white shadow-[0_0_20px_rgba(0,0,0,0.18)] rounded-lg px-3 py-2 md:py-5 md:px-7">
                    <div className="flex justify-between items-center">
                        <button
                            className="block md:hidden mr-4 text-gray-700 focus:outline-none"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        <img
                            src={`/storage/${form.logo}`}
                            alt=""
                            className="h-8"
                        />

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
                                    to="/courses"
                                    class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                                >
                                    <span>Courses</span>
                                </Link>
                            </li>
                            <li class="flex items-center justify-center">
                                <Link
                                    to="/blogs"
                                    class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                                >
                                    <span>Blogs</span>
                                </Link>
                            </li>
                        </ul>

                        <div className="hidden md:flex items-center justify-center gap-4">
                            <Search
                                size={19}
                                className="cursor-pointer"
                                onClick={() => setSearchBox(true)}
                            />
                            {searchBox && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
                                    onClick={() => setSearchBox(false)}
                                >
                                    <div
                                        className="relative mt-24 w-full max-w-lg bg-white h-[75vh] rounded-xl shadow-lg p-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Input
                                            type="text"
                                            placeholder="Search..."
                                            className="border-gray-400 w-full"
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {user ? (
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setDropdownOpen(!dropdownOpen)
                                        }
                                        className="bg-white hover:bg-gray-100 duration-300 border-l-2 border-accentRed px-2 py-1 flex items-center space-x-2 cursor-pointer"
                                    >
                                        <span>{user.name}</span>
                                        <ChevronDown
                                            size={16}
                                            className="text-gray-700"
                                        />
                                    </div>

                                    {/* Dropdown Menu */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                                            <Link to="/user">
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                                    Profile
                                                </button>
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="text-black border-gray-700"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
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
                                <Link
                                    to="/courses"
                                    className="hover:text-gray-950"
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blogs"
                                    className="hover:text-gray-950"
                                >
                                    Blogs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
