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
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Switch } from "../ui/switch";

export default function BlogForm() {
    let [categories, setCategories] = useState([]);

    let { id } = useParams();
    let [isEdit, setIsEdit] = useState(false);

    const [cover, setCover] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null);

    const [detailImg1, setDetailImg1] = useState(null);
    const [detailImg1Url, setDetailImg1Url] = useState(null);

    const [detailImg2, setDetailImg2] = useState(null);
    const [detailImg2Url, setDetailImg2Url] = useState(null);

    let [blogDetail, setBlogDetails] = useState(null);

    const [errors, setErrors] = useState({});

    const { darkMode } = useOutletContext();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        cover: "",
        detail_image_1: "",
        detail_image_2: "",
        category_id: "",
        paragraph: "",
        visibility: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCustomChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    let getCategories = async () => {
        try {
            let res = await axios.get("/api/blog/categories");
            let data = res.data;
            setCategories(data.categories);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        console.log(id);
        setIsEdit(!!id);
    }, [id]);

    let getDetails = async (id) => {
        let res = await fetch("/api/blog/" + id);
        let data = await res.json();
        setBlogDetails(data.blog);
    };

    useEffect(() => {
        getDetails(id);
    }, [id]);

    useEffect(() => {
        if (blogDetail) {
            setCoverUrl(blogDetail.cover || null);
            setDetailImg1Url(blogDetail.detail_image_1 || null);
            setDetailImg2Url(blogDetail.detail_image_2 || null);

            setForm({
                title: blogDetail.title,
                category_id: blogDetail.category_id,
                paragraph: blogDetail.paragraph,
                visibility: blogDetail.visibility,
            });
        }
    }, [blogDetail]);

    const submit = async (e) => {
        e.preventDefault();

        let url = isEdit ? "/api/blog/" + id : "/api/blog/create";
        let method = "post";

        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        formData.append("title", form.title);
        formData.append("category_id", form.category_id);
        formData.append("paragraph", form.paragraph);
        formData.append("visibility", form.visibility ? "1" : "0");

        console.log("Form data after appending:", formData);

        if (cover) {
            formData.append("cover", cover);
        }
        if (cover instanceof File) {
            formData.append("cover", cover);
        }

        if (detailImg1 instanceof File) {
            formData.append("detail_image_1", detailImg1);
        }

        if (detailImg2 instanceof File) {
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

            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (
                res.data.message === "Blog created successfully." ||
                res.data.message === "Blog updated successfully."
            ) {
                navigate("/admin/blogs");
            }
        } catch (error) {
            console.error("Error creating blog:", error);

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const selectedCategory = categories.find(
        (cat) => cat.id === form.category_id
    );

    return (
        <div className="md:flex items-start gap-3">
            <div className="md:w-1/2">
                <h1 className="text-xl font-medium my-3">
                    {isEdit ? "Edit Blog" : "Create New Blog"}
                </h1>
                <form action="" className="mt-5">
                    <div className="my-3">
                        <Label>Blog Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                            type="text"
                            className={`${
                                darkMode ? "border-gray-300" : "border-gray-400"
                            } mt-1`}
                            placeholder="Write the title of this blog"
                        />
                        {errors.title && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.title[0]}
                            </p>
                        )}
                    </div>
                    <div
                        className={`flex justify-center mt-5 px-4 py-4 border ${
                            darkMode ? "border-gray-300" : "border-gray-400"
                        }  rounded-md`}
                    >
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
                                <Upload
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                    } text-4xl mb-4`}
                                />
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

                    <div className="flex gap-3 mt-3">
                        <div
                            className={`w-1/2 flex justify-center px-4 py-4 border ${
                                darkMode ? "border-gray-300" : "border-gray-400"
                            }  rounded-md`}
                        >
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
                                    <Upload
                                        className={`${
                                            darkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        } text-4xl`}
                                    />
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

                        <div className="w-1/2 flex justify-center px-4 py-4 border border-gray-400  rounded-md">
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
                                    <Upload
                                        className={`${
                                            darkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                        } text-4xl`}
                                    />
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

                    <div className="hidden md:flex gap-2 my-4">
                        {cover || coverUrl ? (
                            <div className="relative w-2/4 h-40">
                                <img
                                    src={
                                        cover
                                            ? URL.createObjectURL(cover)
                                            : `/storage/${coverUrl}`
                                    }
                                    alt="Cover Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCover(null);
                                        setCoverUrl(null);
                                    }}
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : null}

                        {detailImg1 || detailImg1Url ? (
                            <div className="relative w-1/4 h-40">
                                <img
                                    src={
                                        detailImg1
                                            ? URL.createObjectURL(detailImg1)
                                            : `/storage/${detailImg1Url}`
                                    }
                                    alt="Detail 1 Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDetailImg1(null);
                                        setDetailImg1Url(null);
                                    }}
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : null}

                        {detailImg2 || detailImg2Url ? (
                            <div className="relative w-1/4 h-40">
                                <img
                                    src={
                                        detailImg2
                                            ? URL.createObjectURL(detailImg2)
                                            : `/storage/${detailImg2Url}`
                                    }
                                    alt="Detail 2 Preview"
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDetailImg2(null);
                                        setDetailImg2Url(null);
                                    }}
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full hover:bg-opacity-80"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : null}
                    </div>

                    <div className="my-3">
                        <Label htmlFor="category_id">Category</Label>
                        <Select
                            value={
                                form.category_id && categories.length
                                    ? String(form.category_id)
                                    : ""
                            }
                            onValueChange={(value) =>
                                handleCustomChange(
                                    "category_id",
                                    parseInt(value, 10)
                                )
                            }
                        >
                            <SelectTrigger
                                className={`mt-1 ${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-400"
                                }`}
                            >
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
                        {errors.category_id && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.category_id[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-3">
                        <Label>Body</Label>
                        <div className="my-1">
                            <RichTextEditor
                                value={form.paragraph}
                                onChange={(val) =>
                                    handleCustomChange("paragraph", val)
                                }
                                className={`min-h-[300px] border ${
                                    darkMode
                                        ? "border-gray-300"
                                        : "border-gray-400"
                                } rounded-md`}
                            />
                        </div>
                        {errors.paragraph && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.paragraph[0]}
                            </p>
                        )}
                    </div>
                    <div className="my-3">
                        <Label>Visibility</Label>
                        <div className="my-1">
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
                        {errors.visibility && (
                            <p className="text-red-500 mt-1 text-sm">
                                {errors.visibility[0]}
                            </p>
                        )}
                    </div>

                    <div className="my-3 flex justify-end">
                        <Button onClick={submit}>
                            {isEdit ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 hidden md:block px-3 py-3 border border-gray-400 rounded-md">
                <h1 className="text-lg font-medium mb-4">Preview</h1>
                <div className="flex flex-col items-start mx-auto">
                    <span className="px-2 py-1 text-xs border border-gray-700 rounded-lg">
                        {selectedCategory ? selectedCategory.name : "Frontend"}
                    </span>
                    <p
                        className={`py-2 text-xs ${
                            darkMode ? "text-gray-200" : "text-gray-600"
                        }`}
                    >
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <h1 className="text-lg md:text-xl font-medium">
                        {form.title ||
                            "Web Developer's Learning Path - 2025 Edition"}
                    </h1>
                    {cover ? (
                        <img
                            src={URL.createObjectURL(cover)}
                            alt="Live Preview"
                            className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                        />
                    ) : isEdit && coverUrl ? (
                        <img
                            src={`/storage/${coverUrl}`}
                            alt="Cover Preview"
                            className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                        />
                    ) : (
                        <img
                            src={BlogImg}
                            alt="Default Preview"
                            className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                        />
                    )}
                    <div className="px-2">
                        {form.paragraph ? (
                            <div
                                className="prose text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: form.paragraph,
                                }}
                            />
                        ) : (
                            <>
                                <h1 className="text-lg font-medium mb-3">
                                    Lorem ipsum dolor sit amet consectetur.
                                </h1>
                                <p
                                    className={`text-sm ${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    }`}
                                >
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Iste nesciunt corporis
                                    mollitia consequuntur ullam atque officiis
                                    magni aliquam impedit nobis sapiente
                                    recusandae provident assumenda optio
                                    molestias odio nulla explicabo, id dolores
                                    error deserunt maxime culpa. Dolorem odio
                                    laboriosam corrupti, quasi a magnam cumque
                                    asperiores nisi enim, aliquam culpa totam
                                    voluptatum aperiam praesentium corporis eius
                                    omnis impedit inventore repudiandae
                                    laudantium unde ipsa ex ratione. Aut qui
                                    inventore ab fugit accusamus aliquam
                                    voluptatibus cumque incidunt doloribus
                                    laborum hic nulla, recusandae reiciendis
                                    eius?
                                </p>
                            </>
                        )}
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2 aspect-video">
                            {detailImg1 ? (
                                <img
                                    src={URL.createObjectURL(detailImg1)}
                                    alt="Live Preview"
                                    className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                                />
                            ) : isEdit && detailImg1Url ? (
                                <img
                                    src={`/storage/${detailImg1Url}`}
                                    alt="Cover Preview"
                                    className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                                />
                            ) : null}
                        </div>
                        <div className="w-1/2 aspect-video">
                            {detailImg2 ? (
                                <img
                                    src={URL.createObjectURL(detailImg2)}
                                    alt="Live Preview"
                                    className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                                />
                            ) : isEdit && detailImg2Url ? (
                                <img
                                    src={`/storage/${detailImg2Url}`}
                                    alt="Cover Preview"
                                    className="my-6 w-full h-56 object-cover rounded-bl-3xl rounded-br-3xl"
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
