import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React from "react";
import Google from "../../assets/Google.png";
import Bg from "../../assets/Auth-Bg.jpg";
import Logo from "../../assets/Logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { useSetting } from "@/Components/Admin/contexts/SiteInfoContext";

export default function Login() {
    const { form } = useSetting();
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const { setUser } = useAuth();

    const validateForm = () => {
        const newErrors = {};
        if (!loginForm.email.trim()) newErrors.email = ["Email is required."];
        if (!loginForm.password.trim())
            newErrors.password = ["Password is required."];

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle login
    const submit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setErrors({});

            // Step 1: Get CSRF cookie
            await axios.get("/sanctum/csrf-cookie", {
                withCredentials: true,
            });

            // Step 2: Send login request
            const res = await axios.post(
                "/api/login",
                {
                    email: loginForm.email,
                    password: loginForm.password,
                },
                {
                    withCredentials: true,
                }
            );

            // Step 3: Optional - Fetch user info
            const userRes = await axios.get("/api/user", {
                withCredentials: true,
            });
            setUser(userRes.data);

            console.log("Logged in user:", userRes.data);

            navigate("/"); // redirect on success
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Login failed. Please try again." });
            }
        }
    };

    return (
        <div className="flex flex-col-reverse lg:flex-row gap-3 min-h-screen md:min-h-full">
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-6 lg:p-8 flex-1">
                <div>
                    <h1 className="text-3xl font-medium">LOG IN</h1>
                    <p className="text-sm text-gray-700">
                        Login to access our courses and take next step in your
                        career.
                    </p>
                </div>
                <div className="my-8 lg:my-0 flex-1 flex flex-col justify-center">
                    <form onSubmit={submit} action="">
                        {errors.general && (
                            <p className="text-red-600 text-sm mb-2">
                                {errors.general}
                            </p>
                        )}
                        <div className="my-3">
                            <Label>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 border-gray-400"
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>
                        <div className="my-3">
                            <Label>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="mt-1 border-gray-400"
                                onChange={handleInputChange}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.password[0]}
                                </p>
                            )}
                            <div className="flex justify-between mt-1">
                                <p className="flex gap-1 items-center text-sm">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        value="1"
                                    />
                                    Remember me
                                </p>
                                <a
                                    href=""
                                    className="text-black hover:underline text-sm"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button type="submit" className="w-full">
                                LOGIN
                            </Button>
                        </div>
                    </form>
                    <div className="flex items-center my-4 lg:my-2">
                        <div className="flex-grow border-t border-gray-500"></div>
                        <span className="mx-4 text-gray-800 font-medium">
                            OR
                        </span>
                        <div className="flex-grow border-t border-gray-500"></div>
                    </div>
                    <Button
                        type="button"
                        className="bg-white text-black w-full border border-gray-700 hover:bg-gray-50"
                        onClick={() =>
                            (window.location.href =
                                "http://localhost:8000/auth/google")
                        }
                    >
                        <img
                            src={Google}
                            alt="Google Logo"
                            className="w-5 h-5 object-cover"
                        />
                        Signup with Google
                    </Button>
                </div>
                <div className="flex gap-1 items-center justify-center text-sm">
                    <span className="text-gray-700">
                        Don't Have An Account?
                    </span>
                    <Link to="/register" className="text-black hover:underline">
                        Signup
                    </Link>
                </div>
            </div>

            {/* Right block (image block) */}
            <div
                className="w-full lg:w-1/2 flex flex-col justify-between px-3 md:px-6 py-8 md:py-10 lg:py-8 h-auto lg:h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${Bg})` }}
            >
                <img
                    src={`/storage/${form.logo}`}
                    alt=""
                    className="w-16 md:w-20"
                />
                <div className="mt-8 md:mt-10 lg:mt-0">
                    <div className="flex-grow border-t border-gray-500 w-1/3"></div>
                    <p className="text-gray-900 mt-2 text-sm md:text-base">
                        Welcome back to {form?.site_name || "Burma Web Campus"},
                        your gateway to online learning and career growth. Log
                        in to access your courses, track progress, and connect
                        with our learning community. Continue your journey today
                        and take the next step toward your goals.
                    </p>
                </div>
                <div className="hidden lg:block mt-4 text-gray-700 text-sm">
                    Offering quality online courses since 2025.
                </div>
            </div>
        </div>
    );
}
