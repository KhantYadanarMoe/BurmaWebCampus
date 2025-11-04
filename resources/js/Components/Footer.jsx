import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

export default function Footer() {
    const [form, setForm] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({});

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

        let url = "/api/subscribe";
        let method = "post";

        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        formData.append("email", form.email);

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

            if (res.data.message === "Subscribed successfully.") {
                setForm({
                    email: "",
                });
                navigate("/");
            }
        } catch (error) {
            console.error("Error sending subscribe email:", error);

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };
    return (
        <div className="px-4 md:px-8">
            <hr className=" border-t-gray-500" />
            <div className="md:flex justify-between py-10">
                <div className="md:w-1/2 lg:w-1/3">
                    <img src={Logo} alt="" className="h-8" />
                    <p className="text-gray-800 mt-2">
                        Unlock your potential with Burma Web Campus. Learn to
                        code, build a career.
                    </p>
                    <div className="flex w-full max-w-sm items-center gap-2 mt-3">
                        <Input
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Enter your email"
                        />
                        <Button type="submit" onClick={submit}>
                            Subscribe
                        </Button>
                    </div>
                </div>
                <div className="hidden md:block md:w-1/2 lg:w-1/3">
                    <ul className="flex space-x-5 items-center justify-end mr-4">
                        <li>
                            <Link>Home</Link>
                        </li>
                        <li>
                            <Link>About</Link>
                        </li>
                        <li>
                            <Link>Courses</Link>
                        </li>
                        <li>
                            <Link>Blogs</Link>
                        </li>
                    </ul>
                    {/* <div className="flex gap-3 justify-end text-2xl py-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className="text-blue-600 hover:opacity-80" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram className="text-pink-500 hover:opacity-80" />
                        </a>
                    </div> */}
                </div>
            </div>
            <hr className="border-t-gray-500" />
            <p className="text-gray-700 text-sm py-3">
                &copy; 2025 Khart. All rights reserved.
            </p>
        </div>
    );
}
