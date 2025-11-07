import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React from "react";
import Google from "../../assets/Google.png";
import Bg from "../../assets/Auth-Bg.jpg";
import Logo from "../../assets/Logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = ["Name is required."];
        if (!form.email.trim()) newErrors.email = ["Email is required."];
        if (!form.password.trim())
            newErrors.password = ["Password is required."];

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setErrors({});

        try {
            await axios.get("/sanctum/csrf-cookie", {
                withCredentials: true,
            });

            // 2. Register user
            await axios.post(
                "/api/register",
                {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.passwordConfirmation,
                },
                { withCredentials: true }
            );

            setForm({
                name: "",
                email: "",
                password: "",
                passwordConfirmation: "",
            });

            const userRes = await axios.get("/api/user", {
                withCredentials: true,
            });
            setUser(userRes.data);

            console.log("Registered user:", userRes.data);

            navigate("/user"); // success redirect
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setErrors({ general: "Registration failed. Try again." });
            }
        }
    };
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-3 min-h-screen md:min-h-full">
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-6 lg:p-7 flex-1">
                <div>
                    <h1 className="text-2xl font-medium">SIGN UP</h1>
                    <p className="text-sm text-gray-700">
                        Signup now to learn new tech skills in the century of
                        technology.
                    </p>
                </div>
                <div className="my-8 lg:my-0 flex-1 flex flex-col justify-center">
                    <form onSubmit={submit}>
                        {errors.general && (
                            <p className="text-red-600 text-sm mb-2">
                                {errors.general}
                            </p>
                        )}
                        <div className="my-2">
                            <Label>Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.name[0]}
                                </p>
                            )}
                        </div>
                        <div className="my-2">
                            <Label>Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>
                        <div className="my-2">
                            <Label>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>
                        <div className="my-2">
                            <Label>Confirm Password</Label>
                            <Input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                placeholder="Confirm your password"
                                value={form.passwordConfirmation}
                                onChange={handleInputChange}
                                className="border-gray-400 mt-1"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>
                        <div className="mt-8">
                            <Button type="submit" className="w-full">
                                Register
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
                        Already Have An Account?
                    </span>
                    <Link to="/login" className="text-black hover:underline">
                        Login
                    </Link>
                </div>
            </div>

            {/* Right block (image block) */}
            <div
                className="w-full lg:w-1/2 flex flex-col justify-between px-3 md:px-6 py-8 md:py-10 lg:py-8 h-auto lg:h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${Bg})` }}
            >
                <img src={Logo} alt="" className="w-16 md:w-20" />
                <div className="mt-8 md:mt-10 lg:mt-0">
                    <div className="flex-grow border-t border-gray-500 w-1/3"></div>
                    <p className="text-gray-900 mt-2 text-sm md:text-base">
                        Join Burma Web Campus today and start your journey
                        toward online learning and career advancement. Create
                        your account to access courses, track your progress, and
                        become part of our vibrant learning community. Take the
                        first step now and unlock new opportunities for growth
                        and success.
                    </p>
                </div>
                <div className="hidden lg:block mt-4 text-gray-700 text-sm">
                    Offering quality online courses since 2025.
                </div>
            </div>
        </div>
    );
}
