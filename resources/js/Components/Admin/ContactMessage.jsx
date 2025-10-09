import React from "react";
import Pf from "../../../assets/Profile.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Flag,
    MessageCircleMore,
    Trash,
    X,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

export default function ContactMessage() {
    const [open, setOpen] = useState(false);
    const [showReply, setShowReply] = useState(false);

    let [contacts, setContacts] = useState([]);

    let getContacts = async () => {
        try {
            let res = await axios.get("/api/contact");
            let data = res.data;
            setContacts(data.contacts);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);
    return (
        <div className="flex gap-2 pt-2 lg:pt-4">
            <div className="lg:w-1/3 relative border-r border-r-gray-300">
                <button
                    className="fixed mt-4 left-0 z-20 flex items-center justify-center 
             w-10 h-12 border border-gray-400 rounded-r-2xl bg-white
             shadow-md lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <MessageCircleMore className="w-5 h-5 text-gray-700" />
                </button>
                <div
                    className={`
          fixed -mt-4 lg:-mt-0 left-0 h-full w-full md:w-1/2 bg-white shadow-lg transform transition-transform duration-300 z-30
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:w-full 
          lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:translate-x-0 lg:shadow-none
        `}
                >
                    <div className="px-3 lg:px-4 pt-4 md:pt-7 lg:pt-0 z-50 flex justify-between">
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
                    <div className="py-3 lg:py-0 lg:mt-3 h-[calc(100vh-8rem)] xl:h-[calc(100vh-8rem)]  hover:overflow-y-auto custom-scrollbar overflow-hidden duration-300">
                        {contacts.map((contact) => (
                            <div>
                                <hr className="border-t-gray-300" />
                                <Link
                                    to=""
                                    className="flex gap-2 px-3 rounded-lg bg-white hover:bg-gray-50 duration-300 py-3 cursor-pointer"
                                >
                                    <img
                                        src={Pf}
                                        alt="User profile"
                                        className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                    />

                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">
                                                {contact.name}
                                            </span>
                                            <span className="text-sm text-gray-700">
                                                {formatDistanceToNow(
                                                    new Date(
                                                        contact.created_at
                                                    ),
                                                    { addSuffix: true }
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-800 mt-1 line-clamp-2">
                                            {contact.message}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3 px-3 pb-4">
                <div className="flex items-center justify-between text-gray-700 px-3 py-3 pl-6 lg:pl-0">
                    <Flag size={18} />
                    <div className="flex gap-1 items-center">
                        <ChevronLeft size={18} /> 1 of 259{" "}
                        <ChevronRight size={18} />
                    </div>
                    <Trash size={18} />
                </div>
                <hr className="border-t-gray-300" />
                <div className="mt-5">
                    <div className="flex justify-between">
                        <div className="flex gap-1">
                            <img
                                src={Pf}
                                alt="User profile"
                                className="w-12 h-12 object-cover rounded-full p-0.5 border border-gray-600"
                            />
                            <div>
                                <h1 className="font-medium">
                                    Khant Yadanar Moe
                                </h1>
                                <p className="text-sm text-gray-700">to BWC</p>
                            </div>
                        </div>
                        <p className="text-gray-700">7:00 PM</p>
                    </div>
                    <div className="p-2 py-3 md:p-6 text-gray-900 text-sm leading-relaxed">
                        <p className="mb-4">Hello Admin,</p>
                        <p className="mb-4">
                            You’ve received a new contact message from{" "}
                            <strong>Hsu Wai</strong>.
                        </p>

                        <div className="bg-gray-100 rounded-md p-4 space-y-2 text-sm">
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Name:
                                </span>
                                <span>Hsu Wai</span>
                            </div>
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Email:
                                </span>
                                <span>hsuwai@gmail.com</span>
                            </div>
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Message:
                                </span>
                                <span>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Ex, veritatis numquam
                                    corporis dicta ut provident saepe ab hic
                                    dolores reprehenderit laboriosam? Minima ad
                                    exercitationem dolorem molestiae officiis
                                    quibusdam quo quod tenetur ipsam.
                                </span>
                            </div>
                        </div>

                        <p className="mt-4">
                            Please respond to the user as soon as possible.
                        </p>
                    </div>

                    <div className="bg-gray-200 text-center text-gray-600 text-xs py-3">
                        &copy; 2025 BurmaWebCampus. All rights reserved.
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            className=""
                            onClick={() => setShowReply(!showReply)}
                        >
                            Reply
                        </Button>
                    </div>

                    {showReply && (
                        <div className="mt-4 bg-white border-l-2 border-l-accentRed px-3 md:px-4 py-4 md:py-8 rounded-md shadow-md">
                            <Textarea
                                placeholder="Type your reply here..."
                                className="w-full"
                                name="message"
                            />
                            <div className="flex justify-end mt-3">
                                <Button>Send</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
