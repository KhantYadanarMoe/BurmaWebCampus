import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <div className="px-4 md:px-8">
            <hr className=" border-t-gray-500" />
            <div className="md:flex justify-between py-10">
                <div className="md:w-1/2 lg:w-1/3">
                    <img src={Logo} alt="" className="h-8" />
                    <p className="text-gray-800 mt-2">
                        Unlock your potential with Burma Web Campus. Learn to
                        code, build a career.
                    </p>
                    <div className="flex w-full max-w-sm items-center gap-2 mt-3">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="border-gray-600"
                        />
                        <Button type="submit">Subscribe</Button>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 lg:w-1/3">
                    <ul className="flex space-x-5 items-center justify-end mr-4">
                        <li>
                            <Link>Home</Link>
                        </li>
                        <li>
                            <Link>Courses</Link>
                        </li>
                        <li>
                            <Link>Blogs</Link>
                        </li>
                    </ul>
                    {/* <div className="flex gap-3 justify-end text-2xl py-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="text-blue-600 hover:opacity-80" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="text-pink-500 hover:opacity-80" />
                        </a>
                    </div> */}
                </div>
            </div>
            <hr className="border-t-gray-500" />
            <p className="text-gray-700 text-sm py-3">
                &copy; 2025 Khart. All rights reserved.
            </p>
        </div>
    );
}
