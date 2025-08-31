import { User } from "lucide-react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/Footer";

export default function Layout() {
    return (
        <>
            <div className="pb-20 md:pb-28 lg:pb-32">
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </>
    );
}
