import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schema from './schemas/schema'

export default defineConfig({
  name: 'default',
  title: 'ux-portfolio',

  projectId: '8njc2y4b',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schema.types,
  },
})
