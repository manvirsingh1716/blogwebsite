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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-9">
            <article>
              <header className="bg-white border border-blue-100 rounded-xl shadow-md p-8 mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                  {title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-blue-500" />
                      <span>{date || new Date().toLocaleDateString()}</span>
                    </div>
                    {readTime && (
                      <span className="bg-blue-50 px-3 py-1.5 rounded-lg">{readTime} min read</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <BookmarkIcon className="w-5 h-5 text-blue-500" />
                    </button>
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                      <ShareIcon className="w-5 h-5 text-blue-500" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Introduction</h2>
                  <div 
                    className="prose prose-lg max-w-none 
                      prose-headings:text-gray-800
                      prose-p:text-gray-600
                      prose-strong:text-gray-800
                      prose-a:text-blue-600
                      prose-blockquote:border-l-blue-500
                      prose-pre:bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: introduction || '' }}
                  />
                </div>

                {/* Main Content */}
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Main Content</h2>
                  <div 
                    className="prose prose-lg max-w-none 
                      prose-headings:text-gray-800
                      prose-p:text-gray-600
                      prose-strong:text-gray-800
                      prose-a:text-blue-600
                      prose-blockquote:border-l-blue-500
                      prose-pre:bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: mainContent || '' }}
                  />
                </div>

                {/* Conclusion */}
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Conclusion</h2>
                  <div 
                    className="prose prose-lg max-w-none 
                      prose-headings:text-gray-800
                      prose-p:text-gray-600
                      prose-strong:text-gray-800
                      prose-a:text-blue-600
                      prose-blockquote:border-l-blue-500
                      prose-pre:bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: conclusion || '' }}
                  />
                </div>

                {/* References */}
                {references && references.length > 0 && (
                  <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">References</h2>
                    <ul className="space-y-3">
                      {references.map((ref: string, index: number) => (
                        <li key={index} className="flex gap-3 text-gray-600">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span>{ref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white border border-blue-100 rounded-xl shadow-md">
                <TableOfContents />
              </div>

              {/* Key Takeaways */}
              {keyTakeaways && keyTakeaways.length > 0 && (
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {keyTakeaways.map((point: string, index: number) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
                  <ul className="space-y-4">
                    {relatedArticles.map((article: any, index: number) => (
                      <li key={index} className="border-b border-blue-100 last:border-b-0 pb-4 last:pb-0">
                        <a 
                          href={article.slug} 
                          className="block hover:text-blue-600 transition-colors duration-200"
                        >
                          <h4 className="font-medium text-gray-800 mb-1">{article.title}</h4>
                          <p className="text-sm text-gray-600">
                            {article.date}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleTemplate;
