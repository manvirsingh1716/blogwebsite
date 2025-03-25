export const currentAffairsTemplate = {
  name: 'current-affairs',
  description: 'Template for current affairs pages',
  layout: {
    type: 'current-affairs',
    sections: [
      {
        type: 'header',
        fields: ['title', 'date', 'category']
      },
      {
        type: 'content',
        fields: ['summary', 'details']
      },
      {
        type: 'metadata',
        fields: ['tags', 'source', 'relevance']
      }
    ],
    defaultMetadata: {
      showInNav: true,
      level: 2
    }
  }
}
