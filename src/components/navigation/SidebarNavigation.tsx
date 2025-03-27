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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        
        // Normalize basePath to handle different formats
        const normalizedBasePath = basePath.startsWith('/') ? basePath.substring(1) : basePath;
        console.log(`Fetching pages for normalized base path: ${normalizedBasePath}`);
        
        // Use Next.js API route directly
        const response = await fetch(`/api/pages?basePath=${normalizedBasePath}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        
        console.log(`Fetched ${data.length} pages for basePath: ${normalizedBasePath}`);
        console.log('Page data:', data);
        
        // If no pages were returned, try without basePath filtering
        if (data.length === 0 && normalizedBasePath) {
          console.log('No pages found with basePath filter, trying without filter');
          const allPagesResponse = await fetch('/api/pages');
          if (allPagesResponse.ok) {
            const allData = await allPagesResponse.json();
            console.log(`Fetched ${allData.length} pages without filter`);
            console.log('All pages data:', allData);
            
            if (allData.length > 0) {
              // Transform flat list into hierarchical structure
              const pagesWithChildren = buildPageHierarchy(allData);
              console.log('Hierarchical pages built successfully');
              setPages(pagesWithChildren);
              
              // Auto-expand the current page's path
              if (currentPageId) {
                autoExpandCurrentPath(allData, currentPageId);
              }
              
              setLoading(false);
              return;
            }
          }
        }
        
        if (data.length > 0) {
          // Transform flat list into hierarchical structure
          const pagesWithChildren = buildPageHierarchy(data);
          console.log('Hierarchical pages built successfully');
          setPages(pagesWithChildren);
          
          // Auto-expand the current page's path
          if (currentPageId) {
            autoExpandCurrentPath(data, currentPageId);
          }
        } else {
          // No pages found, just set empty array
          console.log('No pages found');
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
  }, [basePath, currentPageId]);

  const buildPageHierarchy = (pages: PageItem[]): PageItem[] => {
    // Create a map of pages by ID for quick lookup
    const pagesById = new Map<string, PageItem>();
    pages.forEach(page => {
      pagesById.set(page.id, { ...page, children: [] });
    });
    
    // Create a map to track pages by slug for slug-based relationships
    const pagesBySlug = new Map<string, PageItem>();
    pages.forEach(page => {
      pagesBySlug.set(page.slug, pagesById.get(page.id) || { ...page, children: [] });
    });
    
    // First pass: build hierarchy based on parentId
    const rootPages: PageItem[] = [];
    
    pages.forEach(page => {
      const pageWithChildren = pagesById.get(page.id);
      if (!pageWithChildren) return;
      
      if (page.parentId) {
        // If page has a parentId, add it as a child of that parent
        const parent = pagesById.get(page.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(pageWithChildren);
        } else {
          // If parent not found by ID, add to root
          rootPages.push(pageWithChildren);
        }
      } else {
        // If no parentId, it's a root page
        rootPages.push(pageWithChildren);
      }
    });
    
    // Second pass: check for slug-based relationships for pages without proper parentId
    pages.forEach(page => {
      // Skip pages that already have a parent
      if (page.parentId && pagesById.has(page.parentId)) return;
      
      const pageWithChildren = pagesById.get(page.id);
      if (!pageWithChildren) return;
      
      // If page is already in rootPages from first pass, skip
      if (rootPages.some(p => p.id === page.id)) return;
      
      // Check if this page's slug indicates a parent-child relationship
      const slugParts = page.slug.split('/');
      if (slugParts.length > 1) {
        // Try to find a parent based on the slug prefix
        const parentSlug = slugParts.slice(0, -1).join('/');
        const potentialParent = pagesBySlug.get(parentSlug);
        
        if (potentialParent) {
          potentialParent.children = potentialParent.children || [];
          potentialParent.children.push(pageWithChildren);
          console.log(`Added ${page.title} as child of ${potentialParent.title} based on slug pattern`);
        } else {
          // If no parent found by slug, add to root
          rootPages.push(pageWithChildren);
        }
      } else if (!rootPages.some(p => p.id === page.id)) {
        // If it's a single-segment slug and not already in rootPages, add it
        rootPages.push(pageWithChildren);
      }
    });
    
    // Sort pages by title
    return rootPages.sort((a, b) => a.title.localeCompare(b.title));
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

  const renderPageItem = (page: PageItem, depth: number = 0) => {
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = expandedItems[page.id] || false;
    const isActive = pathname === `/${page.slug}` || currentPageId === page.id;
    
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
            href={`/${page.slug}`}
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
        pages.map(page => {
          // Skip rendering the parent page if hideParent is true and we're on a child page
          if (hideParent && pathname) {
            // Get the current page slug from the pathname
            const currentPageSlug = pathname.substring(1); // Remove leading slash
            
            // If this is the parent page of the current page, only render its children
            if (currentPageSlug.startsWith(page.slug + '/')) {
              // Only render this page's children
              return page.children?.map((child, index) => (
                <React.Fragment key={child.id || index}>
                  {renderPageItem(child)}
                </React.Fragment>
              )) || null;
            }
          }
          
          return renderPageItem(page);
        })
      ) : (
        <div className="py-4 text-center text-gray-500">No pages available</div>
      )}
    </nav>
  );
};

export default SidebarNavigation;