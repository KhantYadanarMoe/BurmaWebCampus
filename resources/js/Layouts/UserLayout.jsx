import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import ProfileNav from "@/Components/Profile/ProfileNav";
import UserInfo from "@/Components/Profile/UserInfo";
import React from "react";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
    return (
        <>
            <div className="pb-20 md:pb-28 lg:pb-32">
                <Navbar />
            </div>
            <UserInfo />
            <ProfileNav />
            <Outlet />
            <Footer />
        </>
    );
}
