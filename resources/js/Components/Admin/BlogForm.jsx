import { Upload, X } from "lucide-react";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RichTextEditor from "../RichTextEditor";
import BlogImg from "../../../assets/Blog.jpg";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Switch } from "../ui/switch";

export default function BlogForm() {
    // state to store categories to show all of the categories data
    let [categories, setCategories] = useState([]);

    // take id for edit feature
    let { id } = useParams();

    // state to check the page is create page or edit page
    let [isEdit, setIsEdit] = useState(false);

    // check the id is exist or not (number or undefined)
    useEffect(() => {
        console.log(id);
        setIsEdit(!!id);
    }, [id]);

    // form data to store before sending to backend
    const [cover, setCover] = useState(null); //for new cover upload
    const [coverUrl, setCoverUrl] = useState(null); // for displaying the existing cover

    // form data to store before sending to backend
    const [detailImg1, setDetailImg1] = useState(null); //for new detailImg1 upload
    const [detailImg1Url, setDetailImg1Url] = useState(null); // for displaying the existing detailImg1

    // form data to store before sending to backend
    const [detailImg2, setDetailImg2] = useState(null); //for new detailImg2 upload
    const [detailImg2Url, setDetailImg2Url] = useState(null); // for displaying the existing detailImg2

    // prepare state to store form data
    const [form, setForm] = useState({
        title: "",
        cover: "",
        detail_image_1: "",
        detail_image_2: "",
        category_id: "",
        paragraph: "",
        visibility: true,
    });
    // store errors state
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    // function to fetch all of the categories data
    let getCategories = async () => {
        try {
            let res = await axios.get("/api/blog/categories");
            let data = res.data;
            setCategories(data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    // call data fetching function in useEffect to run when user enter the page
    useEffect(() => {
        getCategories();
    }, []);

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

    // form submit function
    const submit = async (e) => {
        e.preventDefault();
        // setIsDialogOpen(false);

        // url and method to use in sending data using axios
        let url = isEdit ? "/api/blog/" + id : "/api/blog/create";
        let method = "post";

        // create new object to store form data to send
        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        // store state data in object
        formData.append("title", form.title);
        formData.append("category_id", form.category_id);
        formData.append("paragraph", form.paragraph);
        formData.append("visibility", form.visibility ? "1" : "0");

        console.log("Form data after appending:", formData);

        if (cover) {
            formData.append("cover", cover);
        }
        if (detailImg1) {
            formData.append("detail_image_1", detailImg1);
        }
        if (detailImg2) {
            formData.append("detail_image_2", detailImg2);
        }

        if (isEdit) {
            formData.append("_method", "PUT");
        }

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            // send data
            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            // success condition
            if (
                res.data.message === "Blog created successfully." ||
                res.data.message === "Blog updated successfully."
            ) {
                navigate("/admin/blogs");
            }
        } catch (error) {
            console.error("Error creating blog:", error);

            // failed condition
            if (error.response && error.response.status === 422) {
                setIsDialogOpen(false);
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="md:flex items-start gap-3">
            <div className="md:w-1/2">
                <h1 className="text-xl font-medium my-3">Create New Blog</h1>
                <form action="" className="mt-5">
                    <div className="my-3">
                        <Label>Blog Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Write the title of this blog"
                        />
                    </div>
                    {/* Cover Image */}
                    <div className="flex justify-center mt-5 px-4 py-4 border border-gray-400 bg-white rounded-md">
                        <div
                            className="w-full p-8 rounded-md text-center cursor-pointer"
                            onClick={() =>
                                document.getElementById("cover_upload").click()
                            }
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const file = e.dataTransfer.files[0];
                                if (file && file.type.startsWith("image/"))
                                    setCover(file);
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <Upload className="text-gray-700 text-4xl mb-4" />
                                <p className="text-accentRed font-bold">
                                    Click to browse or drag & drop
                                </p>
                            </div>
                            <Input
                                id="cover_upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) setCover(file);
                                }}
                                className="hidden"
                            />
                            <p className="mt-4 text-sm">
                                or drag and drop an image
                            </p>
                        </div>
                    </div>

                    {/* Detail Images */}
                    <div className="flex gap-3 mt-3">
                        {/* Detail Image 1 */}
                        <div className="w-1/2 flex justify-center px-4 py-4 border border-gray-400 bg-white rounded-md">
                            <div
                                className="w-full p-8 rounded-md text-center cursor-pointer"
                                onClick={() =>
                                    document
                                        .getElementById("detail_img_1_upload")
                                        .click()
                                }
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file && file.type.startsWith("image/"))
                                        setDetailImg1(file);
                                }}
                            >
                                <div className="flex flex-col items-center">
                                    <Upload className="text-gray-700 text-4xl" />
                                </div>
                                <Input
                                    id="detail_img_1_upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) setDetailImg1(file);
                                    }}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Detail Image 2 */}
                        <div className="w-1/2 flex justify-center px-4 py-4 border border-gray-400 bg-white rounded-md">
                            <div
                                className="w-full p-8 rounded-md text-center cursor-pointer"
                                onClick={() =>
                                    document
                                        .getElementById("detail_img_2_upload")
                                        .click()
                                }
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file && file.type.startsWith("image/"))
                                        setDetailImg2(file);
                                }}
                            >
                                <div className="flex flex-col items-center">
                                    <Upload className="text-gray-700 text-4xl" />
                                </div>
                                <Input
                                    id="detail_img_2_upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) setDetailImg2(file);
                                    }}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="my-3">
                        <Label htmlFor="category_id">Category</Label>
                        <Select
                            value={
                                form.category_id ? String(form.category_id) : ""
                            }
                            onValueChange={(value) =>
                                handleCustomChange(
                                    "category_id",
                                    parseInt(value, 10)
                                )
                            }
                        >
                            <SelectTrigger className="mt-1 border-gray-400">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent className="w-96 max-h-60">
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={String(category.id)}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="my-3">
                        <Label>Body</Label>
                        <div className="mt-1">
                            <RichTextEditor
                                value={form.paragraph}
                                onChange={(val) =>
                                    handleCustomChange("paragraph", val)
                                }
                                className="min-h-[300px] border border-gray-400 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="my-3">
                        <Label>Visibility</Label>
                        <div className="mt-1">
                            <Switch
                                id="visibility"
                                name="visibility"
                                checked={
                                    form.visibility === true ||
                                    form.visibility === "1" ||
                                    form.visibility === 1
                                }
                                onCheckedChange={(checked) =>
                                    handleCustomChange("visibility", checked)
                                }
                            />
                        </div>
                    </div>

                    <div className="my-3 flex justify-end">
                        <Button onClick={submit}>Create</Button>
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
