import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import KBZ from "../../../assets/KBZPay.jpg";
import Wave from "../../../assets/WavePay.jpg";
import AYA from "../../../assets/AYAPay.jpg";
import UAB from "../../../assets/UABPay.jpg";
import CB from "../../../assets/CBPay.jpg";
import Course from "../../../assets/Courses.jpg";
import Logo from "../../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

export default function CheckoutForm() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedCourses =
            JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        setCourses(storedCourses);

        const existingInvoice = localStorage.getItem("invoiceNumber");
        if (existingInvoice) {
            setInvoiceNumber(existingInvoice);
        } else {
            const newInvoice =
                "INV-" + Math.floor(100000 + Math.random() * 900000).toString();
            localStorage.setItem("invoiceNumber", newInvoice);
            setInvoiceNumber(newInvoice);
        }
    }, []);

    const totalPrice = courses.reduce(
        (sum, course) => sum + Number(course.price || 0),
        0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
    };

    const submit = async (e) => {
        e.preventDefault();

        let url = "/api/course/purchase/create";
        let method = "post";

        if (!paymentMethod) {
            setShowPaymentDialog(true);
            return;
        }

        let formData = new FormData();

        console.log("Form Data before submitting:", form);

        formData.append("invoice_no", invoiceNumber);
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("payment_method", paymentMethod);
        formData.append("total_price", totalPrice);

        if (courses.length > 0) {
            formData.append("course_id", courses[0].id);
        }

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

            if (res.data.message === "Course purchased successfully.") {
                localStorage.removeItem("enrolledCourses");
                localStorage.removeItem("invoiceNumber");
                navigate("/");
            }
        } catch (error) {
            console.error("Error while purchasing:", error);

            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <div className="px-5 lg:px-8 pb-6">
            <div className="flex flex-col md:flex-row gap-3">
                <div className="md:w-1/2 lg:w-2/5">
                    <Card className="px-4 py-4 border-gray-600 rounded-none ">
                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between">
                                <img src={Logo} alt="" className="h-6" />
                                <h1 className="text-lg font-medium">Invoice</h1>
                            </div>

                            <div className="flex flex-col items-end justify-end py-4">
                                <p className="text-sm text-gray-600">
                                    Invoice No. {invoiceNumber}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {new Date().toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            {/* Course Details */}
                            <div className="my-5">
                                {courses.length === 0 ? (
                                    <p className="text-gray-600 text-sm">
                                        No course selected. Please go back and
                                        enroll.
                                    </p>
                                ) : (
                                    courses.map((course) => (
                                        <div key={course.id} className="my-5">
                                            <div className="flex gap-2 items-center my-4">
                                                <img
                                                    src={`/storage/${course.image}`}
                                                    alt={course.title}
                                                    className="w-10 h-10 object-cover rounded-md"
                                                />
                                                <h1 className="font-medium">
                                                    {course.title}
                                                </h1>
                                            </div>
                                            <hr className="border-t-gray-500 border-dashed" />
                                            <div className="flex items-center justify-between my-3">
                                                <h1 className="font-medium">
                                                    Price -
                                                </h1>
                                                <h1 className="text-gray-700">
                                                    {course.price} MMK
                                                </h1>
                                            </div>
                                            <div className="flex items-center justify-between my-3">
                                                <h1 className="font-medium">
                                                    Discount -
                                                </h1>
                                                <h1 className="text-gray-700">
                                                    0 MMK
                                                </h1>
                                            </div>
                                            <div className="flex items-center justify-between my-3">
                                                <h1 className="font-medium">
                                                    Pay with -
                                                </h1>
                                                <h1 className="text-gray-700">
                                                    {paymentMethod ||
                                                        "Select a payment"}
                                                </h1>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        {courses.length > 0 && (
                            <div className="mt-40 md:mt-52 lg:mt-40">
                                <hr className="border-t border-dashed border-gray-500" />
                                <div className="flex items-center justify-between my-3">
                                    <h1 className="font-medium">Total -</h1>
                                    <h1 className="text-gray-700">
                                        {totalPrice} MMK
                                    </h1>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
                <div className="md:w-1/2 lg:w-3/5">
                    {courses.map((course) => (
                        <Card className="px-2 py-2 border-none">
                            <h1 className="text-lg pb-2">
                                Complete your purchase for{" "}
                            </h1>
                            <div className="flex items-center gap-2 mb-6">
                                <img
                                    src={`/storage/${course.image}`}
                                    alt=""
                                    className="w-10 h-10 object-cover rounded-md"
                                />
                                <h1 className="text-lg font-medium">
                                    {course.title}
                                </h1>
                            </div>
                            <form action="">
                                <div className="my-2">
                                    <Label>Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={handleInputChange}
                                        className="mt-1 border-gray-400"
                                    />
                                </div>
                                <div className="lg:flex gap-2">
                                    <div className="my-2 lg:w-1/2">
                                        <Label>Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleInputChange}
                                            className="mt-1 border-gray-400"
                                        />
                                    </div>
                                    <div className="my-2 lg:w-1/2">
                                        <Label>Phone (Optional)</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleInputChange}
                                            className="mt-1 border-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="my-5">
                                    <h1 className="text-lg font-medium mb-2">
                                        Payment Method
                                    </h1>
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            className="border hover:border-gray-700 p-1 rounded-md duration-300"
                                            onClick={() =>
                                                handlePaymentSelect("KBZ Pay")
                                            }
                                        >
                                            <img
                                                src={KBZ}
                                                alt="Kpay"
                                                className="w-10 rounded-md"
                                            />
                                        </Link>
                                        <Link
                                            className="border hover:border-gray-700 p-1 rounded-md duration-300"
                                            onClick={() =>
                                                handlePaymentSelect("Wave Pay")
                                            }
                                        >
                                            <img
                                                src={Wave}
                                                alt="Wave"
                                                className="w-10 rounded-md"
                                            />
                                        </Link>
                                        <Link
                                            className="border hover:border-gray-700 p-1 rounded-md duration-300"
                                            onClick={() =>
                                                handlePaymentSelect("AYA Pay")
                                            }
                                        >
                                            <img
                                                src={AYA}
                                                alt="AYA"
                                                className="w-10 rounded-md"
                                            />
                                        </Link>
                                        <Link
                                            className="border hover:border-gray-700 p-1 rounded-md duration-300"
                                            onClick={() =>
                                                handlePaymentSelect("UAB Pay")
                                            }
                                        >
                                            <img
                                                src={UAB}
                                                alt="UAB"
                                                className="w-10 rounded-md"
                                            />
                                        </Link>
                                        <Link
                                            className="border hover:border-gray-700 p-1 rounded-md duration-300"
                                            onClick={() =>
                                                handlePaymentSelect("CB Pay")
                                            }
                                        >
                                            <img
                                                src={CB}
                                                alt="CB"
                                                className="w-10 rounded-md"
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <Button
                                    onClick={submit}
                                    className="mt-2 w-full"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Card>
                    ))}
                </div>
            </div>
            <AlertDialog
                open={showPaymentDialog}
                onOpenChange={setShowPaymentDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Payment Method Required
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Please select a payment method to continue with your
                            purchase.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button onClick={() => setShowPaymentDialog(false)}>
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
