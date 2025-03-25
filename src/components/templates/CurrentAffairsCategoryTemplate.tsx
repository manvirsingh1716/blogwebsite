'use client';

import React from 'react';
import Link from 'next/link';
import { BaseTemplateProps, JsonContent } from './types';

interface CategoryContent extends JsonContent {
  title?: string;
  description?: string;
  items?: {
    title: string;
    path: string;
    icon: string;
    description?: string;
  }[];
  features?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

const SectionCard = ({ title, path, icon, description }: { title: string; path: string; icon: string; description?: string }) => (
  <Link href={path} className="group">
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
          {title}
        </h3>
      </div>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
      <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-800">
        View Section
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </Link>
);

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <span className="text-3xl mb-4 block">{icon}</span>
    <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const CurrentAffairsCategoryTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const content = page?.content as unknown as CategoryContent || {};
  const { title, description, items = [], features = [] } = content;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 h-72">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title || 'Current Affairs'}</h1>
            <p className="text-xl opacity-90">
              {description || 'Stay updated with comprehensive coverage of current affairs'}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8">
          <Link href="/current-affairs">
            <span className="hover:text-gray-700 cursor-pointer">Current Affairs</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{title}</span>
        </nav>

        {/* Sections Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <SectionCard key={index} {...item} />
            ))}
          </div>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
