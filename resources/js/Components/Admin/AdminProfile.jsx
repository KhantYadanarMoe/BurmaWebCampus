import { Bell, ChevronsRight, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Pf from "../../../assets/Profile.jpg";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useState } from "react";

export default function AdminProfile() {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex lg:gap-3">
            <div className="w-full lg:w-3/5">
                <div className="flex gap-1 items-end text-gray-800 text-sm">
                    <Link>Home</Link>
                    <ChevronsRight size={18} />
                    <Link>Dashboard</Link>
                    <ChevronsRight size={18} />
                    <Link className="text-black">Profile</Link>
                </div>
                <h1 className="text-xl font-medium my-5">Admin Profile</h1>
                <div className="flex items-center gap-3">
                    <img
                        src={Pf}
                        alt=""
                        className="w-20 h-20 object-cover rounded-full p-0.5 border border-gray-800"
                    />
                    <Button
                        variant="outline"
                        className="rounded-2xl border border-gray-600 px-3 py-1"
                    >
                        Edit
                    </Button>
                </div>
                <form className="mt-4">
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>First Name</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="Khant Yadanar Moe"
                            />
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Last Name</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="Khant Yadanar Moe"
                            />
                        </div>
                    </div>
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>Email</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="khantyadanarmoe@gmail.com"
                            />
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Phone</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="+959 123 456 789"
                            />
                        </div>
                    </div>
                    <div className="my-3">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                            <SelectTrigger
                                id="role"
                                name="role"
                                className="mt-1 border-gray-400"
                            >
                                <span>Admin</span>{" "}
                            </SelectTrigger>
                            <SelectContent className="w-96 max-h-60">
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end">
                        <Button>Update</Button>
                    </div>
                </form>
                <hr className="border-t-gray-400 my-5" />
                <h1 className="text-xl font-medium my-5">Change Password</h1>

                <form className="mt-4">
                    <div className="my-3">
                        <Label>Current Password</Label>
                        <Input
                            className="border-gray-400 mt-1"
                            placeholder="Enter your current password"
                        />
                    </div>
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>New Password</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="Enter your new password"
                            />
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Confirm Password</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                placeholder="Confirm your new password"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>Change</Button>
                    </div>
                </form>
            </div>
            <div className="lg:w-2/5 relative">
                <button
                    className="fixed mt-4 right-0 z-20 flex items-center justify-center 
    w-10 h-12 border border-gray-400 rounded-l-2xl bg-white
    shadow-md lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <div
                    className={`
          fixed -mt-4 lg:-mt-0 right-0 h-full w-full md:w-1/2 bg-white shadow-lg 
    transform transition-transform duration-300 z-30
    ${open ? "translate-x-0" : "translate-x-full"}
    lg:w-full lg:sticky lg:top-20 
    lg:h-[calc(100vh-5rem)] lg:translate-x-0 lg:shadow-none
        `}
                >
                    {/* Header */}
                    <div className="px-3 lg:px-4 pt-4 md:pt-7 lg:pt-0 z-50 flex justify-between">
                        <h1 className="text-lg font-medium">Notifications</h1>
                        <button
                            className="p-2 lg:hidden"
                            onClick={() => setOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Scrollable area */}
                    <div className="py-3 lg:py-0 lg:mt-3 h-[calc(100vh-8rem)] xl:h-[calc(100vh-8rem)] hover:overflow-y-auto custom-scrollbar overflow-hidden duration-300">
                        {/* Today Section */}
                        <div className="px-2">
                            <h2 className="text-base font-medium">Today</h2>
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="py-3 px-2 my-1 bg-white hover:bg-gray-100 duration-300 cursor-pointer rounded-lg"
                                >
                                    <div className="flex gap-2">
                                        <img
                                            src={Pf}
                                            alt="profile"
                                            className="w-12 h-12 object-cover rounded-full p-0.5 border border-gray-500"
                                        />
                                        <p className="text-sm text-gray-800">
                                            <strong>Khant Yadanar Moe</strong>{" "}
                                            commented on Full-stack Web
                                            Development Pathway's unit-7.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <hr className="border-t-gray-300 my-3 mx-2" />

                        {/* This Week Section */}
                        <div className="px-2">
                            <h2 className="text-base font-medium">This week</h2>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div
                                    key={i}
                                    className="py-3 px-2 my-1 bg-white hover:bg-gray-100 duration-300 cursor-pointer rounded-lg"
                                >
                                    <div className="flex gap-2">
                                        <img
                                            src={Pf}
                                            alt="profile"
                                            className="w-12 h-12 object-cover rounded-full p-0.5 border border-gray-500"
                                        />
                                        <p className="text-sm text-gray-800">
                                            <strong>Khant Yadanar Moe</strong>{" "}
                                            liked your post on unit-5.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
