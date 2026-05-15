import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Main Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'japaneseLine', title: 'Japanese Short Line', type: 'string' }),
    defineField({ name: 'englishLine', title: 'English Short Line', type: 'string' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonUrl', title: 'Button URL', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' }
  }
})
