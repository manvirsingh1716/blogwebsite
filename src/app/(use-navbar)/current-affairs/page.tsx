import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { navigationSections } from '@/config/currentAffairs';
import ContactForm from '@/components/ui/ContactForm';
import ContactMap from '@/components/ui/ContactMap';

const CurrentAffairsIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-96">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">UPSC Current Affairs</h1>
            <p className="text-xl opacity-90 mb-8">
              Stay updated with comprehensive coverage of current affairs for UPSC Civil Services Examination.
              Daily updates, in-depth analysis, and exam-oriented approach.
            </p>
            <Link 
              href="/current-affairs/daily/news-analysis"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Start Reading →
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Categories */}
        {navigationSections?.map((section, index) => (
          <div key={index} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, itemIndex) => (
                <Link key={itemIndex} href={item.path} className="group">
                  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">
                        {typeof item.icon === 'object' && item.icon && 'image' in item.icon ? (
                          <img src={item.icon.image.src} alt={item.title} width={24} height={24} />
                        ) : (
                          item.icon
                        )}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      {getItemDescription(item.title)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
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
