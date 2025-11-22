import Hero from "@/Components/Overview/Hero";
import Overview from "@/Components/Overview/Overview";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseOverview() {
    const { slug } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`/api/course/${slug}`);
                setCourse(res.data.course);
            } catch (err) {
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        getDetails();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!course) return <p>Course not found.</p>;

    return (
        <div>
            <Hero course={course} />
            <Overview course={course} />
        </div>
    );
}
