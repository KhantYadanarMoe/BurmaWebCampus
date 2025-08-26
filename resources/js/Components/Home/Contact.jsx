import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Mail, Phone } from "lucide-react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
} from "react-icons/fa";

export default function Contact() {
    return (
        <div className="px-5 lg:px-8 pb-8 pt-5 md:pt-8 md:flex items-center gap-3 lg:gap-5">
            {/* Text section */}
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

            {/* Form section */}
            <form action="" className="md:w-1/2 order-2 md:order-1">
                <div className="md:w-[95%] mx-auto">
                    <div className="my-3">
                        <Label>Name</Label>
                        <Input className="border-gray-500" />
                    </div>
                    <div className="my-3">
                        <Label>Email</Label>
                        <Input className="border-gray-500" />
                    </div>
                    <div className="my-3">
                        <Label>Phone</Label>
                        <Input className="border-gray-500" />
                    </div>
                    <div className="my-3">
                        <Label>Message</Label>
                        <Textarea className="border-gray-500"></Textarea>
                    </div>
                    <Button className="w-full my-4">Send</Button>
                </div>
            </form>
        </div>
    );
}
