"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  level: number;
  parentId: string | null;
  children?: PageItem[];
}

interface SidebarNavigationProps {
  currentPageId?: string;
  basePath?: string;
  hideParent?: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  currentPageId,
  basePath = '',
  hideParent = false
}) => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const normalizedBasePath = basePath.startsWith('/') ? basePath.substring(1) : basePath;
        const response = await fetch(`/api/pages?basePath=${normalizedBasePath}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        
        if (data.length === 0 && normalizedBasePath) {
          const allPagesResponse = await fetch('/api/pages');
          if (allPagesResponse.ok) {
            const allData = await allPagesResponse.json();
            if (allData.length > 0) {
              const pagesWithChildren = buildPageHierarchy(allData);
              setPages(pagesWithChildren);
              setLoading(false);
              return;
            }
          }
        }
        
        if (data.length > 0) {
          const pagesWithChildren = buildPageHierarchy(data);
          setPages(pagesWithChildren);
        } else {
          setPages([]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setError('Failed to load navigation');
        setLoading(false);
        setPages([]);
      }
    };

    fetchPages();
  }, [basePath]);

  const buildPageHierarchy = (flatPages: PageItem[]): PageItem[] => {
    const pageMap = new Map<string, PageItem>();
    const rootPages: PageItem[] = [];

    // First pass: Create a map of all pages
    flatPages.forEach(page => {
      pageMap.set(page.id, { ...page, children: [] });
    });

    // Second pass: Build the hierarchy
    flatPages.forEach(page => {
      const pageWithChildren = pageMap.get(page.id)!;
      if (page.parentId && pageMap.has(page.parentId)) {
        const parent = pageMap.get(page.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(pageWithChildren);
      } else {
        rootPages.push(pageWithChildren);
      }
    });

    return rootPages.sort((a, b) => a.title.localeCompare(b.title));
  };

  const renderNavItem = (page: PageItem, level: number = 0) => {
    const isCurrentPage = currentPageId === page.id;
    const hasChildren = page.children && page.children.length > 0;

    return (
      <div key={page.id} className="w-full">
        <Link 
          href={`/${page.slug}`}
          className={`
            block py-2.5 px-4 text-[15px] rounded-lg transition-colors duration-200
            ${isCurrentPage ? 'text-blue-700 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}
            ${level === 0 ? 'font-bold text-gray-900' : ''}
            ${level === 1 ? 'font-semibold ml-4' : ''}
            ${level === 2 ? 'font-normal ml-8' : ''}
            ${level >= 3 ? 'font-normal ml-12' : ''}
          `}
        >
          {page.title}
        </Link>
        {hasChildren && page.children && (
          <div className="mt-2 mb-3 space-y-1">
            {page.children.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <nav className="w-full max-h-[80vh] overflow-y-auto custom-scrollbar space-y-3">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
      {pages.map(page => renderNavItem(page))}
    </nav>
  );
};

export default SidebarNavigation;