import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import type { BaseTemplateProps } from '@/components/templates/types';
import { UpscNotesTemplate } from '@/components/templates/UpscNotesTemplate';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

// Map template names to components
const TEMPLATE_MAP = {
  'upsc-notes': UpscNotesTemplate,
  'article': ArticleTemplate,
  'about': AboutTemplate
};

async function getPage(slug: string, section: string[]): Promise<BaseTemplateProps['page'] | null> {
  try {
    const fullPath = `${slug}/${section.join('/')}`;
    console.log('Fetching page for path:', fullPath);
    
    const page = await prisma.page.findUnique({
      where: { slug: fullPath },
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
      console.log('Page not found for path:', fullPath);
      return null;
    }

    console.log('Found page:', {
      title: page.title,
      template: page.template.name,
      hasParent: !!page.parent,
      childCount: page.children.length
    });

    return page as BaseTemplateProps['page'];
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function Page({ 
  params 
}: { 
  params: { slug: string; section: string[] } 
}) {
  const page = await getPage(params.slug, params.section);

  if (!page) {
    notFound();
  }

  // Get the correct template component
  const Template = TEMPLATE_MAP[page.template.name as keyof typeof TEMPLATE_MAP];

  if (!Template) {
    console.error(`Template ${page.template.name} not found in TEMPLATE_MAP`);
    throw new Error(`Template ${page.template.name} not found`);
  }

  console.log('Rendering page with template:', page.template.name);
  return <Template page={page} />;
}
