import { env } from '@/config/env';
import prisma from './db'
import { NavItem } from '@/types/navigation';
import { staticNavigationItems } from '@/config/staticNavigation';

export async function getNavigationTree(): Promise<NavItem[]> {
  const response = await fetch(`${env.API}/page/order`);
  const res = await response.json();
  const pages = res.data;
  // const pages = await prisma.page.findMany({
  //   select: {
  //     slug: true,
  //     title: true,
  //   },
  //   orderBy: {
  //     slug: 'asc',
  //   },
  // })

  const tree: NavItem[] = []

  // Build the navigation tree
  interface Page {
    slug: string;
    title: string;
  }

  interface PageResponse {
    data: Page[];
  }

  pages?.forEach((page: Page) => {
    const parts: string[] = page.slug.split('/');
    let currentLevel: NavItem[] = tree;

    parts?.forEach((part: string, index: number) => {
      const currentPath: string = parts.slice(0, index + 1).join('/');
      const existing: NavItem | undefined = currentLevel.find(item => item.slug === currentPath);

      if (existing) {
        currentLevel = existing.children;
      } else {
        const newItem: NavItem = {
          slug: currentPath,
          title: index === parts.length - 1 ? page.title : part,
          children: [],
        };
        currentLevel.push(newItem);
        currentLevel = newItem.children;
      }
    });
  });

  // Merge static navigation items with the dynamic ones
  // First, filter out any potential conflicts (items with the same slug)
  const dynamicTopLevelSlugs = tree.map(item => item.slug);
  const filteredStaticItems = staticNavigationItems.filter(
    item => !dynamicTopLevelSlugs.includes(item.slug)
  );

  // Combine the trees
  return [...tree, ...filteredStaticItems];
}

export async function getFooterLinks(): Promise<NavItem[]> {
  const response = await fetch(`${env.API}/page/order`);
  const res = await response.json();
  const pages = res.data;
  // const pages = await prisma.page.findMany({
  //   select: {
  //     slug: true,
  //     title: true,
  //   },
  //   orderBy: {
  //     slug: 'asc',
  //   },
  // })

  const tree: NavItem[] = []

  // Build the footer links tree (up to 2 levels)
  interface Page {
    slug: string;
    title: string;
  }

  pages?.forEach((page: Page) => {
    const parts: string[] = page.slug.split('/');
    if (parts.length > 2) return; // Skip deeper levels

    let currentLevel: NavItem[] = tree;

    parts?.forEach((part: string, index: number) => {
      const currentPath: string = parts.slice(0, index + 1).join('/');
      const existing: NavItem | undefined = currentLevel.find(item => item.slug === currentPath);

      if (existing) {
        currentLevel = existing.children;
      } else {
        const newItem: NavItem = {
          slug: currentPath,
          title: index === parts.length - 1 ? page.title : part,
          children: [],
        };
        currentLevel.push(newItem);
        currentLevel = newItem.children;
      }
    });
  });

  return tree;
}