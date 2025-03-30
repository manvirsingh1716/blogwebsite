import React from "react";
import Link from "next/link";
import { sectionConfig } from "@/config/currentAffairs";
import { env } from "@/config/env";
import CurrentAffairsLayout from "@/components/CurrentAffairs/CurrentAffairsLayout";
import Head from "next/head";

// Define types for the data
interface CurrentAffairArticle {
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

interface CurrentAffairsSectionPageProps {
  params: { category: string; section: string };
}

// This function will be called at request time
export async function generateMetadata({ params }: CurrentAffairsSectionPageProps) {
  // Await params to fix the Next.js error
  const { category, section } = await Promise.resolve(params);
  
  // Fetch the article to get its title
  const article = await fetchArticle(category, section);
  
  return {
    title: article ? `${article.title} - 99Notes` : "Article - 99Notes",
    description: article ? article.content?.substring(0, 160) : "Current affairs article",
  };
}

// Server component to fetch data
const CurrentAffairArticlePage = async ({
  params,
}: CurrentAffairsSectionPageProps) => {
  // Await params to fix the Next.js error
  const { category, section } = await Promise.resolve(params);
  
  // The section parameter is actually the article slug
  const articleSlug = section;
  
  // Fetch the article
  const article = await fetchArticle(category, articleSlug);

  return (
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>{article?.title || "Article"} | 99Notes</title>
          <meta
            name="description"
            content={article?.content?.substring(0, 160) || "Current affairs article"}
          />
        </Head>
        
        {article ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                href={`/current-affairs/${category}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")}
              </Link>
            </div>
            
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <header className="mb-8 border-b pb-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{article.title}</h1>
                  <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4">
                    {article.author && (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{article.author}</span>
                      </div>
                    )}
                    {article.createdAt && (
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={article.createdAt}>
                          {new Date(article.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span>{category.replace(/-/g, " ")}</span>
                    </div>
                  </div>
                </header>
                
                <div className="prose prose-lg max-w-none">
                  {article.content ? (
                    <>
                      <div dangerouslySetInnerHTML={{ __html: article.content }} />
                      {/* Debug info - remove in production */}
                      <div className="mt-8 p-4 bg-gray-100 rounded text-sm">
                        <h4 className="font-bold mb-2">Debug Info (remove in production):</h4>
                        <p>Content length: {article.content.length} characters</p>
                        <p>Content type: {typeof article.content}</p>
                        <p>Raw content preview: {article.content.substring(0, 100)}...</p>
                      </div>
                    </>
                  ) : (
                    <p>No content available for this article.</p>
                  )}
                </div>
                
                <div className="mt-10 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Related Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      Current Affairs
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {category.replace(/-/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            </article>
            
            <div className="mt-8 flex justify-between">
              <Link
                href={`/current-affairs/${category}`}
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all articles
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-500 mb-6">
              The article you're looking for could not be found.
            </p>
            <Link
              href={`/current-affairs/${category}`}
              className="text-blue-600 hover:underline"
            >
              Go back to {category.replace(/-/g, " ")} articles
            </Link>
          </div>
        )}
      </div>
  );
};

// Helper function to fetch a specific article
async function fetchArticle(category: string, articleSlug: string): Promise<CurrentAffairArticle | null> {
  try {
    // Log the input parameters
    console.log(`Fetching article with parameters: category="${category}", articleSlug="${articleSlug}"`);
    
    // Construct the full slug exactly as it would be in the database
    // Based on the seed data, the format is: current-affairs/category/sample-article
    const fullSlug = `current-affairs/${category}/${articleSlug}`;
    console.log(`Constructed full slug: "${fullSlug}"`);
    
    // Make a direct API call to get the article by its full slug
    console.log(`Making API call to: ${env.API}/currentArticle/slug/${encodeURIComponent(fullSlug)}`);
    const response = await fetch(`${env.API}/currentArticle/slug/${encodeURIComponent(fullSlug)}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    });
    
    console.log(`API response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`API response data:`, data);
      
      if (data.status === 'success' && data.data) {
        console.log(`Successfully found article: "${data.data.title}"`);
        return data.data;
      } else {
        console.log(`API returned success but no article data was found`);
      }
    } else {
      console.log(`Failed to fetch article with full slug: ${fullSlug}`);
      
      // Try a different approach - fetch all articles and find a match
      console.log(`Fetching all articles to find a match...`);
      const allArticlesResponse = await fetch(`${env.API}/currentArticle`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-store'
      });
      
      if (allArticlesResponse.ok) {
        const allArticlesData = await allArticlesResponse.json();
        
        if (allArticlesData.status === 'success' && allArticlesData.data) {
          const allArticles = allArticlesData.data;
          console.log(`Found ${allArticles.length} articles in total`);
          
          // Log all article slugs to see what's available
          console.log(`All article slugs:`, allArticles.map((a: any) => a.slug));
          
          // Try to find an article that matches our criteria
          const matchingArticle = allArticles.find((a: any) => {
            // Try exact match on full slug
            if (a.slug === fullSlug) {
              console.log(`Found exact match on full slug: ${a.slug}`);
              return true;
            }
            
            // Try match on the last part of the slug
            const slugParts = a.slug.split('/');
            const lastPart = slugParts[slugParts.length - 1];
            if (lastPart === articleSlug) {
              console.log(`Found match on last part: ${a.slug}`);
              return true;
            }
            
            // Try match on parent slug
            if (a.parentSlug === `current-affairs/${category}`) {
              console.log(`Found match on parent slug: ${a.slug}`);
              return true;
            }
            
            return false;
          });
          
          if (matchingArticle) {
            console.log(`Found matching article: ${matchingArticle.title}`);
            
            // Fetch the full article with content
            const fullArticleResponse = await fetch(`${env.API}/currentArticle/slug/${encodeURIComponent(matchingArticle.slug)}`, {
              headers: {
                "Content-Type": "application/json",
              },
              cache: 'no-store'
            });
            
            if (fullArticleResponse.ok) {
              const fullArticleData = await fullArticleResponse.json();
              if (fullArticleData.status === 'success' && fullArticleData.data) {
                console.log(`Successfully fetched full article content`);
                return fullArticleData.data;
              }
            }
          }
        }
      }
    }
    
    console.error(`Article not found for slug: ${articleSlug}`);
    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export default CurrentAffairArticlePage;
