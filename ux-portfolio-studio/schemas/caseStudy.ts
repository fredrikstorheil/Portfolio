import { defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  type: 'document',
  title: 'Case Study',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Hovedbilde',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativ tekst',
        },
      ],
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Kort oppsummering',
    },
    {
      name: 'overview',
      type: 'text',
      title: 'Generell oversikt',
    },
    {
      name: 'companySummary',
      type: 'text',
      title: 'Bedriftssammendrag',
    },
    {
      name: 'challenge',
      type: 'text',
      title: 'Utfordringen',
    },
    {
      name: 'contribution',
      type: 'text',
      title: 'Mitt bidrag',
    },
    {
      name: 'userResearch',
      type: 'text',
      title: 'Brukerforskning',
    },
    {
      name: 'process',
      type: 'text',
      title: 'Prosess',
    },
    {
      name: 'processImages',
      type: 'array',
      title: 'Prosessbildegalleri',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativ Tekst',
            },
          ],
        },
      ],
    },
    {
      name: 'resultsGrowth',
      type: 'text',
      title: 'Resultater og vekst',
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Publisert dato',
    },
  ],
});