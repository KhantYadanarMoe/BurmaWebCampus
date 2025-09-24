import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React from "react";
import Google from "../../assets/Google.png";
import Bg from "../../assets/Auth-Bg.jpg";
import Logo from "../../assets/Logo.png";

export default function Login() {
    return (
        <div className="flex flex-col-reverse lg:flex-row gap-3 min-h-screen md:min-h-full">
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-4 md:p-6 lg:p-8 flex-1">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium">LOG IN</h1>
                    <p className="text-sm md:text-base text-gray-700">
                        Login to access our courses and take next step in your
                        career.
                    </p>
                </div>
                <div className="my-8 lg:my-0 flex-1 flex flex-col justify-center">
                    <form action="">
                        <div className="my-3">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                className="border-gray-400 mt-1"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="my-3">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                className="border-gray-400 mt-1"
                                placeholder="Enter your password"
                            />
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
                        <div className="mt-12 md:mt-10 mb-4">
                            <Button className="w-full">LOGIN</Button>
                        </div>
                    </form>
                    <div className="flex items-center md:my-4">
                        <div className="flex-grow border-t border-gray-500"></div>
                        <span className="mx-4 text-gray-800 font-medium">
                            OR
                        </span>
                        <div className="flex-grow border-t border-gray-500"></div>
                    </div>
                    <Button
                        variant="outline"
                        className="flex gap-2 items-center w-full border-gray-400 mt-4 mb-6"
                    >
                        <img src={Google} alt="google" className="w-5" />
                        LOGIN with Google
                    </Button>
                </div>
                <div className="flex gap-1 items-center justify-center">
                    <span className="text-gray-700">
                        Already Have An Account?
                    </span>
                    <a href="" className="text-black hover:underline">
                        Sign in
                    </a>
                </div>
            </div>

            {/* Right block (image block) */}
            <div
                className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-8 md:py-10 lg:py-8 h-auto lg:h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${Bg})` }}
            >
                <img src={Logo} alt="" className="w-16 md:w-20" />
                <div className="mt-8 md:mt-10 lg:mt-0">
                    <div className="flex-grow border-t border-gray-500 w-1/3"></div>
                    <p className="text-gray-900 mt-2 text-sm md:text-base">
                        Welcome back to Burma Web Campus, your gateway to online
                        learning and career growth. Log in to access your
                        courses, track progress, and connect with our learning
                        community. Continue your journey today and take the next
                        step toward your goals.
                    </p>
                </div>
                <div className="hidden lg:block mt-4 text-gray-700 text-sm">
                    Offering quality online courses since 2025.
                </div>
            </div>
        </div>
    );
}
