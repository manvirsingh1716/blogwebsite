import type { FC } from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import type { BaseTemplateProps } from '@/components/templates/types';
import { UpscNotesTemplate } from '@/components/templates/UpscNotesTemplate';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { BlogTemplate } from '@/components/templates/BlogTemplate';
import { GeneralStudiesTemplate } from '@/components/templates/GeneralStudiesTemplate';
import { CurrentAffairsTemplate } from '@/components/templates/CurrentAffairsTemplate';

// Map template IDs to components
const TEMPLATE_MAP: Record<string, FC<BaseTemplateProps>> = {
  'upsc-notes': UpscNotesTemplate,
  'article': ArticleTemplate,
  'about': AboutTemplate,
  'blog': BlogTemplate,
  'general-studies': GeneralStudiesTemplate,
  'current-affairs': CurrentAffairsTemplate,
  'study-material': ArticleTemplate, // Using ArticleTemplate as base for study material
};

async function getPage(slug: string): Promise<BaseTemplateProps['page'] | null> {
  try {
    console.log('Fetching page for slug:', slug);
    
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        template: true,
        parent: true,
        children: {
          include: {
            template: true
          }
        }
      }
    });

    if (!page) {
      console.log('Page not found for slug:', slug);
      return null;
    }

    console.log('Found page:', {
      title: page.title,
      templateId: page.template.id,
      hasParent: !!page.parent,
      childCount: page.children.length
    });

    return page as BaseTemplateProps['page'];
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  // Get the correct template component using template ID
  const Template = TEMPLATE_MAP[page.template.id];

  if (!Template) {
    console.error(`Template ${page.template.id} not found in TEMPLATE_MAP`);
    throw new Error(`Template ${page.template.id} not found`);
  }

  console.log('Rendering page with template:', page.template.id);
  return <Template page={page} />;
}
