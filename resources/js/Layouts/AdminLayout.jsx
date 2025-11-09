import AdminSidebar from "@/Components/AdminSidebar";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Apply dark mode class to <html>
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="flex">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <div
                className={`transition-all duration-300 ${
                    darkMode ? "bg-[#121212] text-white" : "bg-white text-black"
                } flex-1 mt-20 xl:mt-28 xl:border xl:border-gray-400 rounded-tl-3xl min-w-0 p-4 ${
                    isSidebarOpen
                        ? "xl:w-[76%] xl:ml-[25%]"
                        : "xl:w-full xl:ml-4"
                }`}
            >
                <Outlet />
            </div>
        </div>
    );
}
