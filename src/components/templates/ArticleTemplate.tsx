import React from "react";
import { BaseTemplateProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import Image from "next/image";

interface ArticleContent {
  content: string;
  image?: string;
}

export const ArticleTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const { title, content, metadata } = page;

  // Safely cast content to ArticleContent with fallbacks
  const articleContent = JSON.parse(content as unknown as string);
  const mainContent = articleContent.content.mainContent || "";

  console.log("main: ", mainContent);

  const { tags, date, readTime, coverImage } = metadata as {
    tags?: string[];
    date?: string;
    readTime?: string;
    coverImage?: string;
  };

  // Use either the content image or the metadata coverImage
  const displayImage = articleContent.image || coverImage;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Featured Image */}
            {displayImage && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] mb-12">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              {/* Article Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
                  {title}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full"></span>
                </h1>
                {date && (
                  <div className="text-gray-600 mb-2">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
                {readTime && (
                  <div className="text-gray-500 text-sm">
                    ⏱️ {readTime} read
                  </div>
                )}
              </div>

              <div
                className="prose prose-lg max-w-none
                prose-headings:text-gray-800 
                prose-headings:font-semibold 
                prose-headings:text-center
                prose-h1:text-3xl
                prose-h2:text-2xl
                prose-h2:border-b-2 
                prose-h2:border-blue-200
                prose-h2:pb-2
                prose-p:text-gray-600
                prose-p:leading-relaxed
                prose-p:my-4
                prose-strong:text-gray-800
                prose-a:text-blue-600
                prose-a:no-underline
                prose-a:border-b-2
                prose-a:border-blue-200
                prose-a:transition-colors
                prose-a:hover:border-blue-500
                prose-blockquote:border-l-blue-500
                prose-blockquote:bg-blue-50
                prose-blockquote:p-4
                prose-blockquote:rounded-r-lg
                prose-pre:bg-gray-50
                prose-pre:rounded-lg
                prose-pre:p-4
                prose-img:rounded-lg
                prose-img:shadow-md
                prose-ul:list-disc
                prose-ul:pl-6
                prose-ol:list-decimal
                prose-ol:pl-6"
                dangerouslySetInnerHTML={{ __html: mainContent }}
              />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
            {/* Table of Contents */}
            <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 sticky top-8 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-blue-200 pb-2">
                📑 Table of Contents
              </h3>
              <TableOfContents content={mainContent} />
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-blue-200 pb-2">
                  🏷️ Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                    >
                      {tag}
                    </Badge>
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

export default ArticleTemplate;
