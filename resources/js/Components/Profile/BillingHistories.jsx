import React, { useEffect, useState } from "react";
import KBZ from "../../../assets/KBZPay.jpg";
import Wave from "../../../assets/WavePay.jpg";
import AYA from "../../../assets/AYAPay.jpg";
import UAB from "../../../assets/UABPay.jpg";
import CB from "../../../assets/CBPay.jpg";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import Empty from "../../../assets/Empty.png";
import axios from "axios";

export default function BillingHistories() {
    const [purchases, setPurchases] = useState([]);
    const [defaultPayment, setDefaultPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get("/api/user"); // returns user info
            setDefaultPayment(res.data.default_payment);
        };
        fetchUser();
    }, []);

    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("auth_token"); // or from context
            const res = await axios.get("/api/user/purchases", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPurchases(res.data.purchases);
        } catch (error) {
            console.error("Failed to fetch purchase history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    const SkeletonCard = () => (
        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
            <li className="basis-[4%]">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </li>
            <li className="basis-[21%]">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-5/6"></div>
            </li>
            <li className="basis-[35%] font-medium">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-5/6"></div>
            </li>
            <li className="basis-[11%]">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </li>
            <li className="basis-[15%]">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </li>
            <li className="basis-[14%]">
                <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </li>
        </ul>
    );
    return (
        <div className="px-5 md:px-6 lg:px-10 py-8 md:w-[97%] mx-auto ">
            <div>
                <h1 className="text-lg font-medium">Billing Method</h1>
                <p className="text-sm text-gray-800">
                    Set default billing method for better experiences.
                </p>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    {[
                        { name: "KBZ Pay", key: "kbz", icon: KBZ },
                        { name: "Wave Pay", key: "wave", icon: Wave },
                        { name: "AYA Pay", key: "aya", icon: AYA },
                        { name: "UAB Pay", key: "uab", icon: UAB },
                        { name: "CB Pay", key: "cb", icon: CB },
                    ].map((payment) => (
                        <Card
                            key={payment.key}
                            className={`relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg cursor-pointer ${
                                defaultPayment === payment.key
                                    ? "border-blue-500"
                                    : ""
                            }`}
                            onClick={async () => {
                                try {
                                    await axios.post(
                                        "/api/user/default-payment",
                                        { payment: payment.key }
                                    );
                                    setDefaultPayment(payment.key);
                                } catch (err) {
                                    console.error(err);
                                }
                            }}
                        >
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={payment.icon}
                                    alt={payment.name}
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    {payment.name}
                                </span>
                                {defaultPayment === payment.key && (
                                    <span className="ml-auto text-blue-500 font-bold">
                                        ✔
                                    </span>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="mt-10">
                <h1 className="text-lg font-medium mt-3">Billing Histories</h1>
                <div className="overflow-x-auto">
                    <div className="min-w-[920px] lg:min-w-[880px]">
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-700 my-3">
                            <li className="basis-[4%]">ID</li>
                            <li className="basis-[21%]">Name</li>
                            <li className="basis-[35%]">Course</li>
                            <li className="basis-[11%]">Pay with</li>
                            <li className="basis-[15%]">Enrolled Date</li>
                            <li className="basis-[14%]">Access</li>
                        </ul>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, idx) => (
                                <SkeletonCard key={idx} />
                            ))
                        ) : purchases.length > 0 ? (
                            purchases.map((purchase) => (
                                <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                                    <li className="basis-[4%]">
                                        {purchase.id}
                                    </li>
                                    <li className="basis-[21%]">
                                        {purchase.name}
                                    </li>
                                    <li className="basis-[35%] font-medium">
                                        {purchase.course.title}
                                    </li>
                                    <li className="basis-[11%]">
                                        {purchase.payment_method}
                                    </li>
                                    <li className="basis-[15%]">
                                        {new Date(
                                            purchase.created_at
                                        ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </li>
                                    <li className="basis-[14%]">
                                        Life-time access
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-2">
                                <img
                                    src={Empty}
                                    alt="No purchases"
                                    className="w-32 h-32 mb-4 object-contain"
                                />
                                <h2 className="text-xl font-semibold mb-2">
                                    No Purchases Found
                                </h2>
                                <p className="text-gray-500 text-center">
                                    You haven't enrolled a course from us!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
