"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { env } from "@/config/env";

// Import the news image
// import newsImage from "../../../public/images/news.svg";

interface CurrentAffairSection {
  id: number;
  title: string;
  content: string;
  type: string; // daily, monthly, yearly
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface NavItem {
  title: string;
  path: string;
  icon: { image: any };
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface CurrentAffairsLayoutProps {
  children: React.ReactNode;
  activeSection?: string;
}

const CurrentAffairsLayout: React.FC<CurrentAffairsLayoutProps> = ({
  children,
  activeSection = "",
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [navSections, setNavSections] = useState<NavSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        console.log("Fetching current affairs sections...");
        
        // Fetch directly from the backend API
        // Need to fetch all types (daily, monthly, yearly)
        const dailyResponse = await fetch(`${env.API}/currentAffair/type/daily`, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store' // Don't cache the response
        });

        const monthlyResponse = await fetch(`${env.API}/currentAffair/type/monthly`, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store'
        });

        const yearlyResponse = await fetch(`${env.API}/currentAffair/type/yearly`, {
          headers: {
            "Content-Type": "application/json",
          },
          cache: 'no-store'
        });

        // Combine all the responses
        const allSections = [];
        
        if (dailyResponse.ok) {
          const dailyData = await dailyResponse.json();
          console.log("Daily response status:", dailyData.status);
          if (dailyData.status === 'success' && dailyData.data) {
            console.log("Daily sections:", dailyData.data.length);
            allSections.push(...dailyData.data);
          }
        } else {
          console.error("Daily response not OK:", dailyResponse.status);
        }
        
        if (monthlyResponse.ok) {
          const monthlyData = await monthlyResponse.json();
          console.log("Monthly response status:", monthlyData.status);
          if (monthlyData.status === 'success' && monthlyData.data) {
            console.log("Monthly sections:", monthlyData.data.length);
            allSections.push(...monthlyData.data);
          }
        } else {
          console.error("Monthly response not OK:", monthlyResponse.status);
        }
        
        if (yearlyResponse.ok) {
          const yearlyData = await yearlyResponse.json();
          console.log("Yearly response status:", yearlyData.status);
          if (yearlyData.status === 'success' && yearlyData.data) {
            console.log("Yearly sections:", yearlyData.data.length);
            allSections.push(...yearlyData.data);
          }
        } else {
          console.error("Yearly response not OK:", yearlyResponse.status);
        }
        
        // Log the data for debugging
        console.log("Total fetched sections:", allSections.length);
        
        // Group sections by type
        const groupedSections: Record<string, CurrentAffairSection[]> = {};
        
        allSections.forEach((section: CurrentAffairSection) => {
          if (!groupedSections[section.type]) {
            groupedSections[section.type] = [];
          }
          groupedSections[section.type].push(section);
        });
        
        // Create navigation sections
        const navigationSections: NavSection[] = [
          {
            title: "Daily Current Affairs",
            items: (groupedSections['daily'] || []).map(section => {
              // Extract the last part of the slug for the path
              const pathSlug = section.slug.split('/').pop() || section.slug;
              return {
                title: section.title,
                path: `/current-affairs/${pathSlug}`,
                icon: { image: null }
              };
            })
          },
          {
            title: "Monthly Current Affairs",
            items: (groupedSections['monthly'] || []).map(section => {
              // Extract the last part of the slug for the path
              const pathSlug = section.slug.split('/').pop() || section.slug;
              return {
                title: section.title,
                path: `/current-affairs/${pathSlug}`,
                icon: { image: null }
              };
            })
          },
          {
            title: "Yearly Current Affairs",
            items: (groupedSections['yearly'] || []).map(section => {
              // Extract the last part of the slug for the path
              const pathSlug = section.slug.split('/').pop() || section.slug;
              return {
                title: section.title,
                path: `/current-affairs/${pathSlug}`,
                icon: { image: null }
              };
            })
          }
        ];
        
        // Filter out empty sections
        const filteredSections = navigationSections.filter(
          section => section.items.length > 0
        );
        
        setNavSections(filteredSections);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sections:', error);
        // Don't use fallback, just set empty sections
        setNavSections([]);
        setLoading(false);
      }
    };
    
    fetchSections();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link href="/current-affairs" className="text-xl font-bold text-gray-900">
                Current Affairs
              </Link>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-8">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  navSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
                        {section.title}
                      </h3>
                      <div className="space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.path}
                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                              pathname === item.path || activeSection === item.path
                                ? "bg-blue-50 text-blue-700"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <div className="mr-3 h-6 w-6 relative">
                              {item.icon.image ? (
                                <Image
                                  src={item.icon.image}
                                  alt=""
                                  width={24}
                                  height={24}
                                  className="text-gray-500 group-hover:text-gray-600"
                                />
                              ) : (
                                <div className="w-6 h-6 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b">
          <div className="flex items-center justify-between h-16 px-4">
            <Link href="/current-affairs" className="text-xl font-bold text-gray-900">
              Current Affairs
            </Link>
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleSidebar}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={toggleSidebar}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-xl font-bold text-gray-900">
                    Current Affairs
                  </span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    navSections.flatMap((section) =>
                      section.items.map((item, index) => (
                        <Link
                          key={index}
                          href={item.path}
                          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                            pathname === item.path || activeSection === item.path
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                          onClick={toggleSidebar}
                        >
                          <div className="mr-4 h-6 w-6 relative">
                            {item.icon.image ? (
                              <Image
                                src={item.icon.image}
                                alt=""
                                width={24}
                                height={24}
                                className="text-gray-500 group-hover:text-gray-600"
                              />
                            ) : (
                              <div className="w-6 h-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          {item.title}
                        </Link>
                      ))
                    )
                  )}
                </nav>
              </div>
            </div>
            <div className="flex-shrink-0 w-14"></div>
          </div>
        )}

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairsLayout;