import React from 'react';
import ContactForm from '../common/ContactForm/ContactForm';
import AccordionItem from '../Accordion/AccordionItem';

const CoachingInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            BEST UPSC COACHING INSTITUTE IN DELHI
          </h2>
          <p className="text-lg text-gray-600">
            With Affordable Course Fees & Finest Quality UPSC Notes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Accordion */}
          <div className="space-y-2">
            <AccordionItem title="About 99notes IAS Institute">
              <div className="text-gray-600 space-y-4">
                <p>
                  99notes IAS Institute is one of the leading UPSC coaching institutes in Delhi, 
                  dedicated to providing quality education at affordable prices. Our institute 
                  focuses on a comprehensive approach to UPSC preparation.
                </p>
                <p>
                  We believe in making quality education accessible to all aspirants, 
                  regardless of their financial background. Our team of experienced 
                  faculty members ensures that every student receives personalized attention 
                  and guidance throughout their preparation journey.
                </p>
              </div>
            </AccordionItem>

            <AccordionItem title="Best IAS Coaching in Delhi (Our Vision & Mission)">
              <div className="text-gray-600 space-y-4">
                <p>
                  Our vision is to become the most trusted name in UPSC preparation by 
                  providing high-quality education and comprehensive study materials at 
                  affordable prices.
                </p>
                <h4 className="font-semibold text-gray-800 mt-4">Our Mission:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Make quality UPSC coaching accessible to all</li>
                  <li>Provide comprehensive study materials and notes</li>
                  <li>Offer personalized guidance to every aspirant</li>
                  <li>Maintain high success rate in UPSC examinations</li>
                  <li>Create a supportive learning environment</li>
                </ul>
              </div>
            </AccordionItem>

            <AccordionItem title="Why Choose 99notes for UPSC Preparation?">
              <div className="text-gray-600 space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Experienced faculty with proven track record</li>
                  <li>Comprehensive study materials and notes</li>
                  <li>Regular mock tests and evaluations</li>
                  <li>Affordable fee structure</li>
                  <li>Personal mentoring and guidance</li>
                  <li>Updated study material and current affairs</li>
                  <li>Focus on conceptual learning</li>
                  <li>Strategic approach to UPSC preparation</li>
                </ul>
              </div>
            </AccordionItem>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingInfo; 