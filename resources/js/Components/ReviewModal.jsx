import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
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

export default function ReviewModal({ open, onClose, course }) {
    const [rating, setRating] = useState(0);
    const [form, setForm] = useState({ name: "", phone: "", review: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("rating", rating);
        formData.append("name", form.name);
        formData.append("course_id", course?.id);
        formData.append("review", form.review);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const res = await axios.post("/api/review", formData, {
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.message === "Review sent successfully.") {
                setForm({ name: "", phone: "", review: "" });
                setRating(0);
                onClose(); // close the modal after submission
                navigate("/");
            }
        } catch (error) {
            console.error("Error sending review:", error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
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
                        <input
                            type="text"
                            value={course?.title || ""}
                            disabled
                            className="mt-1 border-gray-400 w-96 px-2 py-1 rounded-md bg-gray-100 text-gray-700"
                        />
                    </div>

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
