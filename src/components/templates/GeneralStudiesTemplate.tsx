import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TableOfContents } from '@/components/navigation/TableOfContents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const GeneralStudiesTemplate: React.FC<BaseTemplateProps> = ({
  title,
  content,
  metadata
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content */}
        <main className="md:col-span-8 lg:col-span-9">
          <article className="prose dark:prose-invert max-w-none">
            <h1 className="text-4xl font-bold mb-6">{title}</h1>

            {/* Subject Tags */}
            {metadata?.subjects && (
              <div className="flex flex-wrap gap-2 mb-6">
                {metadata.subjects.map((subject: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content Tabs */}
            <Tabs defaultValue="notes" className="mb-8">
              <TabsList>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="summary">Quick Summary</TabsTrigger>
                {metadata?.previousYearQuestions && (
                  <TabsTrigger value="pyq">PYQs</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="notes">
                <Card>
                  <CardContent className="pt-6">
                    {content}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="summary">
                <Card>
                  <CardContent className="pt-6">
                    {metadata?.summary || 'No summary available'}
                  </CardContent>
                </Card>
              </TabsContent>

              {metadata?.previousYearQuestions && (
                <TabsContent value="pyq">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-4">
                        {metadata.previousYearQuestions.map((pyq: any, index: number) => (
                          <li key={index} className="border-b pb-4 last:border-0 last:pb-0">
                            <p className="font-medium mb-2">{pyq.question}</p>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Year: {pyq.year} | Marks: {pyq.marks}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-24 space-y-6">
            <TableOfContents />

            {/* Key Concepts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Concepts</h3>
                <ul className="space-y-3">
                  {metadata?.keyConcepts?.map((concept: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-blue-500">•</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
};
