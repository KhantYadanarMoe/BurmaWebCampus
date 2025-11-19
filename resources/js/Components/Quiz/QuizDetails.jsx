import { ChevronsRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";

export default function QuizDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const [answeredQuizzes, setAnsweredQuizzes] = useState({});

    useEffect(() => {
        const getDetails = async () => {
            try {
                const res = await axios.get(`/api/course/${id}`);
                setCourse(res.data.course);
            } catch (err) {
                console.error("Error fetching course:", err);
            } finally {
                setLoading(false);
            }
        };

        getDetails();
    }, [id]);

    const handleAnswer = (quizId) => {
        setAnsweredQuizzes((prev) => ({ ...prev, [quizId]: true }));
    };

    return (
        <div className="md:flex gap-3 px-5 lg:px-8">
            <div className="md:w-2/3">
                <div className="flex gap-1 items-end text-gray-800 my-3 text-sm md:text-base">
                    <Link to={`/course/${course?.id}/details`}>
                        {course?.title}
                    </Link>
                    <ChevronsRight size={18} />
                    <Link className="text-black">Final Quiz</Link>
                </div>
                <h1 className="text-2xl font-medium my-5">Final Quiz</h1>
                {course?.quizzes?.length > 0 ? (
                    course.quizzes.map((quiz, index) => (
                        <Card
                            key={quiz.id}
                            className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3"
                        >
                            <CardContent className="p-4">
                                <h1 className="font-medium">
                                    Question {index + 1}
                                </h1>
                                <hr className="my-3 border-t-gray-400" />
                                <h1 className="text-sm md:text-base">
                                    {quiz.question}
                                </h1>

                                <div className="mt-5 text-sm md:text-base">
                                    {quiz.options.map((option) => (
                                        <div
                                            key={option.id}
                                            className="flex gap-2 items-center my-3"
                                        >
                                            <input
                                                type="radio"
                                                name={`quiz-${quiz.id}`}
                                                value={option.option_text}
                                                className="w-4 h-4 accent-black"
                                                onChange={() =>
                                                    handleAnswer(quiz.id)
                                                }
                                            />
                                            <p>{option.option_text}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-gray-500 mt-2">No quizzes available.</p>
                )}
                <div className="flex justify-end items-end mb-3">
                    <Button>Submit</Button>
                </div>
            </div>
            <div className="hidden md:block md:w-1/3 md:sticky md:top-24 md:self-start">
                <h1 className="text-lg font-medium my-3 pl-3">Navigation</h1>
                <div className="overflow-y-auto custom-scrollbar max-h-[80vh] px-3">
                    {course?.quizzes.map((quiz, index) => (
                        <Link key={quiz.id} to={`/quiz/${quiz.id}`}>
                            <Card className="relative bg-white border border-gray-600 shadow-lg rounded-lg my-3 hover:shadow-xl transition">
                                <CardContent className="p-3">
                                    <div className="flex gap-2 items-center justify-between">
                                        <p>Question {index + 1}</p>

                                        {/* Example: show Done/Not Done dynamically */}
                                        <span
                                            className={`px-2 py-1 text-sm border shadow-sm rounded-md ${
                                                answeredQuizzes[quiz.id]
                                                    ? "bg-green-50 text-green-600 border-green-200"
                                                    : "bg-gray-50 text-gray-500 border-gray-200"
                                            }`}
                                        >
                                            {answeredQuizzes[quiz.id]
                                                ? "Done"
                                                : "Pending"}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
