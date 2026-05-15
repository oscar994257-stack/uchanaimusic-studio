import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'zh', title: 'Chinese', type: 'text' }),
    defineField({ name: 'en', title: 'English', type: 'text' }),
    defineField({ name: 'bodyI18n', title: 'About Translations', type: 'localizedText' })
  ],
  preview: {
    prepare: () => ({ title: 'About' })
  }
})
