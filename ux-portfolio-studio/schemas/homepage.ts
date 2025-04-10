import { defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Content',
    },
    // Add more fields as needed
  ],
});