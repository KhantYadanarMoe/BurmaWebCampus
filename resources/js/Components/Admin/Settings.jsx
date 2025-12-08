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
import Security from "./Settings/Security";

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
                    <button
                        onClick={() => {
                            const el = document.getElementById("siteInfo");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Site info
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            const el = document.getElementById("appearance");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Appearance
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            const el = document.getElementById("email");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Email
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => {
                            const el = document.getElementById("security");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`whitespace-nowrap px-2 py-2 rounded-md ${
                            darkMode
                                ? "bg-gray-800 hover:bg-gray-900 text-gray-200"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        } duration-300 block`}
                    >
                        Security
                    </button>
                </li>
            </ul>
            <div id="siteInfo" className="scroll-mt-24">
                <SiteInfo />
            </div>
            <hr className="border-t-gray-700 my-8" />
            <div id="appearance" className="scroll-mt-24">
                <Appearance />
            </div>
            <hr className="border-t-gray-700 my-8" />
            <div id="email" className="scroll-mt-24">
                <Email />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                } my-8`}
            />
            <div id="security" className="scroll-mt-24">
                <Security />
            </div>
        </div>
    );
}
