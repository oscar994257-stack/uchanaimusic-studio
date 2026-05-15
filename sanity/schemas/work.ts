import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'work',
  title: 'Works / Latest Works',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'type', title: 'Type', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube URL', type: 'url', validation: (Rule) => Rule.required() }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' })
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Published newest', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' }
  }
})
