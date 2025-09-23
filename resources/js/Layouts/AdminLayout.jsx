import AdminSidebar from "@/Components/AdminSidebar";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const isContactPage = location.pathname === "/admin/contacts";

    return (
        <div className="flex">
            <AdminSidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div
                className={`transition-all duration-300 flex-1 mt-20 xl:mt-28 xl:border xl:border-gray-400 ${
                    isContactPage ? "" : "p-4"
                } rounded-tl-3xl min-w-0 ${
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
