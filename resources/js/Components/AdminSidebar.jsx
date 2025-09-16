import {
    ChevronsLeft,
    LayoutDashboard,
    ScrollText,
    Tag,
    PackageCheck,
    Users,
    Truck,
    HandPlatter,
    AppWindowMac,
    MessageSquare,
    Send,
    NotepadText,
    Handshake,
    Search,
    Menu,
    Settings,
    MoonStar,
    BookOpen,
    Newspaper,
    Users2,
    BookCopy,
    Wallet,
    MessageCircle,
    ReceiptText,
    Mail,
    TagIcon,
    Plus,
    GraduationCap,
} from "lucide-react";
import { useState } from "react";
import Logo from "../../assets/Logo.png";
import Pf from "../../assets/Profile.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminSidebar({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="flex gap-3"
        >
            <div
                className={`w-[80%] md:w-[50%] xl:w-[24%] bg-white flex flex-col pt-10 h-screen fixed top-0 transition-all duration-300 z-50
                ${isSidebarOpen ? "left-0" : "-left-[100%]"} 
            `}
            >
                <div className="flex justify-between items-center px-6 pb-6">
                    <img src={Logo} alt="Logo" className="w-20" />
                    <button onClick={() => setIsSidebarOpen(false)}>
                        <ChevronsLeft size={24} />
                    </button>
                </div>
                <aside className="h-screen hover:overflow-y-auto custom-scrollbar overflow-hidden duration-300 p-4 mt-3">
                    {/* Home Section */}
                    <div className="mb-6 ml-3">
                        <h2 className="text-xs font-semibold text-gray-900 uppercase mb-2">
                            Home
                        </h2>
                        <Link to="/admin/dashboard">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <LayoutDashboard size={20} /> Dashboard
                            </div>
                        </Link>
                        <Link to="/admin/purchase">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <ReceiptText size={20} /> Purchase
                            </div>
                        </Link>
                    </div>

                    {/* Courses Section */}
                    <div className="mb-6 ml-3">
                        <h2 className="text-xs font-semibold text-gray-900 uppercase mb-2">
                            Courses
                        </h2>
                        <Link to="/admin/courses/add">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <Plus size={20} /> Create Course
                            </div>
                        </Link>
                        <Link to="/admin/courses/categories">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <TagIcon size={20} /> Categories
                            </div>
                        </Link>
                        <Link to="/admin/courses">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <BookOpen size={20} /> Courses
                            </div>
                        </Link>
                    </div>

                    {/* Blog Section */}
                    <div className="mb-6 ml-3">
                        <h2 className="text-xs font-semibold text-gray-900 uppercase mb-2">
                            Blog
                        </h2>
                        <Link to="/admin/blogs/create">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <Plus size={20} /> Create Blog
                            </div>
                        </Link>
                        <Link to="/admin/blog/categories">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <TagIcon size={20} /> Categories
                            </div>
                        </Link>
                        <Link to="/admin/blogs">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <Newspaper size={20} /> Blogs
                            </div>
                        </Link>
                    </div>

                    {/* Other Links */}
                    <div className="mb-6 ml-3">
                        <Link to="/admin/users">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <Users size={20} /> Users
                            </div>
                        </Link>
                        <Link to="/admin/reviews">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <MessageCircle size={20} /> Reviews
                            </div>
                        </Link>
                        <Link to="/admin/contact">
                            <div className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-gray-100 text-black hover:text-accentRed border-l-4 border-l-white hover:border-l-accentRed transition-all duration-200 cursor-pointer">
                                <Mail size={20} /> Contact
                            </div>
                        </Link>
                    </div>
                </aside>
            </div>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <nav
                className={`px-6 py-3 md:py-4 pt-4 xl:pt-8 bg-white fixed top-0 w-full flex items-center justify-between shadow-md xl:shadow-none z-40
                ${
                    isSidebarOpen
                        ? "xl:w-[76%] xl:ml-[24%]"
                        : "xl:w-full xl:ml-0"
                }`}
            >
                <div className="flex items-center flex-1">
                    {!isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="mr-2 text-black focus:outline-none"
                        >
                            <Menu size={20} />
                        </button>
                    )}

                    <div className="relative hidden md:block flex-1 max-w-xs ml-3 xl:ml-0">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/3 text-gray-900"
                            size={16}
                        />
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="mt-1 border-gray-500 pl-8 pr-4"
                        />
                    </div>
                </div>

                <div className="flex items-center md:gap-6 gap-3">
                    <MoonStar size={20} className="text-gray-800" />
                    <Settings size={20} className="text-gray-800" />
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
                                <img
                                    src={Pf}
                                    alt="Profile"
                                    className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                                />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-40"
                            avoidCollisions={false}
                        >
                            <Link to="/admin/profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="cursor-pointer">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
        </motion.div>
    );
}
