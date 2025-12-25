import React, { useEffect, useState } from "react";
import axios from "axios";
import Empty from "../../../assets/Empty.png";

export default function YourCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCertificates = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/api/certificates"); // authenticated user
            setCertificates(res.data);
        } catch (err) {
            console.error("Error fetching certificates:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const SkeletonCard = () => (
        <div className="mx-auto w-full">
            <div className="w-full h-[64vh] bg-gray-300 animate-pulse rounded-md p-1" />
        </div>
    );

    return (
        <div className="px-5 md:px-6 lg:px-10 py-8 md:w-[97%] mx-auto ">
            <h1 className="text-2xl font-medium mb-6">Your Certificates</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <SkeletonCard key={idx} />
                    ))
                ) : certificates.length > 0 ? (
                    certificates.map((certificate) => (
                        <div className="mx-auto">
                            <img
                                src={
                                    certificate.image_path
                                        ? `/storage/${certificate.image_path}`
                                        : ""
                                }
                                alt={`Certificate for ${certificate.course?.title}`}
                                className="w-full p-1"
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center p-10 border border-gray-300 rounded-lg bg-gray-50 mt-2">
                        <img
                            src={Empty}
                            alt="No certificates"
                            className="w-32 h-32 mb-4 object-contain"
                        />
                        <h2 className="text-xl font-semibold mb-2">
                            No Certificates Found
                        </h2>
                        <p className="text-gray-500 text-center">
                            You haven't finished any courses.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
