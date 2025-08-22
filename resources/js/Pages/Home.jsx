import Blogs from "@/Components/Home/Blogs";
import Certificate from "@/Components/Home/Certificate";
import Courses from "@/Components/Home/Courses";
import FAQs from "@/Components/Home/FAQs";
import Hero from "@/Components/Home/Hero";
import Reviews from "@/Components/Home/Reviews";
import React from "react";

export default function Home() {
    return (
        <>
            <Hero />
            <Certificate />
            <Courses />
            <Reviews />
            <Blogs />
            <FAQs />
        </>
    );
}
