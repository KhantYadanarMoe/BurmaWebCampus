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

export default function ReviewModal() {
    const [rating, setRating] = useState(0);

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
                        <Input id="name" placeholder="Your name" />
                    </div>

                    {/* Review Text */}
                    <div className="space-y-1">
                        <Label htmlFor="review">Review</Label>
                        <Textarea
                            id="review"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit">Submit Review</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
