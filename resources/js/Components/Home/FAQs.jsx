import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { MessageCircleQuestionMark } from "lucide-react";

export default function FAQs() {
    return (
        <div className="mx-auto py-12">
            <h1 className="text-xl md:text-3xl font-medium flex items-center gap-2 md:gap-3 justify-center">
                Frequently Asked Questions{" "}
                <MessageCircleQuestionMark className="w-5 h-5 md:w-8 md:h-8" />
            </h1>
            <div className="pt-6 md:pt-12 pl-5 md:pl-0">
                <Accordion
                    type="single"
                    collapsible
                    className="md:flex items-center justify-center flex-wrap gap-3 w-full"
                >
                    <AccordionItem
                        value="item-1"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            Do I need prior coding experience to start learning
                            web development here?
                        </AccordionTrigger>
                        <AccordionContent>
                            Not at all! Our courses are designed for complete
                            beginners as well as those with some experience. We
                            start with the basics of HTML, CSS, and JavaScript,
                            then gradually move to more advanced topics.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                        value="item-2"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            What programming languages will I learn?
                        </AccordionTrigger>
                        <AccordionContent>
                            You’ll begin with HTML, CSS, and JavaScript—the core
                            building blocks of the web. As you progress, you’ll
                            explore frameworks like React, backend technologies
                            such as PHP or Node.js, and even databases to build
                            full-stack applications.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                        value="item-3"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            How long does it take to become a web developer?
                        </AccordionTrigger>
                        <AccordionContent>
                            It depends on your learning pace and commitment. On
                            average:
                            <ul className="list-disc pl-5 mt-3 space-y-2">
                                <li>
                                    3–6 months for the basics (HTML, CSS, JS)
                                </li>
                                <li>
                                    6–12 months to be job-ready with frontend or
                                    backend skills
                                </li>
                                <li>
                                    {" "}
                                    12–18 months for full-stack proficiency
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                        value="item-4"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            Will I build real projects while learning?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes! Every module includes hands-on projects so you
                            can apply what you learn—such as building personal
                            portfolios, blogs, e-commerce sites, and interactive
                            web apps.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                        value="item-5"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            Do you provide certificates after completion?
                        </AccordionTrigger>
                        <AccordionContent>
                            Yes, you’ll receive a certificate of completion for
                            each course. This can be added to your LinkedIn
                            profile or resume to showcase your skills to
                            potential employers.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                        value="item-6"
                        className="w-[93%] md:w-[45%] md:mx-3 lg:w-[40%] lg:mx-5"
                    >
                        <AccordionTrigger>
                            Can I learn at my own pace?
                        </AccordionTrigger>
                        <AccordionContent>
                            Absolutely. All lessons are available on-demand, so
                            you can learn whenever it suits your schedule.
                            You’ll also have lifetime access to the materials
                            for review and updates.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
