import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create UPSC Notes Template
  await prisma.template.create({
    data: {
      name: 'upsc-notes',
      layout: {
        type: 'content-toc',
        description: 'Standard UPSC notes template with table of contents and related topics',
        structure: {
          mainContent: { type: 'content', width: '75%' },
          rightSidebar: { type: 'toc-related', width: '25%' }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['mainContent'],
            properties: {
              mainContent: { type: 'string', description: 'Main content of the notes' }
            }
          },
          metadata: {
            type: 'object',
            required: ['keywords', 'relatedTopics'],
            properties: {
              keywords: { type: 'array', items: { type: 'string' }, description: 'Topic keywords' },
              relatedTopics: { type: 'array', items: { type: 'string' }, description: 'Related topics' }
            }
          }
        }
      }
    }
  });

  // Create General Studies Template
  await prisma.template.create({
    data: {
      name: 'general-studies',
      layout: {
        type: 'content-toc-tabs',
        description: 'General Studies template with tabbed content and table of contents',
        structure: {
          mainContent: { type: 'tabbed-content', width: '75%' },
          rightSidebar: { type: 'toc', width: '25%' }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['notes', 'summary', 'practiceQuestions'],
            properties: {
              notes: { type: 'string', description: 'Detailed notes' },
              summary: { type: 'string', description: 'Quick summary points' },
              practiceQuestions: { 
                type: 'array', 
                items: { 
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    answer: { type: 'string' }
                  }
                }
              }
            }
          },
          metadata: {
            type: 'object',
            required: ['subjects', 'previousYearQuestions'],
            properties: {
              subjects: { type: 'array', items: { type: 'string' }, description: 'Related subjects' },
              previousYearQuestions: { 
                type: 'array', 
                items: { 
                  type: 'object',
                  properties: {
                    year: { type: 'number' },
                    question: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  // Create Current Affairs Template
  await prisma.template.create({
    data: {
      name: 'current-affairs',
      layout: {
        type: 'content-sidebar',
        description: 'Current Affairs template with summary and topic connections',
        structure: {
          mainContent: { type: 'content', width: '66.67%' },
          rightSidebar: { type: 'topic-connections', width: '33.33%' }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['mainContent'],
            properties: {
              mainContent: { type: 'string', description: 'Main article content' }
            }
          },
          metadata: {
            type: 'object',
            required: ['date', 'category', 'summary', 'relatedTopics', 'examRelevance'],
            properties: {
              date: { type: 'string', format: 'date', description: 'Article date' },
              category: { type: 'string', description: 'News category' },
              summary: { type: 'string', description: 'Quick summary' },
              relatedTopics: { type: 'array', items: { type: 'string' }, description: 'Related syllabus topics' },
              examRelevance: { 
                type: 'object',
                properties: {
                  prelims: { type: 'boolean' },
                  mains: { type: 'boolean' },
                  essay: { type: 'boolean' },
                  notes: { type: 'string', description: 'How to use in exam' }
                }
              }
            }
          }
        }
      }
    }
  });

  // Create Article Template
  await prisma.template.create({
    data: {
      name: 'article',
      layout: {
        type: 'full-width',
        description: 'Full-width article template with rich content support',
        structure: {
          mainContent: { type: 'content', width: '100%' }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['introduction', 'mainContent', 'conclusion'],
            properties: {
              introduction: { type: 'string', description: 'Article introduction' },
              mainContent: { type: 'string', description: 'Main article content' },
              conclusion: { type: 'string', description: 'Article conclusion' }
            }
          },
          metadata: {
            type: 'object',
            required: ['author', 'category'],
            properties: {
              author: { type: 'string', description: 'Article author' },
              category: { type: 'string', description: 'Article category' },
              tags: { type: 'array', items: { type: 'string' }, description: 'Article tags' }
            }
          }
        }
      }
    }
  });

  // Create Blog Template
  await prisma.template.create({
    data: {
      name: 'blog',
      layout: {
        type: 'content-sidebar',
        description: 'Blog post template with author info and related posts',
        structure: {
          mainContent: { type: 'content', width: '70%' },
          rightSidebar: { type: 'author-related', width: '30%' }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['content'],
            properties: {
              content: { type: 'string', description: 'Blog post content' }
            }
          },
          metadata: {
            type: 'object',
            required: ['author', 'publishDate', 'category'],
            properties: {
              author: { 
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  bio: { type: 'string' },
                  image: { type: 'string' }
                }
              },
              publishDate: { type: 'string', format: 'date' },
              category: { type: 'string' },
              tags: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    }
  });

  // Create About Template
  await prisma.template.create({
    data: {
      name: 'about',
      layout: {
        type: 'content-profile',
        description: 'About page template with profile information',
        structure: {
          mainContent: { type: 'content', width: '70%' },
          rightSidebar: { 
            type: 'profile', 
            width: '30%',
            components: ['image', 'contactInfo', 'socialLinks']
          }
        },
        requirements: {
          content: {
            type: 'object',
            required: ['mainContent'],
            properties: {
              mainContent: { type: 'string', description: 'About content' }
            }
          },
          metadata: {
            type: 'object',
            required: ['profileImage', 'name'],
            properties: {
              name: { type: 'string' },
              profileImage: { type: 'string' },
              contactInfo: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  location: { type: 'string' }
                }
              },
              socialLinks: {
                type: 'object',
                properties: {
                  linkedin: { type: 'string' },
                  twitter: { type: 'string' },
                  github: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  });

  console.log('Database seeded with all templates!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
