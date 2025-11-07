import { Bell, ChevronsRight, X } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pf from "../../../assets/Profile.jpg";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

export default function AdminProfile() {
    const [open, setOpen] = useState(false);
    const { user, setUser } = useAuth();
    // prepare state to store form data
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    // store errors state
    const [errors, setErrors] = useState({});

    const [isPasswordSuccessDialogOpen, setIsPasswordSuccessDialogOpen] =
        useState(false);

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
                navigate("/admin/profile");
            }
        } catch (error) {
            console.error("Error updating user:", error);

            // failed condition
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordErrors, setPasswordErrors] = useState({});

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordErrors({
                confirmPassword: ["Password and Confirm Password don't match."],
            });
            return;
        }

        try {
            const res = await axios.put(`/api/user/${user.id}/changePassword`, {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
                newPassword_confirmation: passwordForm.confirmPassword,
            });

            if (res.data.message === "Password updated successfully.") {
                setIsPasswordSuccessDialogOpen(true);
                setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
                setPasswordErrors({});
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;

                if (data.errors) {
                    setPasswordErrors(data.errors); // Object with field errors
                } else if (data.message) {
                    // Wrap single message into an object keyed by a general field or 'form'
                    setPasswordErrors({ general: [data.message] });
                } else {
                    setPasswordErrors({});
                }
            }
        }
    };
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
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={form.firstName}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                                placeholder="Enter your first name"
                            />
                        </div>
                        <div className="my-3 md:w-1/2">
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
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>Email</Label>
                            <Input
                                className="border-gray-400 mt-1"
                                id="email"
                                name="email"
                                type="text"
                                value={form.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="text"
                                value={form.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone"
                                className="border-gray-400 mt-1"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-3">
                        <Button onClick={submit}>Update</Button>
                    </div>
                </form>
                <hr className="border-t-gray-400 my-5" />
                <h1 className="text-xl font-medium my-5">Change Password</h1>

                <form className="mt-4">
                    <div className="my-3">
                        <Label>Current Password</Label>
                        <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            placeholder="Enter your password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="border-gray-400 mt-1"
                        />
                        {passwordErrors.general && (
                            <p className="text-red-500 mt-1 text-sm">
                                {passwordErrors.general[0]}
                            </p>
                        )}
                    </div>
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>New Password</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                placeholder="Enter your new password"
                                className="border-gray-400 mt-1"
                            />
                            {passwordErrors.confirmPassword && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {passwordErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm your password"
                                className="border-gray-400 mt-1"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handlePasswordSubmit}>Change</Button>
                    </div>
                </form>
                <AlertDialog
                    open={isPasswordSuccessDialogOpen}
                    onOpenChange={setIsPasswordSuccessDialogOpen}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Password Updated Successfully!
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Your password has been changed. You can now use
                                your new password to log in.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction
                                onClick={() =>
                                    setIsPasswordSuccessDialogOpen(false)
                                }
                            >
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
