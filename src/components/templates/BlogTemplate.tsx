'use client';

import React, { useState } from 'react';
import { BaseTemplateProps, JsonContent } from './types';
import { BlogCard } from '../ui/BlogCard';

interface BlogContent extends JsonContent {
  blogs?: {
    id: string;
    title: string;
    excerpt?: string;
    publishedDate: string;
    category?: string;
    author?: string;
  }[];
  categories?: string[];
  currentPage?: number;
  totalPages?: number;
}

export const BlogTemplate: React.FC<BaseTemplateProps> = ({ page }) => {
  const content = page?.content as unknown as BlogContent || {};
  const { 
    blogs = [], 
    categories = [], 
    currentPage = 1, 
    totalPages = 1 
  } = content;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const handleSearch = () => {
    let filtered = [...blogs];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        }
        return 0;
      });
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="container mx-auto px-4 py-8 rounded-xl my-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8 py-5">Blogs</h1>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4">
            <div className="mb-4 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <input
                type="text"
                placeholder="Search blogs..."
                className="border border-gray-200 p-3 rounded-lg w-full mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="bg-blue-600 text-white p-3 rounded-lg w-full hover:bg-blue-700 transition-all duration-300 mb-4 font-medium shadow-sm hover:shadow-md"
                onClick={handleSearch}
              >
                Search
              </button>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 focus:border-transparent transition-all duration-300"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  handleSearch();
                }}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <select
                className="border border-gray-200 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 focus:border-transparent transition-all duration-300"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  handleSearch();
                }}
              >
                <option value="">Sort By</option>
                <option value="date">Latest First</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="w-full md:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredBlogs.map((blog) => (
                    <div 
                      key={blog.id} 
                      className="rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No blogs found. Try adjusting your search or filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) and (max-width: 1550px) {
          .container {
            padding: 2.5rem;
          }
          .text-4xl {
            font-size: 2.5rem;
          }
          .grid-cols-1 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .md\\:w-1\\/4 {
            width: 30%;
          }
          .md\\:w-3\\/4 {
            width: 70%;
          }
        }
      `}</style>
    </div>
  );
};
