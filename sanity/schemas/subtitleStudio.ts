import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subtitleStudio',
  title: 'Subtitle Studio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'downloadUrl', title: 'Download Now URL', type: 'url' }),
    defineField({ name: 'itchUrl', title: 'View on itch.io URL', type: 'url' }),
    defineField({ name: 'learnMoreUrl', title: 'Learn More URL', type: 'url' })
  ],
  preview: {
    select: { title: 'title' }
  }
})
