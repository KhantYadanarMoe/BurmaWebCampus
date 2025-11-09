import React from "react";
import { Link } from "react-router-dom";

export default function ProfileNav() {
    return (
        <div className="px-5 md:px-10 lg:px-12">
            <ul className="flex space-x-4 md:space-x-6">
                <li class="flex items-center justify-center py-3">
                    <Link
                        to="/user"
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span className="text-sm md:text-base">
                            Account Setting
                        </span>
                    </Link>
                </li>
                <li class="flex items-center justify-center py-3">
                    <Link
                        to="/user/courses"
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span className="text-sm md:text-base">Courses</span>
                    </Link>
                </li>
                <li class="flex items-center justify-center py-3">
                    <Link
                        to="/user/certificates"
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span className="text-sm md:text-base">
                            Certificates
                        </span>
                    </Link>
                </li>
                <li class="flex items-center justify-center py-3">
                    <Link
                        to="/user/billing"
                        class="relative text-black cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-black before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-black after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                    >
                        <span className="text-sm md:text-base">Billing</span>
                    </Link>
                </li>
            </ul>
            <hr className="border-t-gray-300" />
        </div>
    );
}
