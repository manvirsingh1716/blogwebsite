import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { TableOfContents } from '@/components/navigation/TableOfContents';

export const UpscNotesTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, metadata } = page;
  const { mainContent } = content as { mainContent: string };
  const { keywords = [], relatedTopics = [] } = metadata as { 
    keywords?: string[],
    relatedTopics?: string[]
  } || {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content */}
        <main className="md:col-span-8 lg:col-span-9">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            )}
            
            <Card>
              <CardContent className="pt-6">
                {mainContent}
              </CardContent>
            </Card>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-24">
            <TableOfContents />
            
            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <Card className="mt-6">
                <CardContent>
                  <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                  <ul className="space-y-2">
                    {relatedTopics.map((topic: string, index: number) => (
                      <li key={index}>
                        <a href="#" className="text-blue-500 hover:underline">
                          {topic}
                        </a>
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
