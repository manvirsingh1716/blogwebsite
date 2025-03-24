import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { Template, Prisma } from '@prisma/client';

interface TemplateLayout {
  type: string;
  description: string;
  structure: Record<string, unknown>;
}

// Define the required data structure for each template type
const templateRequirements = {
  'toc-content': {
    content: {
      type: 'object',
      required: ['body'],
      properties: {
        body: { type: 'string', description: 'Main content of the page' }
      }
    },
    metadata: {
      type: 'object',
      required: [],
      properties: {
        description: { type: 'string', description: 'Page description' },
        keywords: { type: 'array', items: { type: 'string' }, description: 'SEO keywords' }
      }
    }
  },
  'links-content-toc': {
    content: {
      type: 'object',
      required: ['body'],
      properties: {
        body: { type: 'string', description: 'Main content of the page' }
      }
    },
    metadata: {
      type: 'object',
      required: [],
      properties: {
        description: { type: 'string', description: 'Page description' },
        keywords: { type: 'array', items: { type: 'string' }, description: 'SEO keywords' }
      }
    }
  },
  'content-profile': {
    content: {
      type: 'object',
      required: ['body'],
      properties: {
        body: { type: 'string', description: 'Main content/bio text' }
      }
    },
    metadata: {
      type: 'object',
      required: ['profileImage'],
      properties: {
        profileImage: { type: 'string', description: 'URL to profile image' },
        contactInfo: {
          type: 'object',
          properties: {
            email: { type: 'string', description: 'Contact email' },
            phone: { type: 'string', description: 'Contact phone number' },
            location: { type: 'string', description: 'Location information' }
          }
        },
        socialLinks: {
          type: 'object',
          properties: {
            linkedin: { type: 'string', description: 'LinkedIn profile URL' },
            twitter: { type: 'string', description: 'Twitter profile URL' },
            github: { type: 'string', description: 'GitHub profile URL' }
          }
        },
        description: { type: 'string', description: 'Short bio or description' },
        keywords: { type: 'array', items: { type: 'string' }, description: 'SEO keywords' }
      }
    }
  }
};

export async function GET() {
  try {
    const templates = await prisma.template.findMany();
    
    // Enhance templates with their requirements
    const enhancedTemplates = templates.map(template => {
      const layout = template.layout as unknown as TemplateLayout;
      const layoutType = layout?.type as keyof typeof templateRequirements;
      
      return {
        ...template,
        requirements: layoutType ? templateRequirements[layoutType] : null
      };
    });

    return NextResponse.json(enhancedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
