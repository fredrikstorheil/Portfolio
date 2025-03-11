import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import schema from './schemas/schema' // Corrected import

export default defineConfig({
  name: 'default',
  title: 'ux-portfolio',

  projectId: '8njc2y4b',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: schema, // Corrected schema reference
})