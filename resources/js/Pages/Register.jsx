import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import React from "react";
import Google from "../../assets/Google.png";
import Bg from "../../assets/Auth-Bg.jpg";
import Logo from "../../assets/Logo.png";

export default function Register() {
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
                    <form action="">
                        <div className="my-2">
                            <Label>Name</Label>
                            <Input
                                type="name"
                                className="border-gray-400 mt-1"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="my-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                className="border-gray-400 mt-1"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="my-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                className="border-gray-400 mt-1"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="my-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                className="border-gray-400 mt-1"
                                placeholder="Confirm your password"
                            />
                        </div>
                        <div className="mt-8">
                            <Button className="w-full">Register</Button>
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
                        variant="outline"
                        className="flex gap-2 items-center w-full border-gray-400 "
                    >
                        <img src={Google} alt="google" className="w-5" />
                        SIGNUP with Google
                    </Button>
                </div>
                <div className="flex gap-1 items-center justify-center text-sm">
                    <span className="text-gray-700">
                        Already Have An Account?
                    </span>
                    <a href="" className="text-black hover:underline">
                        Log in
                    </a>
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
