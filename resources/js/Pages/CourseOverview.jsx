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
        const loadCourse = async () => {
            try {
                console.log("Fetching all courses...");
                const res = await axios.get("/api/courses");
                const courses = res.data.courses;
                console.log("Courses fetched:", courses);

                const slugify = (t) =>
                    t
                        ?.toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "");

                const found = courses.find((c) => slugify(c.title) === slug);
                console.log("Course found by slug:", found);

                if (!found) {
                    console.warn("No course matched the slug:", slug);
                    setLoading(false);
                    return;
                }

                console.log(`Fetching details for course ID: ${found.id}`);
                const detailRes = await axios.get(`/api/course/${found.id}`);
                console.log("Fetching details for course ID:", found.id);

                setCourse(detailRes.data.course);
            } catch (err) {
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        loadCourse();
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
