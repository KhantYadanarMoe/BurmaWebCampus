import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSetting } from "../contexts/SiteInfoContext";

export default function SiteInfo() {
    const { darkMode } = useOutletContext();
    const { form, setForm, image, setImage, getSetting } = useSetting();
    // store errors state
    const [errors, setErrors] = useState({});

    // prepare to move another route/page after sending data
    const navigate = useNavigate();

    // Handle HTML inputs
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

    // Handle image input
    const uploadImg = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        }
    };

    // form submit function
    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("site_name", form.site_name);
        formData.append("header", form.header);
        formData.append("description", form.description);

        if (image && typeof image !== "string") {
            formData.append("logo", image);
        }

        try {
            // Make sure CSRF cookie is fetched first
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const res = await axios.post("/api/settings/info", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // ✅ crucial
            });

            if (res.data.message === "Site Info Data updated successfully.") {
                navigate("/admin/settings");
            }
        } catch (error) {
            console.error("Error updating setting:", error);
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="my-8">
            <div className="flex justify-between">
                <div className="mb-5">
                    <h1 className="text-lg font-medium">Site Info</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update the general information of the site.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={submit}>Save Changes</Button>
                </div>
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-300" : "border-t-gray-800"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Site Name</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update your site name here.
                    </p>
                </div>
                <Input
                    id="site_name"
                    name="site_name"
                    type="text"
                    value={form.site_name}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter your site name"
                />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Logo</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update your site logo image here.
                    </p>
                </div>
                {form.logo && (
                    <img
                        src={`/storage/${form.logo}`} // adjust if needed
                        alt="Current Logo"
                        className="w-16  object-contain mb-2"
                    />
                )}
                <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={uploadImg}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Choose one"
                />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Header</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update your site hero header here.
                    </p>
                </div>
                <Input
                    id="header"
                    name="header"
                    type="text"
                    value={form.header}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter hero header"
                />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Description</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update your site hero desc here.
                    </p>
                </div>
                <Textarea
                    id="description"
                    name="description"
                    type="text"
                    value={form.description}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter hero description"
                ></Textarea>
            </div>
        </div>
    );
}
