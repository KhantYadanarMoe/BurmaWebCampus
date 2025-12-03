import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSetting } from "../contexts/SecurityContext";
import axios from "axios";

export default function Security() {
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
        formData.append("password_length", form.password_length);
        formData.append("session_timeout", form.session_timeout);

        try {
            // Make sure CSRF cookie is fetched first
            await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const res = await axios.post("/api/settings/security", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (
                res.data.message === "Security settings updated successfully."
            ) {
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
                    <h1 className="text-lg font-medium">Security</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Set security for this website.
                    </p>
                </div>
                <div className="md:flex gap-2">
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
                    <h1 className="font-medium">Password length (min)</h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Set min-length of password for login.
                    </p>
                </div>
                <Input
                    id="password_length"
                    name="password_length"
                    type="number"
                    value={form.password_length}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter the length of password"
                />
            </div>
            <hr
                className={`${
                    darkMode ? "border-t-gray-600" : "border-t-gray-300"
                }`}
            />
            <div className="md:flex gap-3 my-4 md:my-6">
                <div className="md:w-1/2">
                    <h1 className="font-medium">
                        Session Timeout Duration (sec)
                    </h1>
                    <p
                        className={`hidden md:block text-sm ${
                            darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                    >
                        Set auto-logout time.
                    </p>
                </div>
                <Input
                    id="session_timeout"
                    name="session_timeout"
                    type="number"
                    value={form.session_timeout}
                    onChange={handleInputChange}
                    className="border-gray-400 md:w-1/2 mt-2 md:mt-0"
                    placeholder="Enter time for session timeout"
                />
            </div>
        </div>
    );
}
