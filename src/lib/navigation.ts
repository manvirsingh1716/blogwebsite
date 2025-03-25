import prisma from './db'

interface NavItem {
  slug: string
  title: string
  children: NavItem[]
}

export async function getNavigationTree(): Promise<NavItem[]> {
  const pages = await prisma.page.findMany({
    select: {
      slug: true,
      title: true,
    },
    orderBy: {
      slug: 'asc',
    },
  })

  const tree: NavItem[] = []

  // Build the navigation tree
  pages.forEach((page) => {
    const parts = page.slug.split('/')
    let currentLevel = tree

    parts.forEach((part, index) => {
      const currentPath = parts.slice(0, index + 1).join('/')
      const existing = currentLevel.find(item => item.slug === currentPath)

      if (existing) {
        currentLevel = existing.children
      } else {
        const newItem: NavItem = {
          slug: currentPath,
          title: index === parts.length - 1 ? page.title : part,
          children: [],
        }
        currentLevel.push(newItem)
        currentLevel = newItem.children
      }
    })
  })

  return tree
}
