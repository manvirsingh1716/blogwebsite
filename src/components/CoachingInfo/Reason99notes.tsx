import React from 'react';

const Reason99notes: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="relative inline-block">
          <span className="text-slate-900 font-medium tracking-wider text-sm uppercase mb-4">Reason</span>
            <h2 className="text-4xl font-bold text-gray-900 pt-2 mb-4">
                Why 99Notes is the Best UPSC Coaching in Delhi
            </h2>
            <div className="w-24 h-1 bg-slate-900 mx-auto mt-2"></div>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover why thousands of UPSC aspirants choose us as their preferred coaching institute
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Experienced Faculty",
              content: "Our team of seasoned professionals has a deep understanding of the UPSC syllabus and examination pattern. We are committed to equipping students with the right strategies and techniques to ace the IAS exam.",
              icon: "👨‍🏫"
            },
            {
              title: "Comprehensive Study Material",
              content: "Our study material is meticulously curated and regularly updated to include the latest developments and trends, ensuring our students are always ahead of the curve.",
              icon: "📚"
            },
            {
              title: "Regular Mock Tests",
              content: "Our IAS coaching program includes regular mock tests that mimic the UPSC exam pattern, providing students with a realistic experience of the exam.",
              icon: "✍️"
            },
            {
              title: "Personalized Guidance",
              content: "We understand that every student is unique. Our faculty provides personalized guidance to each student, helping them overcome their weaknesses and build on their strengths.",
              icon: "🎯"
            },
            {
              title: "Affordable Education",
              content: "We believe in making quality education accessible to all. Our IAS coaching program is competitively priced, ensuring that every aspiring IAS officer can benefit from our top-quality coaching.",
              icon: "💰"
            },
            {
              title: "Proven Track Record",
              content: "Join the leading UPSC coaching institute in Delhi with a consistent record of producing successful candidates. Our results speak for themselves.",
              icon: "🏆"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6 bg-blue-50 rounded-lg">
                <span className="text-4xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="bg-gradient-to-r from-gray-100 to-indigo-50 p-10 rounded-3xl shadow-inner">
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
              Choosing the right UPSC coaching in Delhi is crucial for your IAS journey. 
              <span className="font-semibold text-blue-800"> At 99Notes</span>, we are committed to providing the best IAS coaching experience, 
              helping you navigate your path with confidence and ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason99notes;
