import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSetting } from "../contexts/EmailContext";
import axios from "axios";

export default function Email() {
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
        formData.append("admin_email", form.admin_email);
        formData.append("sender_name", form.sender_name);

        try {
            // Make sure CSRF cookie is fetched first
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const res = await axios.post("/api/settings/email", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res.data.message === "Email settings updated successfully.") {
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
                    <h1 className="text-lg font-medium">
                        Email & Notification
                    </h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Update email and notification settings.
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
                    <h1 className="font-medium">Admin Email</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Enter the email to get the update of this website.
                    </p>
                </div>
                <Input
                    id="admin_email"
                    name="admin_email"
                    type="email"
                    value={form.admin_email}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter your email"
                />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">Sender Name</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        The name which will display in the emails send to
                        students.
                    </p>
                </div>
                <Input
                    id="sender_name"
                    name="sender_name"
                    type="text"
                    value={form.sender_name}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="e.g: Burma Web Campus"
                />
            </div>
        </div>
    );
}
