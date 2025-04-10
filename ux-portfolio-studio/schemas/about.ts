import { defineType } from 'sanity';

export default defineType({
  name: 'about',
  type: 'document',
  title: 'About',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Bio',
    },
    // Add more fields as needed
  ],
});