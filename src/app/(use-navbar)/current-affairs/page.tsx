import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { navigationSections } from '@/config/currentAffairs';
import ContactForm from '@/components/ui/ContactForm';
import ContactMap from '@/components/ui/ContactMap';

const CurrentAffairsIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
        {/* Main Categories */}
        {navigationSections?.map((section, index) => (
          <div key={index} className="mb-12 sm:mb-16">
            <div className="flex flex-col items-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <div className="w-20 sm:w-24 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* changed gap from 6 to 8 */}
              {section.items.map((item, itemIndex) => (
                <Link key={itemIndex} href={item.path} className="group">
                  <div className="bg-gray-100 rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300 h-[450px] flex flex-col justify-between transform hover:-translate-y-1 border border-gray-100"> {/* changed bg-white to bg-gray-50, added border, changed shadow-sm to shadow-md */}
                    <div>
                      <div className="flex flex-col items-center mb-8">
                        <span className="mb-6 text-yellow-500 group-hover:text-yellow-600 transition-colors">
                          {typeof item.icon === 'object' && item.icon && 'image' in item.icon ? (
                            <img src={item.icon.image.src} alt={item.title} width={50} height={50} className="text-yellow-500" />
                          ) : (
                            item.icon
                          )}
                        </span>
                        <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors text-center">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {getItemDescription(item.title)}
                      </p>
                    </div>
                    <div className="text-yellow-500 group-hover:text-yellow-600 font-medium flex items-center text-lg transition-colors">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-between px-4 sm:px-6">
        <ContactForm />
        <ContactMap />
      </div>
    </div>
  );
};

// Helper function to get description based on item title
const getItemDescription = (title: string): string => {
  const descriptions: { [key: string]: string } = {
    'Daily News Analysis': 'Comprehensive analysis of important current events with UPSC perspective',
    'The Hindu Editorial': 'In-depth analysis of The Hindu newspaper editorials',
    'Indian Express Editorial': 'Analysis of Indian Express editorials with UPSC relevance',
    'PIB Analysis': 'Coverage of important government announcements and initiatives',
    'Daily MCQ Quiz': 'Practice questions based on current affairs',
    'Answer Writing Practice': 'Daily answer writing questions for Mains preparation',
    'Monthly Compilation': 'Monthly digest of important current affairs',
    'Yojana Magazine': 'Analysis of Yojana magazine for UPSC preparation',
    'Kurukshetra Magazine': 'Coverage of Kurukshetra magazine with rural focus',
    'Science Reporter': 'Important science and technology updates',
    'Union Budget': 'Comprehensive analysis of Union Budget',
    'Economic Survey': 'Key insights from Economic Survey',
    'Year End Review': 'Annual compilation of important events'
  };

  return descriptions[title] || 'Stay updated with comprehensive coverage';
};

export default CurrentAffairsIndex;