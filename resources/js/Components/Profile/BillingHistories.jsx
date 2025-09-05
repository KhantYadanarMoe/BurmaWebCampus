import React from "react";
import KBZ from "../../../assets/KBZPay.jpg";
import Wave from "../../../assets/WavePay.jpg";
import AYA from "../../../assets/AYAPay.jpg";
import UAB from "../../../assets/UABPay.jpg";
import CB from "../../../assets/CBPay.jpg";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

export default function BillingHistories() {
    return (
        <div className="px-5 md:px-6 lg:px-10 py-8 md:w-[97%] mx-auto ">
            <div>
                <h1 className="text-lg font-medium">Billing Method</h1>
                <p className="text-sm text-gray-800">
                    Set default billing method for better experiences.
                </p>
                <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                    <Link>
                        <Card className="relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={KBZ}
                                    alt="KBZ"
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    KBZ Pay
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={Wave}
                                    alt="Wave"
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    Wave Pay
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={AYA}
                                    alt="AYA"
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    AYA Pay
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={UAB}
                                    alt="UAB"
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    UAB Pay
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link>
                        <Card className="relative bg-white hover:bg-gray-50 duration-300 border border-gray-600 shadow-lg rounded-lg">
                            <CardContent className="p-2 flex items-center gap-2">
                                <img
                                    src={CB}
                                    alt="CB"
                                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-md"
                                />
                                <span className="md:text-lg font-medium">
                                    CB Pay
                                </span>
                            </CardContent>
                        </Card>
                    </Link>
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
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">1</li>
                            <li className="basis-[21%]">Khant Yadanar Moe</li>
                            <li className="basis-[35%] font-medium">
                                Full-stack Web Development Pathway
                            </li>
                            <li className="basis-[11%]">KBZ Pay</li>
                            <li className="basis-[15%]">8 Aug 2025</li>
                            <li className="basis-[14%]">Life-time access</li>
                        </ul>
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">1</li>
                            <li className="basis-[21%]">Khant Yadanar Moe</li>
                            <li className="basis-[35%] font-medium">
                                Full-stack Web Development Pathway
                            </li>
                            <li className="basis-[11%]">KBZ Pay</li>
                            <li className="basis-[15%]">8 Aug 2025</li>
                            <li className="basis-[14%]">Life-time access</li>
                        </ul>
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">1</li>
                            <li className="basis-[21%]">Khant Yadanar Moe</li>
                            <li className="basis-[35%] font-medium">
                                Full-stack Web Development Pathway
                            </li>
                            <li className="basis-[11%]">KBZ Pay</li>
                            <li className="basis-[15%]">8 Aug 2025</li>
                            <li className="basis-[14%]">Life-time access</li>
                        </ul>
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">1</li>
                            <li className="basis-[21%]">Khant Yadanar Moe</li>
                            <li className="basis-[35%] font-medium">
                                Full-stack Web Development Pathway
                            </li>
                            <li className="basis-[11%]">KBZ Pay</li>
                            <li className="basis-[15%]">8 Aug 2025</li>
                            <li className="basis-[14%]">Life-time access</li>
                        </ul>
                        <ul className="flex items-center px-3 py-4 border-b border-b-gray-300 my-2">
                            <li className="basis-[4%]">1</li>
                            <li className="basis-[21%]">Khant Yadanar Moe</li>
                            <li className="basis-[35%] font-medium">
                                Full-stack Web Development Pathway
                            </li>
                            <li className="basis-[11%]">KBZ Pay</li>
                            <li className="basis-[15%]">8 Aug 2025</li>
                            <li className="basis-[14%]">Life-time access</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
