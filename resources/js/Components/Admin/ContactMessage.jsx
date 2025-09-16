import React from "react";
import Pf from "../../../assets/Profile.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MessageCircleMore, X } from "lucide-react";

export default function ContactMessage() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex gap-3">
            <div className="relative">
                <button
                    className="fixed left-0 z-50 flex items-center justify-center 
             w-10 h-12 border border-gray-400 rounded-r-2xl 
             shadow-md lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <MessageCircleMore className="w-5 h-5 text-gray-700" />
                </button>
                <div
                    className={`
          fixed lg:-mt-0 left-0 h-full w-full  bg-white shadow-lg transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0 lg:w-2/5 lg:shadow-none
        `}
                >
                    <div className="pl-3 pr-3 lg:pl-0 lg:pr-0 flex justify-between">
                        <h1 className="text-lg font-medium">
                            Contact Messages
                        </h1>
                        <button
                            className="p-2 lg:hidden"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="py-3 lg:py-0 lg:mt-3 h-[calc(100vh-10rem)] xl:h-[calc(100vh-12rem)]  hover:overflow-y-auto custom-scrollbar overflow-hidden duration-300">
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <hr className="border-t-gray-300" />
                            <Link
                                to=""
                                className="flex gap-2 px-2 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                            >
                                <img
                                    src={Pf}
                                    alt="User profile"
                                    className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                />

                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            Khant Yadanar Moe
                                        </span>
                                        <span className="text-sm text-gray-700">
                                            2 hours ago
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                        Hello. My name is Khant Yadanar Moe. The
                                        reason why I'm contacting BWC is to give
                                        an advice for BWC teaching techniques.
                                        Before mentioning my advice, I want to
                                        say all of the lectures on BWC website
                                        are really helpful, clear, and
                                        beginner-friendly way. The UI is also
                                        clear and impressive.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-3/5"></div>
        </div>
    );
}
