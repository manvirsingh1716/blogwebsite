const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Delete existing templates
  await prisma.template.deleteMany({});

  // Create templates with hardcoded IDs
  const templates = [
    {
      id: 'current-affairs',
      name: 'Current Affairs',
      description: 'Template for current affairs articles',
      layout: {
        type: 'article',
        description: 'Current affairs article template',
        structure: {
          title: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'article',
      name: 'Article',
      description: 'Template for general articles',
      layout: {
        type: 'article',
        description: 'General article template',
        structure: {
          title: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'study-material',
      name: 'Study Material',
      description: 'Template for study materials',
      layout: {
        type: 'study',
        description: 'Study material template',
        structure: {
          title: { type: 'string', required: true },
          subject: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'general-studies',
      name: 'General Studies',
      description: 'Template for general studies content',
      layout: {
        type: 'study',
        description: 'General studies template',
        structure: {
          title: { type: 'string', required: true },
          topic: { type: 'string', required: true },
          subject: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'upsc-notes',
      name: 'UPSC Notes',
      description: 'Template for UPSC preparation notes',
      layout: {
        type: 'notes',
        description: 'UPSC notes template',
        structure: {
          title: { type: 'string', required: true },
          subject: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'blog',
      name: 'Blog',
      description: 'Template for blog posts',
      layout: {
        type: 'blog',
        description: 'Blog post template',
        structure: {
          title: { type: 'string', required: true },
          content: { type: 'rich-text', required: true }
        }
      }
    },
    {
      id: 'about',
      name: 'About Page',
      description: 'Template for about pages',
      layout: {
        type: 'about',
        description: 'About page template with team sections and mission statement',
        structure: {
          hero: { 
            type: 'section',
            required: true,
            properties: {
              title: { type: 'string', required: true },
              description: { type: 'string', required: true }
            }
          },
          mission: { type: 'rich-text', required: true },
          veterans: { 
            type: 'array',
            required: true,
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', required: true },
                image: { type: 'string', required: true },
                info: { type: 'string', required: true }
              }
            }
          },
          coreMembers: { 
            type: 'array',
            required: true,
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', required: true },
                image: { type: 'string', required: true },
                info: { type: 'string', required: true }
              }
            }
          }
        }
      }
    }
  ];

  // Create all templates
  for (const template of templates) {
    await prisma.template.create({
      data: template
    });
  }

  console.log('Database has been seeded with templates using hardcoded IDs');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
