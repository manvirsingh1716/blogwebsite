import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import ContactForm from '@/components/ui/ContactForm';

interface PageMetadata {
  keywords?: string[];
  relatedTopics?: string[];
}

interface PageContent {
  title: string;
  subject: string;
  content: string;
}

export const UpscNotesTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, metadata } = page;
  const pageContent = content as unknown as PageContent;
  const { subject = '', content: mainContent = '' } = pageContent;
  const { keywords = [], relatedTopics = [] } = metadata as PageMetadata;

  const safeKeywords = Array.isArray(keywords) ? keywords : [];
  const safeRelatedTopics = Array.isArray(relatedTopics) ? relatedTopics : [];

  const renderNavItems = (items: any[], level: number = 1) => {
    return items.map((item) => (
      <div key={item.id} className="mb-2">
        <a
          href={`/${item.slug}`}
          className={`block py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-blue-50 ${
            level === 1 
              ? 'font-bold text-lg text-blue-600' 
              : level === 2 
              ? 'font-semibold pl-6 text-blue-500' 
              : 'text-sm pl-8 text-gray-600'
          }`}
        >
          {item.title}
        </a>
        {item.children && item.children.length > 0 && (
          <div className="ml-4 border-l-2 border-blue-200 pl-4">
            {renderNavItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb />
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          <aside className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              <Card className="border border-blue-100 shadow-md bg-white rounded-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Study Materials</h2>
                  <div className="space-y-2">
                    {renderNavItems(page.children)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 shadow-md bg-white rounded-xl">
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </aside>

          <main className="md:col-span-8 lg:col-span-9">
            <article className="space-y-8">
              <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                  {title}
                </h1>
                
                {safeKeywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {safeKeywords.map((keyword: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="prose prose-lg max-w-none prose-headings:text-blue-600 prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-p:text-gray-600">
                  {subject && (
                    <div className="mb-6">
                      <h2 className="text-2xl font-semibold text-blue-600">Subject</h2>
                      <p className="text-gray-600">{subject}</p>
                    </div>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: mainContent || '' }} />
                </div>
              </div>

              {safeRelatedTopics.length > 0 && (
                <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Related Topics</h2>
                  <div className="flex flex-wrap gap-3">
                    {safeRelatedTopics.map((topic: string, index: number) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-sm px-4 py-2 border-2 border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpscNotesTemplate;