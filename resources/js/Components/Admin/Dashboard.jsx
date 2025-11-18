import React, { useEffect, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ReferenceLine,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Bell, BookCopy, Ellipsis, Users, Wallet } from "lucide-react";
import CourseImg from "../../../assets/Courses.jpg";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

export default function UserGrowthChart({
    data,
    height = 220,
    compact = false,
}) {
    const sampleData = [
        { date: "2025-01-01", users: 120 },
        { date: "2025-02-01", users: 150 },
        { date: "2025-03-01", users: 190 },
        { date: "2025-04-01", users: 230 },
        { date: "2025-05-01", users: 290 },
        { date: "2025-06-01", users: 330 },
        { date: "2025-07-01", users: 360 },
        { date: "2025-08-01", users: 410 },
        { date: "2025-09-01", users: 470 },
    ];

    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    let [users, setUsers] = useState([]);
    let [purchases, setPurchases] = useState([]);
    let [subscribers, setSubscribers] = useState([]);
    const { darkMode } = useOutletContext();

    const getCourses = async () => {
        try {
            const res = await axios.get("/api/courses");
            setCourses(res.data.courses);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    const topCourses = courses
        .slice()
        .sort((a, b) => (b.purchases_count || 0) - (a.purchases_count || 0))
        .slice(0, 5);

    let getUsers = async () => {
        try {
            let res = await axios.get("/api/users");
            let data = res.data;
            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    let getPurchases = async () => {
        try {
            let res = await axios.get("/api/course/purchase");
            let data = res.data;
            setPurchases(data.purchases);
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        }
    };

    const latestPurchases = purchases
        .slice()
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

    const totalRevenue = courses.reduce((acc, course) => {
        const courseRevenue =
            course.purchases?.reduce((sum, purchase) => {
                return sum + parseFloat(purchase.total_price || 0);
            }, 0) || 0;

        return acc + courseRevenue;
    }, 0);

    let getSubscribers = async () => {
        try {
            let res = await axios.get("/api/subscribers");
            let data = res.data;
            setSubscribers(data.subscribes);
        } catch (error) {
            console.error("Failed to fetch subscribers:", error);
        }
    };

    useEffect(() => {
        getUsers();
        getCourses();
        getPurchases();
        getSubscribers();
    }, []);

    const chartData = data || sampleData;

    // compute summary metrics
    const { totalUsers, delta, deltaPercent, trend } = useMemo(() => {
        const last = chartData[chartData.length - 1]?.users ?? 0;
        const prev = chartData[chartData.length - 2]?.users ?? 0;
        const first = chartData[0]?.users ?? 0;
        const total = last;
        const d = last - prev;
        const pct =
            prev > 0
                ? (d / prev) * 100
                : ((last - first) / Math.max(1, first)) * 100;
        const t = d >= 0 ? "up" : "down";
        return {
            totalUsers: total,
            delta: d,
            deltaPercent: Math.round(pct * 10) / 10,
            trend: t,
        };
    }, [chartData]);

    const formatX = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleString(undefined, { month: "short" });
        } catch {
            return iso;
        }
    };

    console.log("Dark mode:", darkMode);

    return (
        <div>
            <h1 className="text-lg font-medium">Dashboard</h1>
            <div className="my-5 md:grid md:grid-cols-4 gap-2">
                <Card
                    className={`my-2 md:my-0 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    <CardContent className="p-3">
                        <div className="flex justify-between">
                            <div>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    } font-medium`}
                                >
                                    Total Courses
                                </p>
                                <p
                                    className={`${
                                        darkMode ? "text-white" : "text-black"
                                    } text-lg font-medium mt-1`}
                                >
                                    {courses.length}
                                </p>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-500"
                                    } text-sm mt-2`}
                                >
                                    Active courses
                                </p>
                            </div>
                            <BookCopy className="px-1 py-2 w-9 h-9 bg-green-200 text-green-700 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
                <Card
                    className={`my-2 md:my-0 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    <CardContent className="p-3">
                        <div className="flex justify-between">
                            <div>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    } font-medium`}
                                >
                                    Total Users
                                </p>
                                <p
                                    className={`${
                                        darkMode ? "text-white" : "text-black"
                                    } text-lg font-medium mt-1`}
                                >
                                    {users?.length}
                                </p>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-500"
                                    } text-sm mt-2`}
                                >
                                    Registered users
                                </p>
                            </div>
                            <Users className="px-1 py-2 w-9 h-9 bg-green-200 text-green-700 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
                <Card
                    className={`my-2 md:my-0 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    <CardContent className="p-3">
                        <div className="flex justify-between">
                            <div>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    } font-medium`}
                                >
                                    Revenue
                                </p>
                                <p
                                    className={`${
                                        darkMode ? "text-white" : "text-black"
                                    } text-lg font-medium mt-1`}
                                >
                                    {totalRevenue.toLocaleString()} MMK
                                </p>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-500"
                                    } text-sm mt-2`}
                                >
                                    Overall revenue
                                </p>
                            </div>
                            <Wallet className="px-1 py-2 w-9 h-9 bg-green-200 text-green-700 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
                <Card
                    className={`my-2 md:my-0 ${
                        darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                    <CardContent className="p-3">
                        <div className="flex justify-between">
                            <div>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-300"
                                            : "text-gray-800"
                                    } font-medium`}
                                >
                                    Subscribers
                                </p>
                                <p
                                    className={`${
                                        darkMode ? "text-white" : "text-black"
                                    } text-lg font-medium mt-1`}
                                >
                                    {subscribers?.length}
                                </p>
                                <p
                                    className={`${
                                        darkMode
                                            ? "text-gray-200"
                                            : "text-gray-500"
                                    } text-sm mt-2`}
                                >
                                    Subscribed users
                                </p>
                            </div>
                            <Bell className="px-1 py-2 w-9 h-9 bg-green-200 text-green-700 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
                <Card className="md:w-3/5  border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-3 h-full flex items-center">
                        <div className="w-full">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p
                                        className={`${
                                            darkMode
                                                ? "text-gray-300"
                                                : "text-gray-700"
                                        } font-medium`}
                                    >
                                        User Growth
                                    </p>
                                    <div className="flex items-end gap-3">
                                        <p className=" text-2xl font-semibold">
                                            {totalUsers.toLocaleString()}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-sm font-medium ${
                                                    trend === "up"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {trend === "up"
                                                    ? `+${delta}`
                                                    : `${delta}`}
                                            </span>
                                            <span className="text-xs text-gray-400">
                                                ({deltaPercent}%)
                                            </span>
                                        </div>
                                    </div>
                                    {!compact && (
                                        <p className="text-gray-400 text-sm mt-2">
                                            Monthly active users — last
                                            {chartData.length} months
                                        </p>
                                    )}
                                </div>

                                <div className="text-right text-sm text-gray-400">
                                    <p className="hidden sm:block">
                                        Since start: {chartData[0]?.date}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full mt-4" style={{ height }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={chartData}
                                        margin={{
                                            top: 8,
                                            right: 16,
                                            left: -12,
                                            bottom: 8,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="colorUsers"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#34D399"
                                                    stopOpacity={0.35}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#34D399"
                                                    stopOpacity={0.05}
                                                />
                                            </linearGradient>
                                        </defs>

                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e7e7e7"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="date"
                                            tickFormatter={formatX}
                                            axisLine={false}
                                            tick={{
                                                fontSize: 12,
                                                fill: "#6b7280",
                                            }}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            axisLine={false}
                                            tick={{
                                                fontSize: 12,
                                                fill: "#6b7280",
                                            }}
                                            tickCount={6}
                                            width={56}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 8,
                                                border: "1px solid #e5e7eb",
                                            }}
                                            formatter={(value) => [
                                                value.toLocaleString(),
                                                "Users",
                                            ]}
                                            labelFormatter={(label) =>
                                                `Date: ${label}`
                                            }
                                        />
                                        <Legend
                                            verticalAlign="top"
                                            align="right"
                                            height={36}
                                        />
                                        <ReferenceLine
                                            y={
                                                chartData[chartData.length - 2]
                                                    ?.users
                                            }
                                            stroke="#fde68a"
                                            strokeDasharray="3 3"
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorUsers)"
                                            activeDot={{ r: 5 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="mt-3 flex gap-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                                    <span className="text-gray-500">Users</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-300 inline-block" />
                                    <span className="text-gray-500">
                                        Previous
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:w-2/5 border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-3">
                        <div>
                            <h1 className="text-lg font-medium">
                                Top 5 Courses
                            </h1>
                            {topCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="my-3 flex gap-2"
                                >
                                    <img
                                        src={
                                            course.image
                                                ? `/storage/${course.image}`
                                                : CourseImg
                                        }
                                        alt={course.title}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h1 className="text-sm font-medium mb-1">
                                            {course.title}
                                        </h1>
                                        <span className="px-1 py-0.5 text-xs border border-gray-700 rounded-md">
                                            {course.category?.name || "Unknown"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="my-5">
                <Card className="border border-gray-600 shadow-lg rounded-lg">
                    <CardContent className="p-3">
                        <h1 className="text-lg font-medium">Latest Purchase</h1>
                        <p className="text-gray-500 text-sm">
                            Here are the latest purchase of the courses.
                        </p>
                        <div className="overflow-x-auto w-full">
                            <div className="min-w-[920px]">
                                <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                                    <li className="basis-[4%]">ID</li>
                                    <li className="basis-[10%]">Invoice</li>
                                    <li className="basis-[30%] pl-2">
                                        Course Name
                                    </li>
                                    <li className="basis-[20%]">
                                        Student Name
                                    </li>
                                    <li className="basis-[10%]">Payment</li>
                                    <li className="basis-[11%]">Date</li>
                                    <li className="basis-[10%]">Access</li>
                                    <li className="basis-[5%]"></li>
                                </ul>
                                {latestPurchases.map((purchase, index) => (
                                    <ul className="flex items-center px-3 py-3 border-b border-b-gray-300 my-2">
                                        <li className="basis-[4%]">
                                            {purchase.id}
                                        </li>
                                        <li className="basis-[10%]">
                                            {purchase.invoice_no}
                                        </li>
                                        <li className="basis-[30%] flex items-center gap-2">
                                            <img
                                                src={`/storage/${purchase.course.image}`}
                                                alt=""
                                                className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                                            />
                                            <p className="text-sm font-medium">
                                                {purchase.course.title}
                                            </p>
                                        </li>
                                        <li className="basis-[20%]">
                                            {purchase.name}
                                        </li>
                                        <li className="basis-[10%]">
                                            {purchase.payment_method}
                                        </li>
                                        <li className="basis-[11%]">
                                            <p className="text-sm">
                                                {new Date(
                                                    purchase.created_at
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="text-sm">
                                                {new Date(
                                                    purchase.created_at
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                        </li>
                                        <li className="basis-[10%]">
                                            Life-time
                                        </li>
                                        <li className="basis-[5%]">
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <button
                                                        className={`p-1 rounded-md ${
                                                            darkMode
                                                                ? "hover:bg-gray-800"
                                                                : "hover:bg-gray-100"
                                                        } outline-none`}
                                                    >
                                                        <Ellipsis size={20} />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-40"
                                                >
                                                    <DropdownMenuItem
                                                        className="text-accentGreen"
                                                        onSelect={(e) => {
                                                            e.preventDefault();
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        View Details
                                                    </DropdownMenuItem>

                                                    <Dialog
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Invoice{" "}
                                                                    {
                                                                        purchase.invoice_no
                                                                    }
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Enrolled at{" "}
                                                                    {new Date(
                                                                        purchase.created_at
                                                                    ).toLocaleDateString(
                                                                        "en-GB",
                                                                        {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        }
                                                                    )}
                                                                </DialogDescription>
                                                            </DialogHeader>

                                                            <div className="flex gap-2 items-center mt-4 mb-2">
                                                                <img
                                                                    src={`/storage/${purchase.course.image}`}
                                                                    alt={
                                                                        purchase
                                                                            .course
                                                                            .title
                                                                    }
                                                                    className="w-12 h-12 object-cover rounded-md"
                                                                />
                                                                <h1 className="font-medium">
                                                                    {
                                                                        purchase
                                                                            .course
                                                                            .title
                                                                    }
                                                                </h1>
                                                            </div>
                                                            <hr className="border-t-gray-500 border-dashed" />
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Name -
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        purchase.name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Email -
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        purchase.email
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Phone -
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        purchase.phone
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Price -
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    {
                                                                        purchase
                                                                            .course
                                                                            .price
                                                                    }{" "}
                                                                    MMK
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Discount -
                                                                </p>
                                                                <p className="text-gray-700">
                                                                    0 MMK
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium">
                                                                    Pay with -
                                                                </p>
                                                                <p className="text-gray-700 uppercase">
                                                                    {
                                                                        purchase.payment_method
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="mt-20 md:mt-40 lg:mt-16">
                                                                <hr className="border-t border-dashed border-gray-500" />
                                                                <div className="flex items-center justify-between my-3">
                                                                    <p className="font-medium">
                                                                        Total -
                                                                    </p>
                                                                    <p className="text-gray-700">
                                                                        {
                                                                            purchase
                                                                                .course
                                                                                .price
                                                                        }{" "}
                                                                        MMK
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
