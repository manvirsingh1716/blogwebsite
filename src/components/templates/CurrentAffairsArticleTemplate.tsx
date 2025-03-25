'use client';

import React from 'next/link';
import Link from 'next/link';
import { format } from 'date-fns';
import { BaseTemplateProps, JsonContent } from './types';

interface ArticleContent extends JsonContent {
  slug?: string;
  title?: string;
  date?: string;
  content?: string;
  topics?: string[];
  type?: string;
  pdfLink?: string;
  relatedArticles?: {
    title: string;
    path: string;
  }[];
}

const RelatedArticleCard = ({ title, path }: { title: string; path: string }) => (
  <Link href={path} className="block group">
    <div className="p-4 rounded-lg hover:bg-gray-50 transition-colors">
      <h4 className="text-gray-900 group-hover:text-blue-600 font-medium">
        {title}
      </h4>
    </div>
  </Link>
);

export const CurrentAffairsArticleTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const content = page?.content as unknown as ArticleContent || {};
  const { 
    title, 
    date, 
    content: articleContent = '', 
    topics = [], 
    type,
    pdfLink,
    relatedArticles = []
  } = content;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8">
            <article className="bg-white rounded-lg shadow-sm p-8">
              {/* Article Header */}
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {title || 'Untitled Article'}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {date && (
                    <time dateTime={date} className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(date)}
                    </time>
                  )}
                  {type && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {type}
                    </span>
                  )}
                </div>
              </header>

              {/* Article Content */}
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />

              {/* Topics */}
              {topics.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* PDF Download */}
            {pdfLink && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download PDF</h3>
                <Link 
                  href={pdfLink}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF Version
                </Link>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                <div className="divide-y divide-gray-100">
                  {relatedArticles.map((article, index) => (
                    <RelatedArticleCard key={index} {...article} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
