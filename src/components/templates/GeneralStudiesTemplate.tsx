'use client';

import React, { useState } from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface GeneralStudiesContent {
  title: string;
  paper: string;
  topic: string;
  subtopic: string;
  content: string;
  importanceLevel: string;
  previousYearQuestions: string;
  keyPoints: string;
  sources: string;
}

interface NavItem {
  id: string;
  title: string;
  children?: NavItem[];
  slug?: string;
}

export const GeneralStudiesTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title } = page;
  const content = (page.content || {}) as unknown as GeneralStudiesContent;
  const [activeTab, setActiveTab] = useState('content');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  const tabs = [
    { id: 'content', label: 'Main Content' },
    { id: 'keypoints', label: 'Key Points', content: content.keyPoints },
    { id: 'pyq', label: 'Previous Year Questions', content: content.previousYearQuestions },
    { id: 'sources', label: 'Sources & References', content: content.sources }
  ];

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderNavItems = (items: NavItem[], level: number = 0) => {
    return items.map(item => (
      <div key={item.id} className="w-full">
        <div className={cn(
          "flex items-center gap-2 w-full",
          level > 0 && "ml-4"
        )}>
          {item.children && item.children.length > 0 && (
            <button
              onClick={() => toggleExpand(item.id)}
              className={cn(
                "p-1 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-transform",
                expandedItems.includes(item.id) && "rotate-90"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          <a
            href={item.slug ? `/${item.slug}` : '#'}
            className={cn(
              "flex-1 px-3 py-2 rounded-lg transition-colors duration-200",
              "hover:bg-blue-50 dark:hover:bg-blue-900/30",
              "text-gray-700 dark:text-gray-300",
              level === 0 ? "font-medium" : "text-sm"
            )}
          >
            {item.title}
          </a>
        </div>
        {item.children && item.children.length > 0 && expandedItems.includes(item.id) && (
          <div className="mt-1 border-l-2 border-gray-200 dark:border-gray-700 ml-3">
            {renderNavItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert 
            prose-headings:text-gray-900 dark:prose-headings:text-gray-100
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-a:text-blue-600 dark:prose-a:text-blue-400
            prose-blockquote:border-l-blue-500
            prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900"
            dangerouslySetInnerHTML={{ __html: content.content || '' }} 
          />
        );
      case 'keypoints':
        return content.keyPoints ? (
          <div className="prose prose-lg max-w-none dark:prose-invert" 
            dangerouslySetInnerHTML={{ __html: content.keyPoints }} 
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No key points available</p>
        );
      case 'pyq':
        return content.previousYearQuestions ? (
          <div className="prose prose-lg max-w-none dark:prose-invert" 
            dangerouslySetInnerHTML={{ __html: content.previousYearQuestions }} 
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No previous year questions available</p>
        );
      case 'sources':
        return content.sources ? (
          <div className="prose prose-lg max-w-none dark:prose-invert" 
            dangerouslySetInnerHTML={{ __html: content.sources }} 
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No sources available</p>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Glassmorphism */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:16px]" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-indigo-500/30 to-transparent transform -skew-x-12" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              {content.paper}
            </Badge>
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              Importance: {content.importanceLevel}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-blue-50 max-w-2xl font-medium">
            {content.topic} - {content.subtopic}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="space-y-6 sticky top-8">
              {/* Quick Stats */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Stats</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Paper</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{content.paper}</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                      <p className="text-sm text-purple-600 dark:text-purple-400 mb-1">Importance</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{content.importanceLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Side Navigation */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Navigation</h2>
                  <nav className="space-y-1">
                    {/* Content Tabs */}
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-lg transition-colors duration-200",
                          "hover:bg-blue-50 dark:hover:bg-blue-900/30",
                          activeTab === tab.id
                            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-600 dark:text-gray-400"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}

                    {/* Divider */}
                    <div className="my-4 border-t border-gray-200 dark:border-gray-700" />

                    {/* Child Pages */}
                    {page.children && page.children.length > 0 && (
                      <>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 px-4 mb-2">
                          Related Topics
                        </h3>
                        {renderNavItems(page.children)}
                      </>
                    )}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-gray-800/50">
              <CardContent className="p-8">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
