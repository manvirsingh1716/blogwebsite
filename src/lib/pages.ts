import prisma from './db'

export async function getPageBySlug(slug: string) {
  const page = await prisma.page.findUnique({
    where: { slug },
    include: {
      template: true,
    },
  })
  return page
}

export async function getAllPages() {
  const pages = await prisma.page.findMany({
    include: {
      template: true,
    },
  })
  return pages
}
