import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import Rating from "react-rating";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ReviewModal() {
    const [rating, setRating] = useState(0);

    const [form, setForm] = useState({
        name: "",
        phone: "",
        review: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCustomChange = (name, value) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = async (e) => {
        e.preventDefault();

        let url = "/api/review";
        let method = "post";

        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        formData.append("rating", rating);
        formData.append("name", form.name);
        formData.append("course_id", form.course_id);
        formData.append("review", form.review);

        console.log("Form data after appending:", formData);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            for (let pair of formData.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            const res = await axios[method](url, formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.message === "Review sent successfully.") {
                navigate("/");
                setForm({
                    name: "",
                    phone: "",
                    review: "",
                });
                setRating(0);
            }
        } catch (error) {
            console.error("Error sending review:", error);

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Leave a Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                        <Rating
                            initialRating={rating}
                            onChange={(rate) => setRating(rate)}
                            fractions={10}
                            emptySymbol={
                                <Star className="text-gray-300" size={25} />
                            }
                            fullSymbol={
                                <Star
                                    className="text-yellow-500 fill-yellow-500"
                                    size={25}
                                />
                            }
                        />
                    </div>

                    {/* Name Input */}
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="course">Course</Label>
                        <Select
                            onValueChange={(value) =>
                                handleCustomChange(
                                    "course_id",
                                    parseInt(value, 10)
                                )
                            }
                        >
                            <SelectTrigger className="mt-1 border-gray-400 w-96">
                                <SelectValue placeholder="Select Course Category" />
                            </SelectTrigger>

                            <SelectContent className="w-96 max-h-60">
                                <SelectItem value="1">
                                    HTML & CSS Fundamentals
                                </SelectItem>
                                <SelectItem value="2">
                                    JavaScript & DOM Manipulation
                                </SelectItem>
                                <SelectItem value="3">
                                    React.js & Next.js Development
                                </SelectItem>
                                <SelectItem value="4">
                                    Backend with Node.js & Express
                                </SelectItem>
                                <SelectItem value="5">
                                    Database Design (MongoDB / SQL)
                                </SelectItem>
                                <SelectItem value="6">
                                    Full Stack Web Development
                                </SelectItem>
                                <SelectItem value="7">
                                    API Integration & RESTful Services
                                </SelectItem>
                                <SelectItem value="8">
                                    UI/UX for Web Developers
                                </SelectItem>
                                <SelectItem value="9">
                                    Tailwind CSS & Responsive Design
                                </SelectItem>
                                <SelectItem value="10">
                                    Deployment & DevOps Basics
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-1">
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                            id="review"
                            name="review"
                            value={form.review}
                            onChange={handleInputChange}
                            type="text"
                            className="border-gray-400 mt-1"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" onClick={submit}>
                            Submit Review
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
