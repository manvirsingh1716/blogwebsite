"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ 
  currentPageId,
  basePath = '/upsc'
}) => {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        // In a real implementation, this would be an API call
        const response = await fetch(`/api/pages?basePath=${basePath}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        
        // Transform flat list into hierarchical structure
        const pagesWithChildren = buildPageHierarchy(data);
        setPages(pagesWithChildren);
        
        // Auto-expand the current page's path
        if (currentPageId) {
          autoExpandCurrentPath(data, currentPageId);
        }
      } catch (err) {
        console.error('Error fetching pages:', err);
        setError('Failed to load navigation');
        
        // For development, use mock data
        const mockData = generateMockPages();
        const pagesWithChildren = buildPageHierarchy(mockData);
        setPages(pagesWithChildren);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [basePath, currentPageId]);

  const buildPageHierarchy = (flatPages: PageItem[]): PageItem[] => {
    const pagesMap: Record<string, PageItem> = {};
    const rootPages: PageItem[] = [];

    // First pass: create map of all pages
    flatPages.forEach(page => {
      pagesMap[page.id] = { ...page, children: [] };
    });

    // Second pass: build hierarchy
    flatPages.forEach(page => {
      if (page.parentId && pagesMap[page.parentId]) {
        if (!pagesMap[page.parentId].children) {
          pagesMap[page.parentId].children = [];
        }
        pagesMap[page.parentId].children!.push(pagesMap[page.id]);
      } else {
        rootPages.push(pagesMap[page.id]);
      }
    });

    return rootPages;
  };

  const autoExpandCurrentPath = (flatPages: PageItem[], currentId: string) => {
    const newExpandedItems: Record<string, boolean> = { ...expandedItems };
    
    // Find the current page
    const currentPage = flatPages.find(page => page.id === currentId);
    if (!currentPage) return;
    
    // Find all ancestors and expand them
    let parentId = currentPage.parentId;
    while (parentId) {
      newExpandedItems[parentId] = true;
      const parent = flatPages.find(page => page.id === parentId);
      if (!parent) break;
      parentId = parent.parentId;
    }
    
    setExpandedItems(newExpandedItems);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const generateMockPages = (): PageItem[] => {
    return [
      { id: '1', title: 'UPSC Overview', slug: 'overview', level: 1, parentId: null },
      { id: '2', title: 'Prelims', slug: 'prelims', level: 1, parentId: null },
      { id: '3', title: 'General Studies', slug: 'prelims/general-studies', level: 2, parentId: '2' },
      { id: '4', title: 'CSAT', slug: 'prelims/csat', level: 2, parentId: '2' },
      { id: '5', title: 'Mains', slug: 'mains', level: 1, parentId: null },
      { id: '6', title: 'GS Paper 1', slug: 'mains/gs-paper-1', level: 2, parentId: '5' },
      { id: '7', title: 'History', slug: 'mains/gs-paper-1/history', level: 3, parentId: '6' },
      { id: '8', title: 'Geography', slug: 'mains/gs-paper-1/geography', level: 3, parentId: '6' },
      { id: '9', title: 'GS Paper 2', slug: 'mains/gs-paper-2', level: 2, parentId: '5' },
      { id: '10', title: 'Interview', slug: 'interview', level: 1, parentId: null },
    ];
  };

  const renderPageItem = (page: PageItem, depth: number = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = expandedItems[page.id] || false;
    const isActive = pathname === `${basePath}/${page.slug}` || currentPageId === page.id;
    
    return (
      <div key={page.id} className="w-full">
        <div className="flex items-center w-full">
          {hasChildren && (
            <button
              onClick={() => toggleExpand(page.id)}
              className="mr-1 p-1 text-gray-500 hover:text-blue-500 focus:outline-none"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
          
          {!hasChildren && <div className="w-6"></div>}
          
          <Link 
            href={`${basePath}/${page.slug}`}
            className={`py-1.5 px-2 text-sm rounded-md flex-grow transition-colors ${
              isActive 
                ? 'bg-blue-50 text-blue-600 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{ paddingLeft: `${(depth * 0.5) + 0.5}rem` }}
          >
            {page.title}
          </Link>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-2 pl-2 border-l border-gray-200">
            {page.children!.map(child => renderPageItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="py-4 text-center text-gray-500">Loading navigation...</div>;
  }

  if (error) {
    return <div className="py-4 text-center text-red-500">{error}</div>;
  }

  return (
    <nav className="space-y-1 w-full">
      {pages.length > 0 ? (
        pages.map(page => renderPageItem(page))
      ) : (
        <div className="py-4 text-center text-gray-500">No pages available</div>
      )}
    </nav>
  );
};

export default SidebarNavigation;