import React from "react";
import Frame from "../../../assets/Frame.png";

export default function Mission() {
    return (
        <div className="px-5 lg:px-8 py-10 md:w-[90%] lg:w-[80%] mx-auto">
            <div className="py-20 text-center">
                <q className="italic leading-[40px] md:leading-[50px] max-w-2xl text-xl md:text-3xl font-medium text-center">
                    We don’t just teach how to develop websites — we mentor
                    students to build skills, projects, and futures.
                </q>

                <div className="hidden md:flex justify-end items-end">
                    <img
                        src={Frame}
                        alt=""
                        className="w-40 -mt-5 -mr-10 lg:-mr-16"
                    />
                </div>
            </div>
        </div>
    );
}
