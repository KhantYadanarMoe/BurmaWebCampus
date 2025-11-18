import React, { useEffect, useState } from "react";
import AboutImg from "../../../assets/About3.jpg";
import { Card, CardContent } from "../ui/card";
import axios from "axios";

export default function Hero() {
    const [courses, setCourses] = useState([]);
    let [users, setUsers] = useState([]);
    const [studentCount, setStudentCount] = useState(0);

    const getCourses = async () => {
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    let getUsers = async () => {
        try {
            let res = await axios.get("/api/users");
            let usersData = res.data.users;

            // Filter students
            const students = usersData.filter(
                (user) => user.purchases && user.purchases.length > 0
            );

            // Set user list and student count
            setUsers(usersData);
            setStudentCount(students.length);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        getUsers();
        getCourses();
    }, []);

    return (
        <div className="px-5 lg:px-8">
            <div className="pb-10">
                <div className="md:w-2/3 pb-3">
                    <h1 className="text-2xl lg:text-3xl font-medium py-3">
                        Burma Web Campus{" "}
                    </h1>
                    <p className="text-gray-800 text-sm lg:text-base">
                        BurmaWebCampus is an online website development learning
                        hub for students in Myanmar with accessible, practical,
                        and future-ready education.
                    </p>
                </div>
                <img
                    src={AboutImg}
                    alt=""
                    className="w-full h-48 md:h-64 lg:h-80 object-cover my-3 rounded-md"
                />

                <div className="flex justify-end">
                    <div className="w-full flex flex-col md:flex-row justify-end gap-3">
                        <div className="md:w-1/3">
                            <div className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-50">
                                <h1 className="text-xl font-medium">
                                    {studentCount} Students
                                </h1>
                                <p className="text-gray-700">already joined</p>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="px-3 py-3 border border-gray-500 rounded-lg bg-gray-50">
                                <h1 className="text-xl font-medium">
                                    {courses.length} Courses
                                </h1>
                                <p className="text-gray-700">in total</p>
                            </div>
                        </div>
                        <div className="md:w-1/3">
                            <div className="px-3 py-3 border border-gray-500 rounded-lg bg-black text-white">
                                <h1 className="text-xl font-medium">
                                    24/7 Support
                                </h1>
                                <p className="text-gray-300">
                                    from your mentor
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t-gray-500" />
        </div>
    );
}
