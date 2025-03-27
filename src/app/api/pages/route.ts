import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Prisma, Page, Template } from '@prisma/client';
import { ValidationService } from '@/lib/validation';

type PageWithTemplate = Page & {
  template: Template;
};

type PageWithRelations = PageWithTemplate & {
  parent?: PageWithRelations;
  children: PageWithTemplate[];
};

type PagePathInfo = {
  slug: string;
  parentId: string | null;
};

type PageLevelInfo = {
  level: number;
};

interface PagePathData {
  slug: string;
  parentId: string | null;
}

// Define a single level of page include
const basePageInclude = {
  template: true,
  children: {
    include: {
      template: true
    }
  }
};

// Create nested includes dynamically
function createNestedInclude(depth: number) {
  let include: any = { ...basePageInclude };
  let current = include;
  
  for (let i = 0; i < depth; i++) {
    current.parent = {
      include: { ...basePageInclude }
    };
    current = current.parent.include;
  }
  
  return include;
}

// Use 6 levels of nesting (for 7 total levels including root)
const pageInclude = createNestedInclude(6);

class PageService {
  // Helper function to build complete page path
  static async buildPagePath(parentId: string | null): Promise<string> {
    if (!parentId) return '';

    const parent = await prisma.page.findUnique({
      where: { id: parentId },
      select: { 
        slug: true,
        parentId: true 
      }
    }) as { slug: string; parentId: string | null } | null;

    if (!parent) throw new Error('Parent page not found');

    // Get the parent's own slug (last part of the path)
    const parentSlug = parent.slug.split('/').pop() || parent.slug;

    // Get the grandparent's path
    const grandparentPath = await this.buildPagePath(parent.parentId);
    return grandparentPath ? `${grandparentPath}/${parentSlug}` : parentSlug;
  }

  // Calculate page level based on parent chain
  static async calculatePageLevel(parentId: string | null): Promise<number> {
    if (!parentId) return 1;

    const parent = await prisma.page.findUnique({
      where: { id: parentId },
      select: { level: true }
    }) as { level: number } | null;

    if (!parent) throw new Error('Parent page not found');
    return parent.level + 1;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const basePath = searchParams.get('basePath') || '';
    
    console.log('Fetching pages with basePath:', basePath);
    
    // Try to fetch from backend first
    try {
      const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000/api/v1';
      const apiUrl = `${backendUrl}/page`;
      
      console.log('Fetching pages from backend:', apiUrl);
      
      const response = await fetch(apiUrl, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // Set a reasonable timeout to avoid hanging
        signal: AbortSignal.timeout(5000)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        const pages = responseData.data || [];
        
        console.log(`Found ${pages.length} pages from backend`);
        
        if (pages.length > 0) {
          // Process pages as before
          pages.forEach((page: any) => {
            console.log(`Page: ${page.title}, Slug: ${page.slug}, Level: ${page.level}, ParentID: ${page.parentId || 'null'}`);
          });
          
          // If basePath is empty, return all pages without filtering
          let filteredPages = pages;
          
          if (basePath && basePath !== '') {
            // Filter logic remains the same
            const normalizedBasePath = basePath.startsWith('/') ? basePath.substring(1) : basePath;
            
            filteredPages = pages.filter((page: any) => {
              const normalizedPageSlug = page.slug.startsWith('/') ? page.slug.substring(1) : page.slug;
              
              return (
                normalizedPageSlug === normalizedBasePath ||
                normalizedPageSlug.startsWith(normalizedBasePath + '/') ||
                normalizedBasePath.startsWith(normalizedPageSlug + '/') ||
                (normalizedPageSlug.indexOf('/') === -1 && normalizedBasePath.startsWith(normalizedPageSlug))
              );
            });
          }
          
          console.log(`Filtered to ${filteredPages.length} pages for basePath: ${basePath}`);
          
          // Transform the data to match the expected format for the sidebar
          const transformedPages = filteredPages.map((page: any) => ({
            id: page.id.toString(),
            title: page.title,
            slug: page.slug,
            level: page.level,
            parentId: page.parentId ? page.parentId.toString() : null
          }));
          
          return NextResponse.json(transformedPages);
        }
      }
      
      // If we get here, either the response wasn't OK or we got 0 pages
      console.log('Backend API failed or returned 0 pages, falling back to direct database access');
    } catch (backendError) {
      console.error('Error fetching from backend:', backendError);
      console.log('Falling back to direct database access');
    }
    
    // Fallback to direct database access
    try {
      // Get all pages with their relationships
      const pages = await prisma.page.findMany({
        include: {
          parent: {
            select: {
              id: true,
              title: true,
              level: true
            }
          },
          children: {
            select: {
              id: true,
              title: true,
              slug: true,
              level: true,
              parentId: true
            }
          }
        },
        orderBy: {
          title: 'asc'
        }
      });
      
      console.log(`Found ${pages.length} pages from database`);
      
      if (pages.length === 0) {
        // Return empty array if no pages found
        return NextResponse.json([]);
      }
      
      pages.forEach((page: any) => {
        console.log(`Page: ${page.title}, Slug: ${page.slug}, Level: ${page.level}, ParentID: ${page.parentId || 'null'}`);
      });
      
      // If basePath is empty, return all pages without filtering
      let filteredPages = pages;
      
      if (basePath && basePath !== '') {
        // Remove leading slash if present for consistent comparison
        const normalizedBasePath = basePath.startsWith('/') ? basePath.substring(1) : basePath;
        
        filteredPages = pages.filter((page: any) => {
          const normalizedPageSlug = page.slug.startsWith('/') ? page.slug.substring(1) : page.slug;
          
          return (
            // The page is the basePath itself
            normalizedPageSlug === normalizedBasePath ||
            // The page is under the basePath
            normalizedPageSlug.startsWith(normalizedBasePath + '/') ||
            // The basePath is under this page (this page is a parent)
            normalizedBasePath.startsWith(normalizedPageSlug + '/') ||
            // Special case for root pages when basePath doesn't have a slash
            (normalizedPageSlug.indexOf('/') === -1 && normalizedBasePath.startsWith(normalizedPageSlug))
          );
        });
      }
      
      console.log(`Filtered to ${filteredPages.length} pages for basePath: ${basePath}`);
      
      // Transform the data to match the expected format for the sidebar
      const transformedPages = filteredPages.map((page: any) => ({
        id: page.id.toString(),
        title: page.title,
        slug: page.slug,
        level: page.level,
        parentId: page.parentId ? page.parentId.toString() : null
      }));
      
      return NextResponse.json(transformedPages);
    } catch (dbError) {
      console.error('Error accessing database directly:', dbError);
      // Return empty array if both methods fail
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Parse content and metadata if they are strings
    let contentObj = data.content;
    let metadataObj = data.metadata;
    
    try {
      if (typeof data.content === 'string') {
        contentObj = JSON.parse(data.content);
      }
      
      if (typeof data.metadata === 'string') {
        metadataObj = JSON.parse(data.metadata);
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON format in content or metadata' },
        { status: 400 }
      );
    }

    // Update data with parsed objects
    const processedData = {
      ...data,
      content: contentObj,
      metadata: metadataObj
    };

    // Validate template-specific data
    const validationErrors = await ValidationService.validatePageData(processedData, data.templateId);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Build complete page path
    const parentPath = await PageService.buildPagePath(data.parentId);
    const fullSlug = parentPath ? `${parentPath}/${data.slug}` : data.slug;

    // Check if slug is unique
    const existingPage = await prisma.page.findUnique({
      where: { slug: fullSlug }
    });

    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 400 }
      );
    }

    // Calculate the page level
    const level = await PageService.calculatePageLevel(data.parentId);
    
    // Create the page with full slug path
    const page = await prisma.page.create({
      data: {
        slug: fullSlug,
        title: data.title,
        content: contentObj,
        metadata: metadataObj,
        templateId: data.templateId,
        level,
        showInNav: level <= 4,
        ...(data.parentId ? { parentId: data.parentId } : {})
      },
      include: pageInclude
    });

    return NextResponse.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('Error creating page:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}