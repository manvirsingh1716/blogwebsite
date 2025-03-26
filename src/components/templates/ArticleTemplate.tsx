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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Main Content Column */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Featured Image */}
            {displayImage && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-md overflow-hidden">
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
            <div className="bg-white border border-blue-100 rounded-xl shadow-md p-8">
              <div
                className="prose prose-lg max-w-none
                prose-headings:text-gray-800
                prose-p:text-gray-600
                prose-strong:text-gray-800
                prose-a:text-blue-600
                prose-blockquote:border-l-blue-500
                prose-pre:bg-gray-50"
                dangerouslySetInnerHTML={{ __html: mainContent }}
              />
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
            {/* Table of Contents */}
            <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Table of Contents
              </h3>
              <TableOfContents content={mainContent} />
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
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
