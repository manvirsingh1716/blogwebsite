import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { currentAffairsTemplate } from '@/lib/templates/current-affairs'
import { Prisma } from '@prisma/client'

type JsonValue = string | number | boolean | { [key: string]: JsonValue } | JsonValue[] | null;

interface TemplateLayout {
  type: string;
  sections?: JsonValue[];
  defaultMetadata?: {
    level?: number;
    showInNav?: boolean;
  };
  [key: string]: JsonValue | undefined;
}

interface Template {
  name: string;
  description: string;
  layout: TemplateLayout;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { templateName, data } = body

    // Get or create template
    let template = await prisma.template.findUnique({
      where: { name: templateName }
    })

    if (!template) {
      // Create template if it doesn't exist
      let templateData: Template | null = null
      
      if (templateName === 'current-affairs') {
        templateData = currentAffairsTemplate as Template
      }

      if (!templateData) {
        return NextResponse.json(
          { error: 'Invalid template name' },
          { status: 400 }
        )
      }

      template = await prisma.template.create({
        data: {
          name: templateData.name,
          description: templateData.description,
          layout: templateData.layout as Prisma.JsonObject
        }
      })
    }

    // Create page using template
    const page = await prisma.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        content: data.content,
        metadata: data.metadata || {},
        templateId: template.id,
        parentId: data.parentId,
        level: data.level || (template.layout as TemplateLayout)?.defaultMetadata?.level || 1,
        showInNav: data.showInNav ?? (template.layout as TemplateLayout)?.defaultMetadata?.showInNav ?? true,
        order: data.order || 0
      }
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
