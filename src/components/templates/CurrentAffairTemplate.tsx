import React from 'react';
import { BaseTemplateProps } from './types';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ui/ContactForm';
import ContactMap from '@/components/ui/ContactMap';

interface CurrentAffairContent {
  title: string;
  content: string;
}

export const CurrentAffairTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, children } = page;
  
  // Parse the content properly based on the format it's stored in
  let parsedContent: CurrentAffairContent;
  try {
    // Try to parse as JSON if it's a string
    if (typeof content === 'string') {
      parsedContent = JSON.parse(content);
    } else {
      // If it's already an object, use it directly
      parsedContent = content as unknown as CurrentAffairContent;
    }
  } catch (error) {
    console.error('Error parsing content:', error);
    // Fallback to empty content
    parsedContent = { title: title, content: ''};
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Main Content */}
          <div className="mb-16">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
              <div className="w-24 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {children?.map((child: any) => (
                <Link key={child.id} href={`/${child.slug}`} className="group">
                  <div className="bg-gray-50 rounded-lg shadow-md p-8 hover:shadow-xl transition-all duration-300 h-[450px] flex flex-col justify-between transform hover:-translate-y-1 border border-gray-100">
                    <div>
                      <div className="flex flex-col items-center mb-8">
                        <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors text-center">
                          {child.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {child.content}
                      </p>
                    </div>
                    <div className="text-yellow-500 group-hover:text-yellow-600 font-medium flex items-center justify-center">
                      <span className="text-sm">Read More →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ContactForm />
              <ContactMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentAffairTemplate;