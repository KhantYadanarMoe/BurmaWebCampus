import React from "react";
import Story1 from "../../../assets/Story1.jpg";
import Story2 from "../../../assets/Story2.jpg";
import Story3 from "../../../assets/Story3.jpg";

export default function Story() {
    return (
        <div className="px-5 lg:px-8 py-6 lg:w-[95%] mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-semibold mb-1 relative inline-block">
                    Our Story
                </h2>
                <div className="flex justify-center ml-16">
                    <div className="w-20 h-[1px] bg-black"></div>
                    {/* <div className="w-1 h-1 bg-black rounded-full ml-2"></div> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 py-4 md:py-12">
                <div className="md:w-1/2">
                    <p className="text-gray-800 text-sm lg:text-base">
                        BurmaWebCampus started with a vision: to give students
                        in Myanmar an easier way to learn web development and
                        grow practical digital skills. Many learners struggle
                        with complex resources or lack guidance, so we built a
                        platform that combines clear lessons with personal
                        mentorship. <br />
                        Here, every student is supported by a dedicated mentor
                        who provides direction, feedback, and encouragement. Our
                        focus is on real-world learning—helping students create
                        projects, gain confidence, and prepare for new
                        opportunities. <br />
                        As our community grows, our story continues with every
                        student who joins, learns, and takes their first step
                        into the world of web development.
                    </p>
                </div>
                <div className="md:w-1/2 mt-3 md:mt-0">
                    <div className="flex gap-2 items-center justify-center">
                        <img
                            src={Story1}
                            alt=""
                            className="w-1/3 h-72 object-cover rounded-3xl"
                        />
                        <img
                            src={Story2}
                            alt=""
                            className="w-1/3  h-80 object-cover rounded-3xl"
                        />
                        <img
                            src={Story3}
                            alt=""
                            className="w-1/3 h-72 object-cover rounded-3xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
