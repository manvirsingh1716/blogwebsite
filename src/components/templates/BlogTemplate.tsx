import React from 'react';
import { BaseTemplateProps } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export const BlogTemplate: React.FC<BaseTemplateProps> = ({
  title,
  content,
  metadata
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        
        {/* Meta Information */}
        <div className="flex items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
          {metadata?.author && (
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span>{metadata.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <span>{metadata?.date || new Date().toLocaleDateString()}</span>
          </div>
          {metadata?.readTime && (
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>{metadata.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Categories/Tags */}
        {metadata?.categories && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {metadata.categories.map((category: string, index: number) => (
              <Badge key={index} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}

        {/* Featured Image */}
        {metadata?.featuredImage && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={metadata.featuredImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <Card>
        <CardContent className="prose dark:prose-invert max-w-none pt-6">
          {content}
        </CardContent>
      </Card>

      {/* Author Bio */}
      {metadata?.authorBio && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {metadata.authorImage && (
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={metadata.authorImage}
                    alt={metadata.author || 'Author'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold mb-2">{metadata.author}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {metadata.authorBio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Posts */}
      {metadata?.relatedPosts && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metadata.relatedPosts.map((post: any, index: number) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    <a href={post.slug} className="hover:text-blue-500">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-sm text-gray-500">
                    {post.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
