import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    ChevronsRight,
    Ellipsis,
    GraduationCap,
    Plus,
    Users,
} from "lucide-react";
import Pf from "../../../assets/Profile.jpg";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import CourseImg from "../../../assets/Courses.jpg";
import { Progress } from "../ui/progress";
import axios from "axios";

export default function UsersList() {
    const { slug } = useParams();
    let [user, setUser] = useState([]);
    const { darkMode } = useOutletContext();

    const getDetails = async () => {
        try {
            const res = await axios.get(`/api/user/${slug}/details`);
            setUser(res.data.user);
        } catch (err) {
            console.error("Error fetching user:", err);
        }
    };

    useEffect(() => {
        getDetails();
    }, [slug]);

    return (
        <div>
            <div
                className={`flex gap-1 items-end ${
                    darkMode ? "text-gray-300" : "text-gray-800"
                } text-sm`}
            >
                <Link to="/admin">Dashboard</Link>
                <ChevronsRight size={18} />
                <Link to="/admin/users">Users</Link>
                <ChevronsRight size={18} />
                <Link className={`${darkMode ? "text-white" : "text-black"}`}>
                    {user.name}
                </Link>
            </div>
            <h1 className="text-xl font-medium my-5">Profile Details</h1>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-2 items-center">
                            <img
                                src={`/storage/${user.image}`}
                                alt=""
                                className="w-16 h-16 object-cover p-0.5 border border-gray-400 rounded-full"
                            />
                            <div>
                                <h1 className="text-lg font-medium">
                                    {user.name}
                                </h1>
                                <p
                                    className={`text-sm ${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    }`}
                                >
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <span
                            className={`px-2 py-1 rounded-xl ${
                                user?.banned === 1
                                    ? "bg-red-100 text-red-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {user?.banned === 1 ? "Banned" : "Active"}
                        </span>
                    </div>
                </CardContent>
            </Card>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg mt-5">
                <CardContent className="p-4">
                    <h1 className="text-lg font-medium mb-9">
                        Personal Information
                    </h1>
                    <div className="w-full md:w-[75%]">
                        <div className="flex justify-between my-7">
                            <div className="w-1/2">
                                <h1 className="font-medium">First Name</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {user?.name
                                        ?.trim()
                                        .split(" ")
                                        .slice(0, -1)
                                        .join(" ") || ""}
                                </p>
                            </div>
                            <div className="w-1/2">
                                <h1 className="font-medium">Last Name</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {user?.name
                                        ?.trim()
                                        .split(" ")
                                        .slice(-1)[0] || ""}
                                </p>
                            </div>
                        </div>
                        <div className="md:flex justify-between my-7">
                            <div className="md:w-1/2 my-7 md:my-0">
                                <h1 className="font-medium">Email</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {user?.email}
                                </p>
                            </div>
                            <div className="md:w-1/2 my-7 md:my-0">
                                <h1 className="font-medium">Phone</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {user?.phone}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between my-7">
                            <div className="w-1/2">
                                <h1 className="font-medium">Date of Birth</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {user?.DoB
                                        ? new Date(user.DoB).toLocaleDateString(
                                              "en-GB",
                                              {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              }
                                          )
                                        : ""}
                                </p>
                            </div>
                            <div className="w-1/2">
                                <h1 className="font-medium">Joined at</h1>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-700"
                                    } text-sm`}
                                >
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-medium">Bio</h1>
                            <p
                                className={`${
                                    darkMode ? "text-gray-300" : "text-gray-700"
                                } text-sm`}
                            >
                                {user?.bio}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="relative  border border-gray-400 shadow-lg rounded-lg mt-5">
                <CardContent className="p-4">
                    <h1 className="text-lg font-medium mb-8">
                        Enrolled Courses
                    </h1>
                    {user.purchases && user.purchases.length > 0 ? (
                        user.purchases.map((purchase) => (
                            <div key={purchase.id} className="flex gap-3 my-8">
                                <img
                                    src={`/storage/${purchase.course.image}`}
                                    alt="course image"
                                    className="hidden md:block w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <div>
                                        <h1 className="text-lg font-medium">
                                            {purchase.course.title}
                                        </h1>
                                        <p
                                            className={`${
                                                darkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-700"
                                            } text-sm`}
                                        >
                                            Enrolled at{" "}
                                            {new Date(
                                                purchase.created_at
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="py-1">
                                        <div className="flex justify-between">
                                            <h1
                                                className={`${
                                                    darkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                Progress
                                            </h1>
                                            <p className="text-black font-medium">
                                                {purchase.progress ?? 0}%
                                            </p>
                                        </div>
                                        <Progress
                                            value={purchase.progress ?? 0}
                                            className="mt-2 w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p
                            className={`${
                                darkMode ? "text-gray-300" : "text-gray-700"
                            } my-4`}
                        >
                            This user is not enrolled in any courses.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
