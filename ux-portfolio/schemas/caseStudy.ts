import { defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Banner Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Short Summary',
    },
    {
      name: 'overview',
      type: 'text',
      title: 'General Overview',
    },
    {
      name: 'companySummary',
      type: 'text',
      title: 'Company Summary',
    },
    {
      name: 'challenge',
      type: 'text',
      title: 'The Challenge',
    },
    {
      name: 'contribution',
      type: 'text',
      title: 'My Contribution',
    },
    {
      name: 'userResearch',
      type: 'text',
      title: 'User Research',
    },
    {
      name: 'process',
      type: 'text',
      title: 'Process',
    },
    {
      name: 'processImages',
      type: 'array',
      title: 'Process Image Gallery',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
    {
      name: 'resultsGrowth',
      type: 'text',
      title: 'Results & Growth',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
    },
  ],
});