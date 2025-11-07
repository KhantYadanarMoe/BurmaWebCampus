import React from "react";
import Pf from "../../../assets/Profile.jpg";
import { useAuth } from "@/contexts/AuthContext";

export default function UserInfo() {
    const { user, setUser } = useAuth();
    return (
        <div className="px-5 md:px-10 lg:px-12">
            <div className="pt-9 pb-12 flex gap-3 items-center">
                <img
                    src={user?.image ? `/storage/${user.image}` : Pf}
                    alt=""
                    className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-full border p-1 border-gray-700"
                />
                <div>
                    <h1 className="text-xl md:text-2xl font-medium">
                        Khant Yadanar Moe
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        ID: {user?.student_id}
                    </p>
                </div>
            </div>
            <hr className="border-t-gray-300" />
        </div>
    );
}
