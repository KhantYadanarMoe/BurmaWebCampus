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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function Account() {
    const { user, setUser } = useAuth();

    const [image, setImage] = useState(null);
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

    // Handle other custom Components' inputs
    const handleCustomChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image input
    const uploadImg = (e) => {
        const file = e.target.files?.[0];
        console.log("e.target.files:", e.target.files);
        console.log("file:", file);
        setImage(file);
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
        console.log("image:", image);

        // store state data in object
        formData.append("firstName", form.firstName);
        formData.append("lastName", form.lastName);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("DoB", form.DoB);
        formData.append("bio", form.bio);

        if (image) {
            formData.append("image", image);
        }
        console.log("Form data after appending:", formData);

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
                    // Laravel validation errors: object with arrays
                    setPasswordErrors(data.errors);
                } else if (data.message) {
                    // Single message: wrap it
                    setPasswordErrors({ general: [data.message] });
                } else {
                    setPasswordErrors({});
                }
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
                                src={
                                    image
                                        ? URL.createObjectURL(image)
                                        : user?.image
                                        ? `/storage/${user.image}`
                                        : Pf
                                }
                                alt=""
                                className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-full border p-1 border-gray-700"
                            />
                            <div>
                                <h1 className="text-lg font-medium">
                                    {user?.name}
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    ID: {user?.student_id}
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
                        <div className="my-3">
                            <Label>Profile Image</Label>
                            <Input
                                id="image-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={uploadImg}
                                className="mt-1 border-gray-400"
                            />
                            {errors.image && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.image[0]}
                                </p>
                            )}
                        </div>
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
                                {errors.firstName && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.firstName[0]}
                                    </p>
                                )}
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
                                {errors.lastName && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.lastName[0]}
                                    </p>
                                )}
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
                                {errors.email && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.email[0]}
                                    </p>
                                )}
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
                                {errors.phone && (
                                    <p className="text-red-500 mt-1 text-sm">
                                        {errors.phone[0]}
                                    </p>
                                )}
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
                            {errors.DoB && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.DoB[0]}
                                </p>
                            )}
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
                            {errors.bio && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.bio[0]}
                                </p>
                            )}
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
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                placeholder="Enter your password"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                className="border-gray-400 mt-1"
                            />
                            {passwordErrors.currentPassword?.map((err, i) => (
                                <p
                                    key={i}
                                    className="text-red-500 mt-1 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                            {passwordErrors.general?.map((err, i) => (
                                <p
                                    key={i}
                                    className="text-red-500 mt-1 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                        <div className="my-2">
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
                            {passwordErrors.newPassword?.map((err, i) => (
                                <p
                                    key={i}
                                    className="text-red-500 mt-1 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                        <div className="my-2">
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
                            {passwordErrors.confirmPassword?.map((err, i) => (
                                <p
                                    key={i}
                                    className="text-red-500 mt-1 text-sm"
                                >
                                    {err}
                                </p>
                            ))}
                        </div>
                        <div className="flex justify-end mt-3">
                            <Button onClick={handlePasswordSubmit}>
                                Submit
                            </Button>
                        </div>
                    </Card>
                </div>
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
        </div>
    );
}
