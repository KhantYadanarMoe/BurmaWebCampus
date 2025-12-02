import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSetting } from "../contexts/AppearanceContext";
import axios from "axios";

export default function Appearance() {
    const { darkMode } = useOutletContext();
    const { form, setForm, getSetting } = useSetting();
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

    // form submit function
    const submit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("google_font_url", form.google_font_url);
        formData.append("google_font_family", form.google_font_family);

        try {
            // Make sure CSRF cookie is fetched first
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const res = await axios.post("/api/settings/appearance", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.message === "Font settings updated successfully.") {
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
                    <h1 className="text-lg font-medium">Appearance</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update the appearance of the website.
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
                    <h1 className="font-medium">Font style</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update the font style of the website.
                    </p>
                </div>
                <div className="md:w-1/2">
                    <Input
                        id="google_font_url"
                        name="google_font_url"
                        type="text"
                        value={form.google_font_url}
                        onChange={handleInputChange}
                        className="border-gray-400 mt-2 md:mt-0"
                        placeholder="https://"
                    />
                    <p className="text-sm text-gray-600 mt-1 ml-1">
                        Enter google font link here.
                    </p>
                </div>
            </div>
            <div className="md:flex gap-3 my-4">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Font Family</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Enter the font family name (e.g., "Poppins").
                    </p>
                </div>
                <div className="md:w-1/2">
                    <Input
                        id="google_font_family"
                        name="google_font_family"
                        type="text"
                        value={form.google_font_family}
                        onChange={handleInputChange}
                        className="border-gray-400 mt-2 md:mt-0"
                        placeholder="e.g., Poppins"
                    />
                    <p className="text-sm text-gray-600 mt-1 ml-1">
                        Enter the font-family name from Google Fonts.
                    </p>
                </div>
            </div>
        </div>
    );
}
