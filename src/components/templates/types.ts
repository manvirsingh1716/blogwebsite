import { Page, Template } from '@prisma/client';

export interface BaseTemplateProps {
  page: Page & {
    template: Template;
    parent: Page | null;
    children: Page[];
  };
}

export interface JsonContent {
  [key: string]: any;
}

export interface JsonMetadata {
  [key: string]: any;
}

export interface TemplateData extends BaseTemplateProps {
  slug: string;
  parentId?: string;
  level: number;
  showInNav: boolean;
}