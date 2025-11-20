import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mail, Phone } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        let url = "/api/contact";
        let method = "post";

        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("message", form.message);

        console.log("Form data after appending:", formData);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.message === "Contact Message sent successfully.") {
                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    message: "",
                });
                setShowSuccessDialog(true);
                navigate("/");
            }
        } catch (error) {
            console.error("Error sending contact message:", error);

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="px-5 lg:px-8 pb-8 pt-5 md:pt-8 md:flex items-center gap-3 lg:gap-5">
            <div className="md:w-1/2 order-1 md:order-2">
                <div className="my-5">
                    <h2 className="font-semibold mb-1 relative inline-block">
                        Contact us
                    </h2>
                    <div className="flex">
                        <div className="w-16 h-[1px] bg-black"></div>
                    </div>
                </div>
                <h1 className="text-2xl font-medium my-2">Get In Touch</h1>
                <p className="text-gray-700 text-sm">
                    We’d love to stay connected with you! Here are some
                    additional ways you can reach out to us. Whether you have
                    questions, feedback, or simply want to share your thoughts,
                    we’re always happy to hear from you.
                </p>

                <div className="my-6 flex">
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 font-medium">
                            <Phone size={20} /> Phone
                        </div>
                        <p className="text-gray-700 mt-1 text-sm lg:text-base">
                            +959 265 783 823
                        </p>
                    </div>
                    <div className="w-1/2">
                        <div className="flex items-center gap-2 font-medium">
                            <Mail size={20} /> Email
                        </div>
                        <p className="text-gray-700 mt-1 text-sm lg:text-base">
                            burmawebcampus@gmail.com
                        </p>
                    </div>
                </div>

                <div className="my-6">
                    <h1 className="text-lg font-medium">Social Medias</h1>
                    <div className="flex mt-3 gap-3 text-2xl">
                        <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                        <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                        <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
                        <FaYoutube className="hover:text-red-600 cursor-pointer" />
                        <FaTiktok className="hover:text-black cursor-pointer" />
                    </div>
                </div>
            </div>

            <form action="" className="md:w-1/2 order-2 md:order-1">
                <div className="md:w-[95%] mx-auto">
                    <div className="my-3">
                        <Label>Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-3">
                        <Label>Email</Label>
                        <Input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-3">
                        <Label>Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Enter your phone"
                        />
                        {errors.phone && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.phone[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-3">
                        <Label>Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Write something..."
                        ></Textarea>
                        {errors.message && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.message[0]}
                            </p>
                        )}
                    </div>
                    <Button onClick={submit} className="w-full my-4">
                        Send
                    </Button>
                </div>
            </form>

            <AlertDialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Thank you for contacting us!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your contact message was sent successfully! We'll
                            contact you soon.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setShowSuccessDialog(false)}>
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
