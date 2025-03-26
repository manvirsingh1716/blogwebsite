'use client';

import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import SidebarNavigation from '@/components/navigation/SidebarNavigation';

interface GeneralStudiesContent {
  title: string;
  content: string;
  image?: string;
}

export const GeneralStudiesTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, id } = page;
  const content = (page.content || {}) as unknown as GeneralStudiesContent;
  
  // Default image if none is provided
  const pageImage = content.image || '/images/default-general-studies.jpg';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Image and Child Pages */}
          <div className="lg:col-span-7">
            {/* Main Topic Image */}
            <Card className="border-0 shadow-lg bg-white/80 overflow-hidden mb-8">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src={pageImage} 
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                  </div>
                </div>
              </div>
            </Card>

            {/* Child Pages Grid */}
            {page.children && page.children.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {page.children.map((child: any) => {
                    const childContent = child.content || {};
                    const childImage = childContent.image || '/images/default-subtopic.jpg';
                    
                    return (
                      <Link 
                        href={`/${child.slug}`} 
                        key={child.id}
                        className="group"
                      >
                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full">
                          <div className="relative w-full h-40">
                            <Image 
                              src={childImage} 
                              alt={child.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                              <div className="p-4">
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-100 transition-colors">
                                  {child.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar Navigation */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              {/* Sidebar Navigation */}
              <Card className="border-0 shadow-lg bg-white/80">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Navigation</h2>
                  <SidebarNavigation 
                    currentPageId={id}
                    basePath="/upsc"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content Section - Full Width Below */}
        <div className="mt-8">
          <Card className="border-0 shadow-lg bg-white/80">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: content.content || '' }} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GeneralStudiesTemplate;