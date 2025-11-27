import React, { useEffect, useState } from "react";
import Certi from "../../../assets/Certificate.jpg";
import axios from "axios";

export default function YourCertificates() {
    const [certificates, setCertificates] = useState([]);

    const fetchCertificates = async () => {
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

    if (certificates.length === 0)
        return <p>You don't have any certificates yet.</p>;

    return (
        <div className="px-5 md:px-6 lg:px-10 py-8 md:w-[97%] mx-auto ">
            <h1 className="text-2xl font-medium mb-6">Your Certificates</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certificates.map((certificate) => (
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
                ))}
            </div>
        </div>
    );
}
