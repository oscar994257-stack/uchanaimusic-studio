import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tool',
  title: 'Tools & Apps',
  type: 'document',
  fields: [
    defineField({ name: 'toolName', title: 'Tool Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string' }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'Lucide icon key, e.g. captions, mic, music' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonUrl', title: 'Button URL', type: 'url' })
  ],
  preview: {
    select: { title: 'toolName', subtitle: 'status' }
  }
})
