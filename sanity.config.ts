import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qlmcui2q'
const projectId = configuredProjectId === 'q1mcui2q' ? 'qlmcui2q' : configuredProjectId
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'uchanaimusic_studio',
  title: 'UchanAIMusic Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
})
