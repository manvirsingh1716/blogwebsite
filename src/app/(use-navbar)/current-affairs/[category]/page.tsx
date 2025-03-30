import React from "react";
import Head from "next/head";
import Link from "next/link";
import CurrentAffairsLayout from "@/components/CurrentAffairs/CurrentAffairsLayout";
import { sectionConfig } from "@/config/currentAffairs";
import { env } from "@/config/env";

// Define interfaces to match the database schema
interface Article {
  id: number;
  title: string;
  content?: string;
  slug: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  parentSlug?: string;
  parentId?: number;
}

interface CurrentAffair {
  id: number;
  title: string;
  content: string;
  slug: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface CurrentAffairsSectionPageProps {
  params: {
    category: string;
  };
}

// Make the component async and properly handle the dynamic params
const CurrentAffairsSectionPage = async ({
  params,
}: CurrentAffairsSectionPageProps) => {
  // Await params to fix the Next.js error
  const { category } = await Promise.resolve(params);
  
  // The category parameter is the last part of the slug
  // For example, if the full slug is 'current-affairs/news-analysis',
  // the category parameter will be 'news-analysis'
  const fullSlug = `current-affairs/${category}`;
  
  // Fetch the current affair section data
  let currentAffair: CurrentAffair | null = null;
  let articles: Article[] = [];
  
  try {
    console.log("Fetching section with slug:", fullSlug);
    
    // For server components, use the backend API directly
    // Looking at the backend routes, the endpoint for getting a section by slug is /currentAffair/slug/:slug
    const sectionResponse = await fetch(`${env.API}/currentAffair/slug/${encodeURIComponent(fullSlug)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Don't cache the response
    });
    
    if (sectionResponse.ok) {
      const sectionData = await sectionResponse.json();
      if (sectionData.status === 'success' && sectionData.data) {
        currentAffair = sectionData.data;
        console.log("Found section:", currentAffair?.title || "No title", "ID:", currentAffair?.id);
      } else {
        console.error("Failed to get section data:", sectionData);
      }
    } else {
      console.error("Section response not OK:", sectionResponse.status);
    }
    
    // Fetch all articles
    console.log("Fetching all articles");
    const articlesResponse = await fetch(`${env.API}/currentArticle`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store' // Don't cache the response
    });
    
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      if (articlesData.status === 'success' && articlesData.data) {
        const allArticles = articlesData.data;
        console.log("Total articles:", allArticles.length);
        
        // Log some sample articles to see their structure
        if (allArticles.length > 0) {
          console.log("Sample article structure:", JSON.stringify(allArticles[0], null, 2));
          // Log all article slugs to see what we're working with
          console.log("All article slugs:", allArticles.map((a: Article) => a.slug));
        }
        
        // Based on the logs, it seems the articles don't have a parentSlug property
        // Instead, we need to extract the parent slug from the article's slug
        
        // Filter articles by extracting parent slug from the article's slug
        articles = allArticles.filter((article: Article) => {
          // For an article with slug like "current-affairs/news-analysis/sample-article"
          // We need to extract "current-affairs/news-analysis" as the parent slug
          const slugParts = article.slug.split('/');
          
          // Remove the last part (the article name) to get the parent slug
          const extractedParentSlug = slugParts.slice(0, -1).join('/');
          
          console.log("Article:", article.title);
          console.log("  Article slug:", article.slug);
          console.log("  Extracted parent slug:", extractedParentSlug);
          console.log("  Current page slug:", fullSlug);
          
          // Check if the extracted parent slug matches the current page's fullSlug
          const matches = extractedParentSlug === fullSlug;
          
          if (matches) {
            console.log("  MATCH FOUND!");
          }
          
          return matches;
        });
        
        console.log("Articles filtered by extracted parent slug:", articles.length);
      } else {
        console.error("Failed to get articles data:", articlesData);
      }
    } else {
      console.error("Articles response not OK:", articlesResponse.status);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Get the section config for this category
  const sectionInfo = sectionConfig[category] || {
    title: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
    description: "Latest updates and analysis",
    topics: ["General"],
  };

  // Sort articles by date (newest first)
  const sortedArticles = [...articles].sort((a, b) => {
    // Handle potentially undefined createdAt values
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <CurrentAffairsLayout>
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>{currentAffair?.title || sectionInfo.title} | 99Notes</title>
          <meta
            name="description"
            content={currentAffair?.content?.substring(0, 160) || sectionInfo.description}
          />
        </Head>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {currentAffair?.title || sectionInfo.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {currentAffair?.content || sectionInfo.description}
          </p>

          {/* Topics list */}
          <div className="flex flex-wrap gap-2 mb-8">
            {sectionInfo.topics.map((topic) => (
              <span
                key={topic}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Articles list */}
        <div className="space-y-6">
          {sortedArticles.length > 0 ? (
            sortedArticles.map((article) => (
              <div
                key={article.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/current-affairs/${category}/${article.slug.split('/').pop()}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.content?.substring(0, 200)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {article.author || 'Unknown'}</span>
                  <span>
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : 'No date'}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No articles found for this section.</p>
            </div>
          )}
        </div>
      </div>
    </CurrentAffairsLayout>
  );
};

export default CurrentAffairsSectionPage;