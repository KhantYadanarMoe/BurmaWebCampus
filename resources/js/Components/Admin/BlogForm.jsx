import { Upload, X } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RichTextEditor from "../RichTextEditor";
import BlogImg from "../../../assets/Blog.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Button } from "../ui/button";

export default function BlogForm() {
    return (
        <div className="md:flex items-start gap-3">
            <div className="md:w-1/2">
                <h1 className="text-xl font-medium my-3">Create New Blog</h1>
                <form action="" className="mt-5">
                    <div className="my-3">
                        <Label>Blog Title</Label>
                        <Input
                            className="border-gray-400 mt-1"
                            placeholder="Write the title of this blog"
                        />
                    </div>
                    <div className="flex justify-center mt-5 px-4 py-4 border border-gray-400 bg-white rounded-md">
                        <div className="w-full p-8 rounded-md text-center">
                            <div className="flex flex-col items-center">
                                <Upload className="text-gray-700 text-4xl mb-4" />

                                <Label
                                    htmlFor="image-upload"
                                    className="flex items-center gap-1 justify-center cursor-pointer text-gray-700"
                                >
                                    <p className="hidden md:block">
                                        Drop your image here or
                                    </p>
                                    <p className="text-accentRed font-bold">
                                        Click to browse
                                    </p>
                                </Label>
                                <Input
                                    id="image-upload"
                                    name="image"
                                    type="file"
                                    className="hidden"
                                />
                                <p className="mt-4 text-sm">
                                    or drag and drop an image
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-1/2 flex justify-center mt-3 px-4 py-4 border border-gray-400 bg-white rounded-md">
                            <div className="w-full p-8 rounded-md text-center">
                                <div className="flex flex-col items-center">
                                    <Upload className="text-gray-700 text-4xl" />
                                    <Input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-center mt-3 px-4 py-4 border border-gray-400 bg-white rounded-md">
                            <div className="w-full p-8 rounded-md text-center">
                                <div className="flex flex-col items-center">
                                    <Upload className="text-gray-700 text-4xl" />
                                    <Input
                                        id="image-upload"
                                        name="image"
                                        type="file"
                                        className="hidden"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-3">
                        <Label htmlFor="category_id">Category</Label>
                        <Select>
                            <SelectTrigger
                                id="category_id"
                                name="category_id"
                                className="mt-1 border-gray-400"
                            >
                                <span>Select Category</span>{" "}
                            </SelectTrigger>
                            <SelectContent className="w-96 max-h-60">
                                <SelectItem value="frontend">
                                    Frontend
                                </SelectItem>
                                <SelectItem value="backend">Backend</SelectItem>
                                <SelectItem value="fullstack">
                                    Fullstack
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="my-3">
                        <Label>Body</Label>
                        <div className="mt-1">
                            <RichTextEditor className="min-h-[300px] border border-gray-400 rounded-md" />
                        </div>
                    </div>

                    <div className="my-3 flex justify-end">
                        <Button>Create</Button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 hidden md:block px-3 py-3 border border-gray-400 rounded-md">
                <h1 className="text-lg font-medium mb-4">Preview</h1>
                <div className="flex flex-col items-start mx-auto">
                    <span className="px-2 py-1 text-xs border border-gray-700 rounded-lg">
                        Frontend
                    </span>
                    <p className="py-2 text-xs text-gray-600">
                        August 23, 2025
                    </p>
                    <h1 className="text-lg md:text-xl font-medium">
                        Web Developer's Learning Path - 2025 Edition
                    </h1>
                    <img
                        src={BlogImg}
                        alt=""
                        className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                    />
                    <div className="px-2">
                        <h1 className="text-lg font-medium mb-3">
                            Lorem ipsum dolor sit amet consectetur.
                        </h1>
                        <p className="text-sm text-gray-700 mb-3">
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Iste nesciunt corporis mollitia consequuntur
                            ullam atque officiis magni aliquam impedit nobis
                            sapiente recusandae provident assumenda optio
                            molestias odio nulla explicabo, id dolores error
                            deserunt maxime culpa. Dolorem odio laboriosam
                            corrupti, quasi a magnam cumque asperiores nisi
                            enim, aliquam culpa totam voluptatum aperiam
                            praesentium corporis eius omnis impedit inventore
                            repudiandae laudantium unde ipsa ex ratione. Aut qui
                            inventore ab fugit accusamus aliquam voluptatibus
                            cumque incidunt doloribus laborum hic nulla,
                            recusandae reiciendis eius? Aut qui inventore ab
                            fugit accusamus aliquam voluptatibus cumque incidunt
                            doloribus laborum hic nulla, recusandae reiciendis
                            eius?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
