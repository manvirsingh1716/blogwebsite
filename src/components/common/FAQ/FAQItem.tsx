import React, { useState } from 'react';

// Define types for the props
interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode; // Can be either string or JSX content
  number?: number; // Optional number
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full py-4 px-6 flex items-center justify-between text-left hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          {number !== undefined && (
            <span className="text-orange-500 font-semibold">
              {number}.
            </span>
          )}
          <span className="text-lg font-medium text-gray-900">{question}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 pt-0 text-gray-600">
          {typeof answer === 'string' ? <p>{answer}</p> : answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
