import React from 'react';
import { BaseTemplateProps, JsonContent, JsonMetadata } from './types';
import { Hero } from '../ui/Hero';
import { ForumPost } from '../ui/ForumPost';

interface ForumContent extends JsonContent {
  title: string;
  description: string;
  discussions: Array<{
    title: string;
    content: string;
    author: string;
    date: string;
    replies: Array<{
      content: string;
      author: string;
      date: string;
    }>;
  }>;
}

interface ForumMetadata extends JsonMetadata {
  examType: string;
  tags: string[];
  pinnedTopics: string[];
}

export const ExamForumTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { content, metadata } = page;
  const { title, description, discussions } = content as unknown as ForumContent;
  const { examType, tags, pinnedTopics } = (metadata || {}) as ForumMetadata;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero
        title={title}
        description={description}
        subtitle={examType}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Forum Posts */}
          <main className="lg:col-span-8">
            {/* Pinned Topics */}
            {pinnedTopics && pinnedTopics.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pinned Topics</h2>
                <div className="space-y-4">
                  {discussions
                    .filter(d => pinnedTopics.includes(d.title))
                    .map((discussion, index) => (
                      <ForumPost
                        key={index}
                        {...discussion}
                        slug={discussion.title.toLowerCase().replace(/\s+/g, '-')}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* Regular Discussions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Discussions</h2>
              <div className="space-y-4">
                {discussions
                  .filter(d => !pinnedTopics?.includes(d.title))
                  .map((discussion, index) => (
                    <ForumPost
                      key={index}
                      {...discussion}
                      slug={discussion.title.toLowerCase().replace(/\s+/g, '-')}
                    />
                  ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Exam Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Exam Information</h3>
              <div className="prose prose-sm">
                <p>{examType} Forum</p>
                <p>Join the discussion with fellow aspirants preparing for {examType}.</p>
              </div>
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <a
                      key={index}
                      href={`/exam-forum/tags/${tag.toLowerCase()}`}
                      className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Forum Guidelines */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Forum Guidelines</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                <li>Be respectful to other members</li>
                <li>Stay on topic</li>
                <li>No spam or self-promotion</li>
                <li>Use search before posting</li>
                <li>Report inappropriate content</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
