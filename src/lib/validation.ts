import { Template } from '@prisma/client';
import prisma from './db';

interface ValidationError {
  field: string;
  message: string;
}

interface TemplateContentSchema {
  type: string;
  required?: string[];
  properties: Record<string, any>;
}

interface TemplateMetadataSchema {
  type: string;
  required?: string[];
  properties: Record<string, any>;
}

interface TemplateRequirement {
  content: TemplateContentSchema;
  metadata: TemplateMetadataSchema;
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

    // Get template requirements using template ID
    const requirements = templateRequirements[template.id];
    if (!requirements) {
      errors.push({ field: 'templateId', message: `Invalid template type: ${template.id}` });
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
            message: `${field} is required in metadata`
          });
        }
      }
    }

    return errors;
  }
}

// Template requirements based on our templates
const templateRequirements: Record<string, TemplateRequirement> = {
  'current-affairs': {
    content: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: { type: 'string' },
        content: { type: 'object' }
      }
    },
    metadata: {
      type: 'object',
      required: ['lastUpdated'],
      properties: {
        lastUpdated: { type: 'string' }
      }
    }
  },
  'article': {
    content: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: { type: 'string' },
        content: { type: 'string' }
      }
    },
    metadata: {
      type: 'object',
      required: ['lastUpdated'],
      properties: {
        lastUpdated: { type: 'string' }
      }
    }
  },
  'general-studies': {
    content: {
      type: 'object',
      required: ['title', 'paper', 'topic', 'subtopic', 'content', 'keyPoints'],
      properties: {
        title: { type: 'string', minLength: 2 },
        paper: { type: 'string', minLength: 1 },
        topic: { type: 'string', minLength: 2 },
        subtopic: { type: 'string', minLength: 2 },
        content: { type: 'string', minLength: 10 },
        importanceLevel: { type: 'string', enum: ['low', 'medium', 'high'] },
        previousYearQuestions: { type: 'string' },
        keyPoints: { type: 'string', minLength: 10 },
        sources: { type: 'string' }
      }
    },
    metadata: {
      type: 'object',
      required: ['lastUpdated'],
      properties: {
        lastUpdated: { type: 'string' }
      }
    }
  },
  'study-material': {
    content: {
      type: 'object',
      required: ['title', 'subject', 'content'],
      properties: {
        title: { type: 'string' },
        subject: { type: 'string' },
        content: { type: 'string' }
      }
    },
    metadata: {
      type: 'object',
      required: ['lastUpdated'],
      properties: {
        lastUpdated: { type: 'string' }
      }
    }
  },
  'about': {
    content: {
      type: 'object',
      required: ['hero', 'mission'],
      properties: {
        hero: {
          type: 'object',
          required: ['title', 'subtitle'],
          properties: {
            title: { type: 'string' },
            subtitle: { type: 'string' }
          }
        },
        mission: { type: 'string' },
        veterans: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'role'],
            properties: {
              name: { type: 'string' },
              role: { type: 'string' },
              bio: { type: 'string' }
            }
          }
        },
        coreMembers: {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'role'],
            properties: {
              name: { type: 'string' },
              role: { type: 'string' },
              bio: { type: 'string' }
            }
          }
        }
      }
    },
    metadata: {
      type: 'object',
      required: ['lastUpdated'],
      properties: {
        lastUpdated: { type: 'string' },
        teamSize: { type: 'number' }
      }
    }
  }
};
