import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/db';
import type { BaseTemplateProps } from '@/components/templates/types';
import { UpscNotesTemplate } from '@/components/templates/UpscNotesTemplate';
import { ArticleTemplate } from '@/components/templates/ArticleTemplate';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { BlogTemplate } from '@/components/templates/BlogTemplate';
import { GeneralStudiesTemplate } from '@/components/templates/GeneralStudiesTemplate';
import { CurrentAffairsTemplate } from '@/components/templates/CurrentAffairsTemplate';

// Map template IDs to components
const TEMPLATE_MAP: Record<string, React.FC<BaseTemplateProps>> = {
  'upsc-notes': UpscNotesTemplate,
  'article': ArticleTemplate,
  'about': AboutTemplate,
  'blog': BlogTemplate,
  'general-studies': GeneralStudiesTemplate,
  'current-affairs': CurrentAffairsTemplate,
  'study-material': ArticleTemplate, // Using ArticleTemplate as base for study material
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

type PageProps = {
  params: { slug: string; section: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug, section } = params;
  const page = await getPage(slug, section);

  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: page.title,
    description: (page.metadata as { description?: string })?.description || `${page.title} - 99Notes`,
  };
};

export default async function Page({ params }: PageProps) {
  const { slug, section } = params;
  const page = await getPage(slug, section);

  if (!page) {
    notFound();
  }

  // Get the correct template component using template ID
  const TemplateComponent = TEMPLATE_MAP[page.template.id];
  if (!TemplateComponent) {
    console.error('No template component found for:', page.template.id);
    notFound();
  }

  console.log('Rendering page with template:', page.template.id);
  return <TemplateComponent page={page} />;
}
