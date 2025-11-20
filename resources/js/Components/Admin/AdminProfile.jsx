import { Bell, ChevronsRight, X } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
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
    const [image, setImage] = useState(null);
    const { darkMode } = useOutletContext();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });
    const [errors, setErrors] = useState({});
    let [comments, setComments] = useState([]);
    const [isPasswordSuccessDialogOpen, setIsPasswordSuccessDialogOpen] =
        useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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

    let getComments = async () => {
        try {
            let res = await axios.get("/api/comments");
            let data = res.data;
            setComments(data.comments);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    useEffect(() => {
        getComments();
    }, []);

    const groupCommentsByDate = (comments) => {
        const today = [];
        const thisWeek = [];
        const now = new Date();

        comments.forEach((comment) => {
            const createdDate = new Date(comment.created_at);
            const diffDays = (now - createdDate) / (1000 * 60 * 60 * 24);

            if (diffDays < 1) {
                today.push(comment);
            } else if (diffDays < 7) {
                thisWeek.push(comment);
            }
        });

        return { today, thisWeek };
    };

    const groupedComments = groupCommentsByDate(comments);

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

        if (image) {
            formData.append("image", image);
        }

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
                    setPasswordErrors(data.errors);
                } else if (data.message) {
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
                <div
                    className={`flex gap-1 items-end ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                    } text-sm`}
                >
                    <Link to="/">Home</Link>
                    <ChevronsRight size={18} />
                    <Link to="/admin">Dashboard</Link>
                    <ChevronsRight size={18} />
                    <Link
                        className={`${darkMode ? "text-white" : "text-black"}`}
                    >
                        Profile
                    </Link>
                </div>
                <h1 className="text-xl font-medium my-5">Admin Profile</h1>
                <div className="flex items-center gap-3">
                    <img
                        src={
                            image
                                ? URL.createObjectURL(image)
                                : user?.image
                                ? `/storage/${user.image}`
                                : Pf
                        }
                        alt=""
                        className={`w-20 h-20 object-cover rounded-full p-0.5 border ${
                            darkMode ? "border-gray-100" : "border-gray-800"
                        }`}
                    />
                    <div className="flex gap-2 md:justify-start mt-3">
                        <Input
                            id="image-upload"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={uploadImg}
                            className="hidden"
                        />

                        <Label
                            htmlFor="image-upload"
                            className="rounded-2xl border border-gray-600 px-3 py-2 cursor-pointer"
                        >
                            Edit
                        </Label>
                    </div>
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
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
                                placeholder="Enter your first name"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.firstName[0]}
                                </p>
                            )}
                        </div>
                        <div className="my-3 md:w-1/2">
                            <Label>Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={form.lastName}
                                onChange={handleInputChange}
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
                                placeholder="Enter your last name"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.lastName[0]}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="md:flex gap-2">
                        <div className="my-3 md:w-1/2">
                            <Label>Email</Label>
                            <Input
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
                                id="email"
                                name="email"
                                type="text"
                                value={form.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.email[0]}
                                </p>
                            )}
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
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 mt-1 text-sm">
                                    {errors.phone[0]}
                                </p>
                            )}
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
                            className={`${
                                darkMode ? "border-gray-300" : "border-gray-500"
                            } mt-1`}
                        />
                        {passwordErrors.currentPassword?.map((err, i) => (
                            <p key={i} className="text-red-500 mt-1 text-sm">
                                {err}
                            </p>
                        ))}
                        {passwordErrors.general?.map((err, i) => (
                            <p key={i} className="text-red-500 mt-1 text-sm">
                                {err}
                            </p>
                        ))}
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
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
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
                        <div className="my-3 md:w-1/2">
                            <Label>Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                placeholder="Confirm your password"
                                className={`${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-500"
                                } mt-1`}
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
    w-10 h-12 border border-gray-400 rounded-l-2xl
    shadow-md lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <Bell className="w-5 h-5 text-gray-700" />
                </button>
                <div
                    className={`
          fixed -mt-4 lg:-mt-0 right-0 h-full w-full md:w-1/2  shadow-lg 
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
                            {groupedComments.today.length > 0 ? (
                                groupedComments.today.map((comment) => (
                                    <Link
                                        to={`/course/${comment.subtitle.outline.course.id}/details`}
                                        key={comment.id}
                                        className="py-3 px-2 my-1 hover:bg-gray-100 duration-300 cursor-pointer rounded-lg"
                                    >
                                        <div className="flex gap-2">
                                            <img
                                                src={Pf} // You can use comment.user.image if available
                                                alt="profile"
                                                className={`w-12 h-12 object-cover rounded-full p-0.5 border ${
                                                    darkMode
                                                        ? "border-gray-100"
                                                        : "border-gray-500"
                                                }`}
                                            />
                                            <div className="text-sm">
                                                <p>
                                                    <strong>
                                                        {comment.user?.name ||
                                                            "User"}
                                                    </strong>{" "}
                                                    commented on{" "}
                                                    <strong>
                                                        {comment.subtitle
                                                            ?.subtitle ||
                                                            "a course"}
                                                    </strong>
                                                    .
                                                </p>
                                                <p className="text-gray-600 italic">
                                                    "
                                                    {comment.content.slice(
                                                        0,
                                                        50
                                                    )}
                                                    ..."
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm my-2">
                                    No comments today
                                </p>
                            )}
                        </div>

                        <hr className="border-t-gray-300 my-3 mx-2" />

                        {/* This Week Section */}
                        <div className="px-2">
                            <h2 className="text-base font-medium">This Week</h2>

                            {groupedComments.thisWeek.length > 0 ? (
                                groupedComments.thisWeek.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="py-3 px-2 my-1 hover:bg-gray-100 duration-300 cursor-pointer rounded-lg"
                                    >
                                        <div className="flex gap-2">
                                            <img
                                                src={
                                                    comment.user?.image
                                                        ? `/storage/${comment.user.image}`
                                                        : Pf
                                                }
                                                alt="profile"
                                                className="w-12 h-12 object-cover rounded-full p-0.5 border border-gray-500"
                                            />
                                            <div className="text-sm">
                                                <p>
                                                    <strong>
                                                        {comment.user?.name ||
                                                            "User"}
                                                    </strong>{" "}
                                                    commented on{" "}
                                                    <strong>
                                                        {comment.subtitle
                                                            ?.subtitle ||
                                                            "a course"}
                                                    </strong>
                                                    .
                                                </p>
                                                <p className="text-gray-600 italic">
                                                    "
                                                    {comment.content.slice(
                                                        0,
                                                        50
                                                    )}
                                                    ..."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm my-2">
                                    No comments this week
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
