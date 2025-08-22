import React from "react";
import CertiImg from "../../../assets/Certificate.jpg";

export default function Certificate() {
    return (
        <div className="px-5 lg:px-8 py-10">
            <hr className="border-t-gray-500" />
            <div className="py-20 md:py-24 flex justify-center items-center text-center md:text-start md:items-start">
                <q className="font-playfair text-2xl md:text-4xl text-black font-medium italic leading-[50px] max-w-2xl">
                    Complete our courses & Earn a{" "}
                    <span className="text-red-600">certificate</span> that opens
                    doors to new opportunities.
                </q>

                <img
                    src={CertiImg}
                    alt=""
                    className="hidden md:block mt-7 h-52 ml-0 md:-ml-44 lg:-ml-36 border border-gray-800 -z-50 rotate-[13deg]"
                />
            </div>
            <hr className="flex md:hidden border-t-gray-600" />
        </div>
    );
}
