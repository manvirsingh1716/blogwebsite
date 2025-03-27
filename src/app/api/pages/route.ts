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

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: pageInclude
    });
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
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