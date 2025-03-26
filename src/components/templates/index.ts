export * from './types';
import { UpscNotesTemplate } from './UpscNotesTemplate';
import { GeneralStudiesTemplate } from './GeneralStudiesTemplate';
import { ArticleTemplate } from './ArticleTemplate';

// Template mapping for dynamic template selection
export const templateMap = {
  'upsc-notes': UpscNotesTemplate,
  'general-studies': GeneralStudiesTemplate,
  'article': ArticleTemplate,
} as const;

export type TemplateType = keyof typeof templateMap;
