import { Template } from '@prisma/client';
import prisma from './db';

interface ValidationError {
  field: string;
  message: string;
}

export class ValidationService {
  static async validatePageData(data: any, templateId: string): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    // Fetch template
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    });

    if (!template) {
      errors.push({ field: 'templateId', message: 'Template not found' });
      return errors;
    }

    // Get template requirements
    const requirements = templateRequirements[template.name as keyof typeof templateRequirements];
    if (!requirements) {
      errors.push({ field: 'templateId', message: 'Invalid template type' });
      return errors;
    }

    // Validate content
    if (requirements.content.required) {
      for (const field of requirements.content.required) {
        if (!data.content?.[field]) {
          errors.push({
            field: `content.${field}`,
            message: `${field} is required`
          });
        }
      }
    }

    // Validate metadata
    if (requirements.metadata.required) {
      for (const field of requirements.metadata.required) {
        if (!data.metadata?.[field]) {
          errors.push({
            field: `metadata.${field}`,
            message: `${field} is required`
          });
        }
      }
    }

    return errors;
  }
}

// Template requirements based on our templates
const templateRequirements = {
  'upsc-notes': {
    content: {
      type: 'object',
      required: ['mainContent'],
      properties: {
        mainContent: { type: 'string', description: 'Main content of the notes' }
      }
    },
    metadata: {
      type: 'object',
      required: ['keywords', 'relatedTopics'],
      properties: {
        keywords: { type: 'array', items: { type: 'string' }, description: 'Topic keywords' },
        relatedTopics: { type: 'array', items: { type: 'string' }, description: 'Related topics' }
      }
    }
  },
  'general-studies': {
    content: {
      type: 'object',
      required: ['notes', 'summary', 'practiceQuestions'],
      properties: {
        notes: { type: 'string', description: 'Detailed notes' },
        summary: { type: 'string', description: 'Quick summary points' },
        practiceQuestions: { 
          type: 'array', 
          items: { 
            type: 'object',
            properties: {
              question: { type: 'string' },
              answer: { type: 'string' }
            }
          }
        }
      }
    },
    metadata: {
      type: 'object',
      required: ['subjects', 'previousYearQuestions'],
      properties: {
        subjects: { type: 'array', items: { type: 'string' }, description: 'Related subjects' },
        previousYearQuestions: { 
          type: 'array', 
          items: { 
            type: 'object',
            properties: {
              year: { type: 'number' },
              question: { type: 'string' }
            }
          }
        }
      }
    }
  },
  'current-affairs': {
    content: {
      type: 'object',
      required: ['mainContent'],
      properties: {
        mainContent: { type: 'string', description: 'Main article content' }
      }
    },
    metadata: {
      type: 'object',
      required: ['date', 'category', 'summary', 'relatedTopics', 'examRelevance'],
      properties: {
        date: { type: 'string', format: 'date', description: 'Article date' },
        category: { type: 'string', description: 'News category' },
        summary: { type: 'string', description: 'Quick summary' },
        relatedTopics: { type: 'array', items: { type: 'string' }, description: 'Related syllabus topics' },
        examRelevance: { 
          type: 'object',
          properties: {
            prelims: { type: 'boolean' },
            mains: { type: 'boolean' },
            essay: { type: 'boolean' },
            notes: { type: 'string', description: 'How to use in exam' }
          }
        }
      }
    }
  },
  'article': {
    content: {
      type: 'object',
      required: ['introduction', 'mainContent', 'conclusion'],
      properties: {
        introduction: { type: 'string', description: 'Article introduction' },
        mainContent: { type: 'string', description: 'Main article content' },
        conclusion: { type: 'string', description: 'Article conclusion' }
      }
    },
    metadata: {
      type: 'object',
      required: ['author', 'category'],
      properties: {
        author: { type: 'string', description: 'Article author' },
        category: { type: 'string', description: 'Article category' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Article tags' }
      }
    }
  },
  'blog': {
    content: {
      type: 'object',
      required: ['content'],
      properties: {
        content: { type: 'string', description: 'Blog post content' }
      }
    },
    metadata: {
      type: 'object',
      required: ['author', 'publishDate', 'category'],
      properties: {
        author: { 
          type: 'object',
          properties: {
            name: { type: 'string' },
            bio: { type: 'string' },
            image: { type: 'string' }
          }
        },
        publishDate: { type: 'string', format: 'date' },
        category: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } }
      }
    }
  },
  'about': {
    content: {
      type: 'object',
      required: ['mainContent'],
      properties: {
        mainContent: { type: 'string', description: 'About content' }
      }
    },
    metadata: {
      type: 'object',
      required: ['profileImage', 'name'],
      properties: {
        name: { type: 'string' },
        profileImage: { type: 'string' },
        contactInfo: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            phone: { type: 'string' },
            location: { type: 'string' }
          }
        },
        socialLinks: {
          type: 'object',
          properties: {
            linkedin: { type: 'string' },
            twitter: { type: 'string' },
            github: { type: 'string' }
          }
        }
      }
    }
  }
};
