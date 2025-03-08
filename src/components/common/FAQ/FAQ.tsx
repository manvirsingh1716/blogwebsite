import React from "react";
import FAQItem from "./FAQItem";

// Define the type for FAQ items
interface FAQData {
  question: string;
  answer: string | React.ReactNode; // Allows JSX or plain text
  number?: number;
}

// FAQ data with proper typing
const faqData: FAQData[] = [
  {
    question: "What is the 99Notes self-study ecosystem?",
    answer: (
      <div className="space-y-4">
        <p>
          The 99Notes self-study ecosystem is a comprehensive learning platform designed 
          specifically for UPSC aspirants. It combines:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>High-quality study materials and notes</li>
          <li>Daily current affairs updates</li>
          <li>Practice questions and mock tests</li>
          <li>Answer writing modules</li>
          <li>Personalized progress tracking</li>
          <li>Interactive learning tools</li>
        </ul>
      </div>
    ),
    number: 1
  },
  {
    question: "What makes 99Notes different from other platforms?",
    answer: (
      <div className="space-y-4">
        <p>99Notes stands out through its unique approach to UPSC preparation:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Affordable pricing making quality education accessible to all</li>
          <li>Comprehensive coverage of the entire UPSC syllabus</li>
          <li>Regular updates to study material and current affairs</li>
          <li>Experienced faculty providing expert guidance</li>
          <li>Focus on conceptual understanding rather than rote learning</li>
          <li>Integrated approach combining theory with practical application</li>
        </ul>
      </div>
    )
  },
  {
    question: "What types of resources are available on 99Notes?",
    answer: (
      <div className="space-y-4">
        <p>99Notes offers a wide range of resources including:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Comprehensive study materials for all UPSC subjects</li>
          <li>Daily current affairs updates and analysis</li>
          <li>Previous years&apos; question papers with solutions</li>
          <li>Mock tests and practice questions</li>
          <li>Answer writing modules with expert feedback</li>
          <li>Video lectures and concept explanations</li>
          <li>Toppers&apos; strategies and success stories</li>
        </ul>
      </div>
    )
  },
  {
    question: "How do I access the 99Notes resources?",
    answer: "You can access all resources through the 99Notes website. Simply browse or sign up to start exploring everything the platform offers. Our user-friendly interface makes it easy to navigate through different sections and find the content you need."
  },
  {
    question: "Are the resources updated regularly?",
    answer: "Yes, we maintain a rigorous updating schedule. Our team of experts continuously reviews and updates the study materials, adds daily current affairs, and incorporates the latest exam patterns and trends. This ensures that you always have access to the most relevant and up-to-date content for your UPSC preparation."
  },
  {
    question: "Is 99Notes beginner-friendly?",
    answer: "Definitely! Whether you're starting fresh or looking to deepen your understanding, the platform provides structured content and intuitive tools to support learners at every level. We offer basic concept explanations, step-by-step learning paths, and progressive difficulty levels to ensure a smooth learning experience."
  },
  {
    question: "Can I track my progress on the platform?",
    answer: "Yes. With features like daily quizzes, answer writing practice, and progress tracking tools, you can monitor your improvement and identify areas that need more focus. Our analytics help you understand your strengths and weaknesses, allowing for more effective preparation."
  },
  {
    question: "Is 99Notes affordable for students?",
    answer: "Yes! We believe quality education should be accessible to all. Our pricing is designed to be student-friendly while providing maximum value. We offer various subscription plans to suit different needs and budgets, making UPSC preparation affordable without compromising on quality."
  }
];

const FAQ: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-orange-500 font-medium">99NOTES</span>
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          FAQ&apos;s Related to Best IAS Coaching in Delhi
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} number={faq.number} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
