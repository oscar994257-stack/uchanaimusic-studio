import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Store / Downloads',
  type: 'document',
  fields: [
    defineField({ name: 'productName', title: 'Product Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['itch.io', 'Gumroad', 'Ko-fi', 'GitHub Release', 'YouTube'] } }),
    defineField({ name: 'url', title: 'URL', type: 'url' }),
    defineField({ name: 'status', title: 'Status', type: 'string' })
  ],
  preview: {
    select: { title: 'productName', subtitle: 'platform' }
  }
})
