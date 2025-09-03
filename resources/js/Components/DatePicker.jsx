import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { Button } from "@/Components/ui/button";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function DatePicker({ selectedDate, onDateChange }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full border-b justify-start text-gray-600 border-gray-500 mt-1"
                >
                    {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onDateChange} // Controlled by parent
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
