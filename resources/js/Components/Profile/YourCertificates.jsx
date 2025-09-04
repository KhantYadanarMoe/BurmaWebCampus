import React from "react";
import Certi from "../../../assets/Certificate.jpg";

export default function YourCertificates() {
    return (
        <div className="px-5 md:px-6 lg:px-10 py-8 md:w-[97%] mx-auto ">
            <h1 className="text-2xl font-medium mb-6">Your Certificates</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
                <div className="mx-auto">
                    <img
                        src={Certi}
                        alt=""
                        className="w-full p-1 border border-gray-700"
                    />
                </div>
            </div>
        </div>
    );
}
