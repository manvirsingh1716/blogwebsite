import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { BaseTemplateProps, JsonContent } from './types';
import ContactMap from '@/components/ui/ContactMap';
import ContactForm from '@/components/ui/ContactForm'; // Import ContactForm
import { MapPin, Phone, Mail } from 'lucide-react';

interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
}

interface CurrentAffairsContent extends JsonContent {
  title: string;
  date: string;
  content: {
    mainContent: string;
    subPages?: Array<{
      title: string;
      slug: string;
      description: string;
    }>;
  };
  metadata?: {
    category?: string;
    tags?: string[];
    source?: string;
    lastUpdated?: string;
    contact?: ContactInfo;
  };
}

const SubPageCard = ({ title, description, slug }: { title: string; description: string; slug: string }) => (
  <Link href={slug} className="block">
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all hover:scale-[1.02]">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </Link>
);

export const CurrentAffairsTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const currentAffairs = page.content as unknown as CurrentAffairsContent;
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return 'Date not available';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Heading (Level 2) */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {currentAffairs?.title || 'Current Affairs'}
          </h1>
          {currentAffairs?.date && (
            <p className="text-gray-600">
              Last Updated: {formatDate(currentAffairs.date)}
            </p>
          )}
        </div>

        {/* Sub-pages (Level 3) */}
        {currentAffairs?.content?.subPages && currentAffairs.content.subPages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentAffairs.content.subPages.map((subPage, index) => (
              <SubPageCard
                key={index}
                title={subPage.title}
                description={subPage.description}
                slug={subPage.slug}
              />
            ))}
          </div>
        )}

        {/* Contact and Map Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ContactMap />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ContactForm />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: currentAffairs?.content?.mainContent || '' }} />
        </div>

        {/* Metadata */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {currentAffairs?.metadata?.category && (
              <span>Category: {currentAffairs.metadata.category}</span>
            )}
            {currentAffairs?.metadata?.source && (
              <span>Source: {currentAffairs.metadata.source}</span>
            )}
          </div>
          {currentAffairs?.metadata?.tags && currentAffairs.metadata.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {currentAffairs.metadata.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};