import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, BookmarkIcon } from '@heroicons/react/24/outline';

export const CurrentAffairsTemplate: React.FC<BaseTemplateProps> = ({
  title,
  content,
  metadata
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content */}
        <main className="md:col-span-8">
          <article className="prose dark:prose-invert max-w-none">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold m-0">{title}</h1>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <BookmarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Date and Category */}
            <div className="flex items-center gap-4 mb-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{metadata?.date || new Date().toLocaleDateString()}</span>
              </div>
              {metadata?.category && (
                <Badge variant="secondary">{metadata.category}</Badge>
              )}
            </div>

            {/* Quick Summary */}
            {metadata?.summary && (
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Quick Summary</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {metadata.summary}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Main Content */}
            <Card>
              <CardContent className="pt-6">
                {content}
              </CardContent>
            </Card>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Key Points */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Points</h3>
                <ul className="space-y-3">
                  {metadata?.keyPoints?.map((point: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-blue-500">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Important Terms */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Important Terms</h3>
                <div className="flex flex-wrap gap-2">
                  {metadata?.terms?.map((term: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {term}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};
