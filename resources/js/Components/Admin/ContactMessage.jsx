import React from "react";
import Pf from "../../../assets/Profile.jpg";
import {
    Link,
    useNavigate,
    useOutletContext,
    useParams,
} from "react-router-dom";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Flag,
    MailCheck,
    MessageCircleMore,
    Trash,
    X,
} from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
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

export default function ContactMessage() {
    const [open, setOpen] = useState(false);
    const [showReply, setShowReply] = useState(false);

    const [loading, setLoading] = useState(true);

    let [contacts, setContacts] = useState([]);

    let [contact, setContact] = useState([]);

    const { id } = useParams();

    const { darkMode } = useOutletContext();

    const navigate = useNavigate();

    const selectedContact = contacts.find(
        (contact) => contact.id.toString() === id
    );

    let getContacts = async () => {
        setLoading(true);
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

    const getDetails = async (id) => {
        try {
            let res = await axios.get("/api/contact/" + id);
            setContact(res.data.contact);
        } catch (err) {
            console.error("Error fetching contact:", err);
        }
    };

    useEffect(() => {
        if (contacts.length > 0) {
            if (!id) {
                navigate(`/admin/contacts/${contacts[0].id}`, {
                    replace: true,
                });
            } else {
                getDetails(id);
            }
        }
    }, [contacts, id]);

    const markContact = async (id, currentMarked) => {
        try {
            let newMarked = currentMarked ? 0 : 1;

            let res = await axios.post("/api/contact/marked/" + id, {
                marked: newMarked,
            });
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id == id
                        ? { ...contact, marked: newMarked }
                        : contact
                )
            );
        } catch (error) {
            console.error("Failed to mark contact:", error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            await axios.delete("/api/contact/" + id, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            setContacts((prev) => {
                const updatedContacts = prev.filter((c) => c.id !== id);

                if (updatedContacts.length > 0) {
                    if (contact?.id === id) {
                        navigate(`/admin/contacts/${updatedContacts[0].id}`, {
                            replace: true,
                        });
                    }
                } else {
                    setContact({});
                    navigate(`/admin/contacts`, { replace: true });
                }

                return updatedContacts;
            });
        } catch (e) {
            console.log(e);
        }
    };

    const currentIndex = contacts.findIndex((c) => c.id.toString() === id);

    const goToPrev = () => {
        if (currentIndex > 0) {
            const prevContact = contacts[currentIndex - 1];
            navigate(`/admin/contacts/${prevContact.id}`);
        }
    };

    const goToNext = () => {
        if (currentIndex < contacts.length - 1) {
            const nextContact = contacts[currentIndex + 1];
            navigate(`/admin/contacts/${nextContact.id}`);
        }
    };

    const [replyText, setReplyText] = useState("");

    const handleReply = async () => {
        try {
            const res = await axios.post(`/api/contacts/reply/${contact.id}`, {
                message: replyText,
            });

            if (res.data.contact) {
                setShowReply(false);
                setContact(res.data.contact); // update UI
                setReplyText(""); // clear box
            }
        } catch (err) {
            console.error("Failed to send reply:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex gap-2 pt-2 lg:pt-4">
                <div className="lg:w-1/3 relative border-r border-r-gray-300 space-y-2">
                    <div className="px-3 py-3 animate-pulse">
                        <h1 className="text-lg font-medium">
                            Contact Messages
                        </h1>
                    </div>

                    {Array(5)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className="flex gap-2 w-full px-3 py-3 rounded-lg animate-pulse bg-gray-200"
                            >
                                <div className="w-11 h-11 rounded-full bg-gray-300" />
                                <div className="flex-1 space-y-2 py-1">
                                    <div className="w-1/2 h-4 bg-gray-300 rounded-md" />
                                    <div className="w-full h-3 bg-gray-300 rounded-md" />
                                </div>
                            </div>
                        ))}
                </div>

                {/* Right message panel */}
                <div className="lg:w-2/3 px-3 pb-4 space-y-4">
                    {/* Panel header */}
                    <div className="flex justify-between items-center animate-pulse">
                        <div className="w-1/3 h-6 bg-gray-200 rounded-md" />
                        <div className="flex gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                            <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        </div>
                    </div>

                    <hr className="border-t-gray-300" />

                    {/* User info */}
                    <div className="flex gap-2 items-center animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-gray-300" />
                        <div className="flex-1 space-y-2 py-1">
                            <div className="w-1/3 h-4 bg-gray-300 rounded-md" />
                            <div className="w-1/2 h-3 bg-gray-300 rounded-md" />
                        </div>
                    </div>

                    {/* Message body */}
                    <div className="space-y-2 bg-gray-200 rounded-md p-4 animate-pulse">
                        <div className="w-full h-3 bg-gray-300 rounded-md" />
                        <div className="w-full h-3 bg-gray-300 rounded-md" />
                        <div className="w-3/4 h-3 bg-gray-300 rounded-md" />
                        <div className="w-1/2 h-3 bg-gray-300 rounded-md" />
                    </div>

                    {/* Reply button */}
                    <div className="flex justify-end animate-pulse">
                        <div className="w-20 h-8 bg-gray-200 rounded-md" />
                    </div>

                    {/* Footer */}
                    <div className="h-6 bg-gray-200 rounded-md animate-pulse text-center text-xs py-3" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-2 pt-2 lg:pt-4">
            <div className="lg:w-1/3 relative border-r border-r-gray-300">
                <button
                    className="fixed mt-4 left-0 z-20 flex items-center justify-center 
             w-10 h-12 border border-gray-400 rounded-r-2xl 
             shadow-md lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <MessageCircleMore className="w-5 h-5 text-gray-700" />
                </button>
                <div
                    className={`
          fixed -mt-4 lg:-mt-0 left-0 h-full w-full md:w-1/2  shadow-lg transform transition-transform duration-300 z-30
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
                                <button
                                    key={contact.id}
                                    onClick={() =>
                                        navigate(
                                            `/admin/contacts/${contact.id}`
                                        )
                                    }
                                    className={`flex gap-2 w-full text-left px-3 py-3 rounded-lg duration-300 cursor-pointer 
                ${
                    selectedContact?.id === contact.id
                        ? darkMode
                            ? "bg-gray-800"
                            : "bg-gray-100"
                        : darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-50"
                }`}
                                >
                                    <img
                                        src={Pf}
                                        alt="User profile"
                                        className="w-11 h-11 object-cover rounded-full p-0.5 border border-gray-600"
                                    />

                                    <div className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1 items-center">
                                                <span className="text-sm font-medium">
                                                    {contact.name}
                                                </span>
                                                <div>
                                                    {Number(contact.marked) ===
                                                    1 ? (
                                                        <Flag
                                                            size={16}
                                                            className="text-yellow-400 fill-yellow-400"
                                                        />
                                                    ) : null}
                                                </div>
                                                <div>
                                                    {Number(contact.replied) ===
                                                    1 ? (
                                                        <MailCheck
                                                            size={16}
                                                            className="text-green-400"
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <span
                                                className={`text-sm ${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {formatDistanceToNow(
                                                    new Date(
                                                        contact?.created_at
                                                    ),
                                                    { addSuffix: true }
                                                )}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-sm ${
                                                darkMode
                                                    ? "text-gray-200"
                                                    : "text-gray-800"
                                            } mt-1 line-clamp-2`}
                                        >
                                            {contact.message}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3 px-3 pb-4">
                <div
                    className={`flex items-center justify-between ${
                        darkMode ? "text-gray-200" : "text-gray-600"
                    } px-3 py-3 pl-6 lg:pl-0`}
                >
                    <button
                        onClick={() =>
                            markContact(contact.id, Number(contact.marked))
                        }
                        className={
                            Number(contact.marked) === 1
                                ? "text-accentRed cursor-pointer"
                                : "text-accentGreen cursor-pointer"
                        }
                    >
                        {Number(contact.marked) === 1 ? (
                            <Flag className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ) : (
                            <Flag
                                className={`w-5 h-5 ${
                                    darkMode ? "text-gray-200" : "text-gray-600"
                                }`}
                            />
                        )}
                    </button>
                    <div className="flex gap-1 items-center">
                        <button
                            onClick={goToPrev}
                            disabled={currentIndex <= 0}
                            className={`p-1 rounded ${
                                currentIndex <= 0
                                    ? darkMode
                                        ? "text-gray-500" // disabled text in dark mode
                                        : "text-gray-400" // disabled text in light mode
                                    : darkMode
                                    ? "text-gray-200 hover:text-white bg-gray-600"
                                    : "text-gray-700 hover:text-black bg-gray-200"
                            }`}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <span
                            className={`text-sm ${
                                darkMode ? "text-gray-200" : "text-gray-600"
                            }`}
                        >
                            {contacts.length > 0
                                ? `${currentIndex + 1} of ${contacts.length}`
                                : "0 of 0"}
                        </span>
                        <button
                            onClick={goToNext}
                            disabled={currentIndex >= contacts.length - 1}
                            className={`p-1 rounded ${
                                currentIndex >= contacts.length - 1
                                    ? darkMode
                                        ? "text-gray-500" // disabled text in dark mode
                                        : "text-gray-400" // disabled text in light mode
                                    : darkMode
                                    ? "text-gray-200 hover:text-white bg-gray-600"
                                    : "text-gray-700 hover:text-black bg-gray-200"
                            }`}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="">
                                <Trash size={18} />
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure you want to delete this menu?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => deleteContact(contact.id)}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                                <h1 className="font-medium">{contact?.name}</h1>
                                <p
                                    className={`text-sm ${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    }`}
                                >
                                    to BWC
                                </p>
                            </div>
                        </div>
                        <p
                            className={`${
                                darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                        >
                            {contact?.created_at
                                ? formatDistanceToNow(
                                      new Date(contact.created_at),
                                      { addSuffix: true }
                                  )
                                : ""}
                        </p>
                    </div>
                    <div
                        className={`p-2 py-3 md:p-6 ${
                            darkMode ? "text-gray-100" : "text-gray-900"
                        } text-sm leading-relaxed`}
                    >
                        <p className="mb-4">Hello Admin,</p>
                        <p className="mb-4">
                            You’ve received a new contact message from{" "}
                            <strong>{contact?.name}</strong>.
                        </p>

                        <div
                            className={`${
                                darkMode ? "bg-gray-900" : "bg-gray-100"
                            } rounded-md p-4 space-y-2 text-sm`}
                        >
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Name:
                                </span>
                                <span>{contact?.name}</span>
                            </div>

                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Email:
                                </span>
                                <span>{contact?.email}</span>
                            </div>
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Phone:
                                </span>
                                <span>{contact?.phone}</span>
                            </div>
                            <div className="flex gap-6">
                                <span className="font-semibold w-12">
                                    Message:
                                </span>
                                <span>{contact?.message}</span>
                            </div>
                        </div>

                        <p className="mt-4">
                            Please respond to the user as soon as possible.
                        </p>
                    </div>

                    <div
                        className={`${
                            darkMode
                                ? "bg-gray-800 text-gray-300"
                                : "bg-gray-200 text-gray-600"
                        } text-center text-xs py-3`}
                    >
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
                        <div className="mt-4  border-l-2 border-l-accentRed px-3 md:px-4 py-4 md:py-8 rounded-md shadow-md">
                            <Textarea
                                placeholder="Type your reply here..."
                                className="w-full"
                                name="message"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex justify-end mt-3">
                                <Button onClick={handleReply}>Send</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
