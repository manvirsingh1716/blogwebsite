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
  'current-affairs': {
    content: {
      type: 'object',
      required: ['title', 'date', 'content'],
      properties: {
        title: { type: 'string', description: 'Title of the current affairs article' },
        date: { type: 'string', description: 'Date of the article' },
        content: {
          type: 'object',
          required: ['introduction', 'keyPoints', 'conclusion'],
          properties: {
            introduction: { type: 'string', description: 'Introduction to the topic' },
            keyPoints: {
              type: 'array',
              items: { type: 'string' },
              description: 'Key points of the article'
            },
            conclusion: { type: 'string', description: 'Concluding remarks' }
          }
        }
      }
    },
    metadata: {
      type: 'object',
      required: ['category', 'source'],
      properties: {
        category: { type: 'string', description: 'Category of the article' },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Related tags'
        },
        source: { type: 'string', description: 'Source of the information' },
        lastUpdated: { type: 'string', description: 'Last update timestamp' }
      }
    }
  },
  'about': {
    content: {
      type: 'object',
      required: ['hero', 'mission', 'veterans', 'coreMembers'],
      properties: {
        hero: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: { type: 'string', description: 'Hero section title' },
            description: { type: 'string', description: 'Hero section description' }
          }
        },
        mission: { type: 'string', description: 'Mission statement' },
        veterans: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'image', 'info'],
            properties: {
              name: { type: 'string', description: 'Team member name' },
              image: { type: 'string', description: 'Team member image URL' },
              info: { type: 'string', description: 'Team member information' }
            }
          }
        },
        coreMembers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'image', 'info'],
            properties: {
              name: { type: 'string', description: 'Team member name' },
              image: { type: 'string', description: 'Team member image URL' },
              info: { type: 'string', description: 'Team member information' }
            }
          }
        }
      }
    },
    metadata: {
      type: 'object',
      required: [],
      properties: {
        lastUpdated: { type: 'string', description: 'Last update date' },
        teamSize: { type: 'number', description: 'Total team size' }
      }
    }
  },
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
