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
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'overview',
      type: 'text',
      title: 'Overview',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    },
    // Add more fields as needed
  ],
});