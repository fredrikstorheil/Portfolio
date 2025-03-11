import { defineType } from 'sanity';

export default defineType({
  name: 'contact',
  type: 'document',
  title: 'Contact',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'message',
      type: 'text',
      title: 'Message',
    },
    // Add more fields as needed
  ],
});