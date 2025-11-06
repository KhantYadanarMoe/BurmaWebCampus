import React from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../DatePicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Pf from "../../../assets/Profile.jpg";
import { useAuth } from "@/contexts/AuthContext";

export default function Account() {
    const { user, setUser } = useAuth();
    return (
        <div className="px-5 md:px-6 lg:px-12">
            <div className="md:flex gap-3 py-6">
                <div className="md:w-2/5 lg:w-1/3 order-1 md:order-2 mb-4 md:mb-0">
                    <h1 className="text-lg font-medium mb-3">Personal Info</h1>
                    <Card className="pb-3 px-3 border-gray-400">
                        <div className="py-6 flex gap-3 items-center">
                            <img
                                src={Pf}
                                alt=""
                                className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-full border p-1 border-gray-700"
                            />
                            <div>
                                <h1 className="text-lg font-medium">
                                    {user?.name}
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    ID: STU2025-001
                                </p>
                            </div>
                        </div>
                        <hr className="border-t-gray-400" />
                        <div className="py-4">
                            <div className="flex justify-between items-center py-2">
                                <div className="w-1/2">
                                    <h1 className="text-sm font-medium">
                                        First Name
                                    </h1>
                                    <p className="text-sm text-gray-700">
                                        {user?.name
                                            ?.trim()
                                            .split(" ")
                                            .slice(0, -1)
                                            .join(" ") || ""}
                                    </p>
                                </div>
                                <div className="w-1/2">
                                    <h1 className="text-sm font-medium">
                                        Last Name
                                    </h1>
                                    <p className="text-sm text-gray-700">
                                        {user?.name
                                            ?.trim()
                                            .split(" ")
                                            .slice(-1)[0] || ""}
                                    </p>
                                </div>
                            </div>
                            <div className="my-2">
                                <h1 className="text-sm font-medium">Email</h1>
                                <p className="text-sm text-gray-700">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="my-4">
                                <h1 className="text-sm font-medium">Phone</h1>
                                <p className="text-sm text-gray-700">
                                    {user?.phone}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h1 className="text-sm font-medium">Bio</h1>
                                <p className="text-sm text-gray-700">
                                    {user?.bio}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="md:w-3/5 lg:w-2/3 order-2 md:order-1">
                    <h1 className="text-lg font-medium mb-3">
                        Account Setting
                    </h1>
                    <Card className="py-3 px-3 border-gray-400">
                        <div className="flex flex-col md:flex-row md:gap-3">
                            <div className="my-2 md:w-1/2">
                                <Label>First Name</Label>
                                <Input
                                    value={
                                        user?.name
                                            ?.trim()
                                            .split(" ")
                                            .slice(0, -1)
                                            .join(" ") || ""
                                    }
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="my-2 md:w-1/2">
                                <Label>Last Name</Label>
                                <Input
                                    value={
                                        user?.name
                                            ?.trim()
                                            .split(" ")
                                            .slice(-1)[0] || ""
                                    }
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:gap-3">
                            <div className="my-2 md:w-1/2">
                                <Label>Email</Label>
                                <Input
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your email"
                                    value={user?.email}
                                />
                            </div>
                            <div className="my-2 md:w-1/2">
                                <Label>Phone (Optional)</Label>
                                <Input
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your phone"
                                    value={user?.phone}
                                />
                            </div>
                        </div>
                        <div className="my-3">
                            <Label>Date of Birth (Optional)</Label>
                            <DatePicker
                                className="border-gray-400"
                                value={user?.DoB}
                            />
                        </div>
                        <div className="my-4">
                            <Label>Bio (Optional)</Label>
                            <Textarea
                                className="border-gray-400 mt-1"
                                placeholder="Write here..."
                                value={user?.bio}
                            />
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button>Submit</Button>
                        </div>
                    </Card>
                    <Card className="mt-5 py-3 px-3 border-gray-400">
                        <h1 className="text-lg font-medium mb-5">
                            Change Password
                        </h1>
                        <div className="my-2">
                            <Label>Current Password</Label>
                            <Input className="border-gray-400 mt-1" />
                        </div>
                        <div className="my-2">
                            <Label>New Password</Label>
                            <Input className="border-gray-400 mt-1" />
                        </div>
                        <div className="my-2">
                            <Label>Confirm Password</Label>
                            <Input className="border-gray-400 mt-1" />
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button>Submit</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
