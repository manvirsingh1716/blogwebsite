import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { TableOfContents } from '@/components/navigation/TableOfContents';
import { CalendarIcon, BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';

export const ArticleTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, metadata } = page;
  const { introduction, mainContent, conclusion } = content as {
    introduction: string;
    mainContent: string;
    conclusion: string;
  };
  const { author, category, tags, date, readTime, references, keyTakeaways, relatedArticles } = metadata as {
    author: string;
    category: string;
    tags?: string[];
    date?: string;
    readTime?: string;
    references?: string[];
    keyTakeaways?: string[];
    relatedArticles?: any[];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content */}
        <main className="md:col-span-8 lg:col-span-9">
          <article className="prose dark:prose-invert max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{date || new Date().toLocaleDateString()}</span>
                  </div>
                  {readTime && (
                    <span>• {readTime} min read</span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Article Content */}
            <Card>
              <CardContent className="pt-6">
                {/* Introduction */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                  <div>{introduction}</div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                  {mainContent}
                </div>

                {/* Conclusion */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
                  <div>{conclusion}</div>
                </div>
              </CardContent>
            </Card>

            {/* References */}
            {references && references.length > 0 && (
              <Card className="mt-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">References</h2>
                  <ul className="space-y-2">
                    {references.map((ref: string, index: number) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400">
                        {index + 1}. {ref}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </article>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <TableOfContents />

            {/* Key Takeaways */}
            {keyTakeaways && keyTakeaways.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {keyTakeaways.map((point: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-blue-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                  <ul className="space-y-4">
                    {relatedArticles.map((article: any, index: number) => (
                      <li key={index}>
                        <a href={article.slug} className="hover:text-blue-500">
                          {article.title}
                        </a>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {article.date}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
