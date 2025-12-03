import React from "react";
import Pf from "../../../assets/Profile.jpg";
import { Link, useOutletContext } from "react-router-dom";
import { useState } from "react";
import {
    BellRing,
    BookText,
    ChevronLeft,
    ChevronRight,
    Flag,
    MessageCircleMore,
    Settings2,
    Shield,
    Trash,
    X,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import SiteInfo from "./Settings/SiteInfo";
import Appearance from "./Settings/appearance";
import Email from "./Settings/Email";

export default function Settings() {
    const [open, setOpen] = useState(false);
    const { darkMode } = useOutletContext();
    const [showReply, setShowReply] = useState(false);
    return (
        <div>
            <h1 className="text-2xl font-medium">Settings</h1>
            <p
                className={`text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                } mt-1 mb-6`}
            >
                Manage your website settings.
            </p>
            <hr className="my-3 border-t-gray-400" />
            <ul
                className={`flex space-x-2 overflow-x-scroll overflow-y-hidden no-scrollbar items-center ${
                    darkMode ? "bg-gray-900" : "bg-gray-100"
                } rounded-md py-1 px-1`}
            >
                <li>
                    <Link
                        to=""
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Site info
                    </Link>
                </li>
                <li>
                    <Link
                        to=""
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Appearance
                    </Link>
                </li>
                <li>
                    <Link
                        to=""
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Notifications
                    </Link>
                </li>
                <li>
                    <Link
                        to=""
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Security
                    </Link>
                </li>
            </ul>
            <SiteInfo />
            <hr className="border-t-gray-700 my-8" />
            <Appearance />
            <hr className="border-t-gray-700 my-8" />
            <Email />
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                } my-8`}
            />
            <div className="my-8">
                <div className="flex justify-between">
                    <div className="mb-5">
                        <h1 className="text-lg font-medium">Security</h1>
                        <p
                            className={`hidden md:block text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-800"
                            }`}
                        >
                            Set security for this website.
                        </p>
                    </div>
                    <div className="md:flex gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>
                <hr
                    className={`${
                        darkMode ? "border-t-gray-300" : "border-t-gray-800"
                    }`}
                />
                <div className="md:flex gap-3 my-4 md:my-6">
                    <div className="md:w-1/2">
                        <h1 className="font-medium">Password length (min)</h1>
                        <p
                            className={`hidden md:block text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-800"
                            }`}
                        >
                            Set min-length of password for login.
                        </p>
                    </div>
                    <Input
                        className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                        placeholder="Enter the length of password"
                    />
                </div>
                <hr
                    className={`${
                        darkMode ? "border-t-gray-600" : "border-t-gray-300"
                    }`}
                />
                <div className="md:flex gap-3 my-4 md:my-6">
                    <div className="md:w-1/2">
                        <h1 className="font-medium">
                            Session Timeout Duration (sec)
                        </h1>
                        <p
                            className={`hidden md:block text-sm ${
                                darkMode ? "text-gray-300" : "text-gray-800"
                            }`}
                        >
                            Set auto-logout time.
                        </p>
                    </div>
                    <Input
                        className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                        placeholder="Enter time for session timeout"
                    />
                </div>
            </div>
        </div>
    );
}
