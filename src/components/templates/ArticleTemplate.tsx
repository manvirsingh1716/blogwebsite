import React from "react";
import { BaseTemplateProps } from "./types";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { TableOfContents } from "@/components/navigation/TableOfContents";
import SearchBar from "@/components/Navbar/SearchBar";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import SocialMedia from "@/components/navigation/socialmedia";
import ContactForm from "@/components/common/ContactForm/ContactForm";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative">
      {/* TOC Container with checkbox hack for toggle */}
      <input type="checkbox" id="toc-toggle" className="hidden peer" />
      
      {/* TOC Button */}
      <label
        htmlFor="toc-toggle"
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] cursor-pointer 
        flex items-center bg-white border border-gray-200 rounded-r-lg 
        px-2 py-3 shadow-md hover:bg-gray-50 transition-all duration-300 
        peer-checked:translate-x-[320px] hover:border-gray-300 group"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-black text-sm font-medium tracking-wide rotate-180 
          [writing-mode:vertical-lr] transform transition-transform duration-300">
            TOC
          </span>
          <ChevronRight className="w-4 h-4 text-black transition-all duration-300 
          group-hover:translate-x-0.5" />
        </div>
      </label>

      {/* TOC Sidebar */}
      <div className="fixed left-0 top-0 h-full w-[320px] bg-white/95 
      backdrop-blur-sm shadow-xl -translate-x-full peer-checked:translate-x-0 
      transition-all duration-300 ease-in-out z-[90] border-r-2 border-gray-200">
        {/* Close Button - Moved outside scrollable area */}
        <label
          htmlFor="toc-toggle"
          className="absolute top-4 right-4 p-2 cursor-pointer rounded-full
          hover:bg-gray-100 transition-colors duration-200 z-[100]
          bg-white shadow-md border border-gray-200"
        >
          <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
        </label>

        {/* Left TOC Sidebar */}
        <div className="p-6 h-full mt-[50px] pb-24 overflow-y-auto">
          <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 
          shadow-inner transition-all duration-300 hover:border-gray-300
          sticky top-[100px]">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b-2 
            border-gray-300 pb-2 flex items-center gap-2">
              <span className="text-gray-500">📑</span>
              <span>Table of Content</span>
            </h3>
            <div className="pr-2 space-y-1 max-h-[70vh] overflow-y-auto">
              <TableOfContents content={mainContent} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with padding adjustment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 
      transition-all duration-300 md:peer-checked:pl-[320px]">
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
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full"></span>
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
          <aside className="lg:col-span-4 xl:col-span-3">
            {/* Search Bar - Always visible at top */}
            <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl mb-6">
              <SearchBar />
            </div>

            {/* Sticky Container */}
            <div className="relative">
              {/* TOC Section */}
              <div className="sticky top-8 space-y-6">
                <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-blue-200 pb-2">
                    📑 Table of Contents
                  </h3>
                  <div className="pr-2">
                    <TableOfContents content={mainContent} />
                  </div>
                </div>

                {/* Social Media Section - Fixed below TOC */}
                <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-blue-200 pb-2 flex items-center gap-2">
                    <span className="text-blue-500">🌐</span>
                    <span>Connect With Us</span>
                  </h3>
                  <div className="py-2 h-9">
                    <SocialMedia />
                  </div>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white border border-blue-100 rounded-xl shadow-lg">
                  <ContactForm />
                </div>

                {/* Tags Section - Fixed below Contact Form */}
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
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleTemplate;
