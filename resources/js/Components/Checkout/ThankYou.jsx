import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function ThankYou() {
    return (
        <div className="flex items-center h-[70vh] justify-center px-4">
            <div className="w-full max-w-md p-6 text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="w-14 h-14 text-green-600" />
                </div>

                <h1 className="text-2xl font-semibold mb-2">
                    Thank You for Your Purchase!
                </h1>

                <p className="text-gray-600 text-sm mb-6">
                    Your had enrolled successfully. You can now go to your
                    courses page and start learning.
                </p>

                <div className="flex gap-2 w-full items-center justify-center">
                    <Link to="/user/courses">
                        <Button className="w-full">Go to My Courses</Button>
                    </Link>

                    <Link to="/">
                        <Button
                            variant="outline"
                            className="w-full border-gray-500"
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
