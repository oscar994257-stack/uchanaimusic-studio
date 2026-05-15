import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'zh', title: 'Chinese', type: 'text' }),
    defineField({ name: 'en', title: 'English', type: 'text' })
  ],
  preview: {
    prepare: () => ({ title: 'About' })
  }
})
