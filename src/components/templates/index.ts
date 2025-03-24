export * from './types';
export * from './UpscNotesTemplate';
export * from './CurrentAffairsTemplate';
export * from './GeneralStudiesTemplate';
export * from './BlogTemplate';
export * from './AboutTemplate';
export * from './ArticleTemplate';

// Template mapping for dynamic template selection
export const templateMap = {
  'upsc-notes': UpscNotesTemplate,
  'current-affairs': CurrentAffairsTemplate,
  'general-studies': GeneralStudiesTemplate,
  'blog': BlogTemplate,
  'about': AboutTemplate,
  'article': ArticleTemplate,
} as const;

export type TemplateType = keyof typeof templateMap;
