"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import newsImage from '../../../public/news.png';

interface NavItem {
  title: string;
  path: string;
  icon?: string | { image: StaticImageData };
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigationSections: NavSection[] = [
  {
    title: "Daily Current Affairs",
    items: [
      { title: "Daily News Analysis", path: "/current-affairs/daily/news-analysis", icon: { image: newsImage } },
      { title: "The Hindu Editorial", path: "/current-affairs/daily/hindu-editorial", icon: { image: newsImage } },
      { title: "Indian Express Editorial", path: "/current-affairs/daily/express-editorial", icon: { image: newsImage } },
      { title: "PIB Analysis", path: "/current-affairs/daily/pib", icon: { image: newsImage } },
      { title: "Daily MCQ Quiz", path: "/current-affairs/daily/mcq-quiz", icon: { image: newsImage } },
      { title: "Answer Writing Practice", path: "/current-affairs/daily/answer-writing", icon: { image: newsImage } },
    ]
  },
  {
    title: "Monthly Current Affairs",
    items: [
      { title: "Monthly Compilation", path: "/current-affairs/monthly/compilation", icon: { image: newsImage } },
      { title: "Yojana Magazine", path: "/current-affairs/monthly/yojana", icon: { image: newsImage } },
      { title: "Kurukshetra Magazine", path: "/current-affairs/monthly/kurukshetra", icon: { image: newsImage } },
      { title: "Science Reporter", path: "/current-affairs/monthly/science-reporter", icon: { image: newsImage } },
    ]
  },
  {
    title: "Yearly Current Affairs",
    items: [
      { title: "Union Budget", path: "/current-affairs/yearly/union-budget", icon: { image: newsImage } },
      { title: "Economic Survey", path: "/current-affairs/yearly/economic-survey", icon: { image: newsImage } },
      { title: "Year End Review", path: "/current-affairs/yearly/year-end-review", icon: { image: newsImage } },
    ]
  }
];

interface CurrentAffairsLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

const CurrentAffairsLayout: React.FC<CurrentAffairsLayoutProps> = ({ children, activeSection }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Navigation Sidebar */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 px-4">Current Affairs</h2>
              <nav className="space-y-6">
                {navigationSections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={item.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                              activeSection === item.path
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {item.icon && (
                              <span className="mr-3">
                                {typeof item.icon === 'object' && 'image' in item.icon ? (
                                  <Image src={item.icon.image} alt={item.title} width={24} height={24} />
                                ) : (
                                  item.icon
                                )}
                              </span>
                            )}
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-4 mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/current-affairs/daily/news-analysis"
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                    >
                      <span className="mr-3">🔥</span>
                      Today's Updates
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/current-affairs/monthly/compilation"
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg"
                    >
                      <span className="mr-3">📚</span>
                      Monthly Compilation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:w-3/4 lg:w-4/5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsLayout;