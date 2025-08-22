import { User } from "lucide-react";
import { Outlet } from "react-router-dom";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/Footer";

export default function Layout() {
    return (
        <div className="relative">
            <div className="p-4 md:-6">
                <Navbar />
            </div>

            <div className="pt-6">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
