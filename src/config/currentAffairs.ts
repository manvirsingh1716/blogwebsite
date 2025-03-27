import { SectionConfig, NavigationSection, FilterOptions } from '../types/currentAffairs';
import newsImage from '../../public/news.png';
export const sectionConfig: SectionConfig = {
  'news-analysis': {
    title: 'Daily News Analysis',
    description: 'In-depth analysis of important current events and their relevance for UPSC Civil Services Examination.',
    topics: ['Environment', 'Economy', 'Polity', 'International Relations', 'Science & Technology'],
    icon: { image: newsImage }
  },
  'hindu-editorial': {
    title: 'The Hindu Editorial Analysis',
    description: 'Comprehensive analysis of The Hindu newspaper editorials with UPSC perspective.',
    topics: ['Economy', 'Polity', 'International Relations', 'Social Issues'],
    icon: { image: newsImage }
  },
  'express-editorial': {
    title: 'Indian Express Editorial Analysis',
    description: 'Detailed analysis of Indian Express editorials relevant for UPSC preparation.',
    topics: ['Governance', 'Economy', 'Social Justice', 'International Affairs'],
    icon: { image: newsImage }
  },
  'pib': {
    title: 'PIB Analysis',
    description: 'Analysis of important Press Information Bureau releases and their UPSC relevance.',
    topics: ['Government Schemes', 'Policy', 'Economy', 'Development'],
    icon: { image: newsImage }
  },
  'mcq-quiz': {
    title: 'Daily MCQ Quiz',
    description: 'Practice multiple choice questions based on current affairs.',
    topics: ['General Studies', 'Current Events', 'Static Topics'],
    icon: { image: newsImage }
  },
  'answer-writing': {
    title: 'Answer Writing Practice',
    description: 'Daily answer writing practice questions for UPSC Mains preparation.',
    topics: ['GS-1', 'GS-2', 'GS-3', 'GS-4'],
    icon: { image: newsImage }
  },
  'compilation': {
    title: 'Monthly Compilation',
    description: 'Comprehensive monthly compilation of important current affairs topics.',
    topics: ['National', 'International', 'Economy', 'Environment', 'Science & Tech'],
    icon: { image: newsImage }
  },
  'yojana': {
    title: 'Yojana Magazine',
    description: 'Analysis of Yojana magazine articles with UPSC perspective.',
    topics: ['Development', 'Economy', 'Social Issues', 'Governance'],
    icon: { image: newsImage }
  },
  'kurukshetra': {
    title: 'Kurukshetra Magazine',
    description: 'Coverage of Kurukshetra magazine focusing on rural development.',
    topics: ['Rural Development', 'Agriculture', 'Social Welfare', 'Economy'],
    icon: { image: newsImage }
  },
  'science-reporter': {
    title: 'Science Reporter',
    description: 'Important science and technology updates for UPSC preparation.',
    topics: ['Science', 'Technology', 'Innovation', 'Research'],
    icon: { image: newsImage }
  },
  'union-budget': {
    title: 'Union Budget',
    description: 'Comprehensive analysis of the Union Budget with UPSC perspective.',
    topics: ['Economy', 'Taxation', 'Development', 'Social Sector'],
    icon: { image: newsImage }
  },
  'economic-survey': {
    title: 'Economic Survey',
    description: 'Key insights and analysis from the Economic Survey of India.',
    topics: ['Economy', 'Growth', 'Development', 'Policy'],
    icon: { image: newsImage }
  },
  'year-end-review': {
    title: 'Year End Review',
    description: 'Annual compilation and analysis of important events and developments.',
    topics: ['National', 'International', 'Economy', 'Social'],
    icon: { image: newsImage }
  }
};

export const navigationSections: NavigationSection[] = [
  {
    title: "Daily Current Affairs",
    items: [
      { title: "Daily News Analysis", path: "/current-affairs/daily/news-analysis", icon: { image: newsImage } },
      { title: "The Hindu Editorial", path: "/current-affairs/daily/hindu-editorial", icon: { image: newsImage } },
      { title: "Indian Express Editorial", path: "/current-affairs/daily/express-editorial", icon: { image: newsImage } },
      { title: "PIB Analysis", path: "/current-affairs/daily/pib", icon: { image: newsImage } },
      { title: "Daily MCQ Quiz", path: "/current-affairs/daily/mcq-quiz", icon: { image: newsImage } },
      { title: "Answer Writing Practice", path: "/current-affairs/daily/answer-writing", icon: { image: newsImage } },
    ]
  },
  {
    title: "Monthly Current Affairs",
    items: [
      { title: "Monthly Compilation", path: "/current-affairs/monthly/compilation", icon: { image: newsImage } },
      { title: "Yojana Magazine", path: "/current-affairs/monthly/yojana", icon: { image: newsImage } },
      { title: "Kurukshetra Magazine", path: "/current-affairs/monthly/kurukshetra", icon: { image: newsImage } },
      { title: "Science Reporter", path: "/current-affairs/monthly/science-reporter", icon: { image: newsImage } },
    ]
  },
  {
    title: "Yearly Current Affairs",
    items: [
      { title: "Union Budget", path: "/current-affairs/yearly/union-budget", icon: { image: newsImage } },
      { title: "Economic Survey", path: "/current-affairs/yearly/economic-survey", icon: { image: newsImage } },
      { title: "Year End Review", path: "/current-affairs/yearly/year-end-review", icon: { image: newsImage } },
    ]
  }
];

export const ITEMS_PER_PAGE = 10;

export const DEFAULT_FILTER_OPTIONS: FilterOptions = {
  sortBy: 'latest',
  topic: 'all'
};