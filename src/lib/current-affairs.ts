import prisma from './db'

interface CreateCurrentAffairsOptions {
  title: string;
  date: string;
  category: string;
  content: {
    introduction: string;
    keyPoints: string[];
    conclusion: string;
  };
  tags?: string[];
  source?: string;
}

export async function createCurrentAffairsPage(options: CreateCurrentAffairsOptions) {
  const { title, date, category, content, tags = [], source } = options
  
  // Generate slug from date and title
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const month = dateObj.toLocaleString('default', { month: 'lowercase' })
  const slug = `current-affairs/${year}/${month}/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`

  // Find or create year and month parent pages
  const yearSlug = `current-affairs/${year}`
  const monthSlug = `${yearSlug}/${month}`

  // Create year page if it doesn't exist
  const yearPage = await prisma.page.upsert({
    where: { slug: yearSlug },
    create: {
      slug: yearSlug,
      title: `${year} Current Affairs`,
      content: { type: 'year-index' },
      templateId: await getTemplateId('current-affairs'),
      level: 2
    },
    update: {}
  })

  // Create month page if it doesn't exist
  const monthPage = await prisma.page.upsert({
    where: { slug: monthSlug },
    create: {
      slug: monthSlug,
      title: `${month.charAt(0).toUpperCase() + month.slice(1)} ${year} Current Affairs`,
      content: { type: 'month-index' },
      templateId: await getTemplateId('current-affairs'),
      parentId: yearPage.id,
      level: 3
    },
    update: {}
  })

  // Create the actual current affairs page
  return prisma.page.create({
    data: {
      slug,
      title,
      content: {
        title,
        date,
        content,
        metadata: {
          category,
          tags,
          source,
          lastUpdated: new Date().toISOString()
        }
      },
      templateId: await getTemplateId('current-affairs'),
      parentId: monthPage.id,
      level: 4
    }
  })
}

async function getTemplateId(name: string) {
  const template = await prisma.template.findUnique({
    where: { name }
  })
  return template?.id
}
