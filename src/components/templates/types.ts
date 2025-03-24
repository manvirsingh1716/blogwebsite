import { Page } from '@prisma/client';

export interface BaseTemplateProps {
  page: Page & {
    template: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      name: string;
      description: string;
      layout: any;
    };
    parent: Page | null;
    children: Array<Page & {
      template: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        layout: any;
      };
    }>;
  };
}

export interface TemplateData extends BaseTemplateProps {
  templateId: string;
  slug: string;
  parentId?: string;
  level: number;
  showInNav: boolean;
}
