import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../DatePicker";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Pf from "../../../assets/Profile.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Account() {
    const { user, setUser } = useAuth();
    // prepare state to store form data
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        DoB: "",
        bio: "",
    });
    // store errors state
    const [errors, setErrors] = useState({});

    // prepare to move another route/page after sending data
    const navigate = useNavigate();

    // Handle HTML inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle other custom Components' inputs
    const handleCustomChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (user) {
            setForm({
                firstName:
                    user.name?.trim().split(" ").slice(0, -1).join(" ") ||
                    "" ||
                    "",
                lastName: user.name?.trim().split(" ").slice(-1)[0] || "" || "",
                email: user.email || "",
                phone: user.phone || "",
                DoB: user.DoB || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    // form submit function
    const submit = async (e) => {
        e.preventDefault();

        // url and method to use in sending data using axios
        let url = "/api/user/" + user.id;
        let method = "post";

        // create new object to store form data to send
        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        // store state data in object
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("DoB", form.DoB);
        formData.append("bio", form.bio);

        console.log("Form data after appending:", formData);

        // if (image) {
        //     formData.append("image", image);
        // }

        formData.append("_method", "PUT");

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            // send data
            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            // success condition
            if (res.data.message === "User data updated successfully.") {
                const updatedUser = res.data.user;

                setUser(updatedUser);
                navigate("/user");
            }
        } catch (error) {
            console.error("Error updating user:", error);

            // failed condition
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

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
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={form.firstName}
                                    onChange={handleInputChange}
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="my-2 md:w-1/2">
                                <Label>Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={form.lastName}
                                    onChange={handleInputChange}
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
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={form.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="my-2 md:w-1/2">
                                <Label>Phone (Optional)</Label>
                                <Input
                                    className="border-gray-400 mt-1"
                                    placeholder="Enter your phone"
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={form.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="my-3">
                            <Label>Date of Birth (Optional)</Label>
                            <DatePicker
                                className="border-gray-400"
                                id="DoB"
                                name="DoB"
                                type="text"
                                selectedDate={form.DoB}
                                onDateChange={(date) =>
                                    handleCustomChange("DoB", date)
                                }
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="my-4">
                            <Label>Bio (Optional)</Label>
                            <Textarea
                                className="border-gray-400 mt-1"
                                placeholder="Write here..."
                                id="bio"
                                name="bio"
                                type="text"
                                value={form.bio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button onClick={submit}>Submit</Button>
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
