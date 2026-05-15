import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Main Title', type: 'string' }),
    defineField({ name: 'titleI18n', title: 'Main Title Translations', type: 'localizedString' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'subtitleI18n', title: 'Subtitle Translations', type: 'localizedString' }),
    defineField({ name: 'japaneseLine', title: 'Japanese Short Line', type: 'string' }),
    defineField({ name: 'shortLineI18n', title: 'Short Line Translations', type: 'localizedString' }),
    defineField({ name: 'englishLine', title: 'English Short Line', type: 'string' }),
    defineField({ name: 'supportLineI18n', title: 'Support Line Translations', type: 'localizedString' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string' }),
    defineField({ name: 'buttonTextI18n', title: 'Button Text Translations', type: 'localizedString' }),
    defineField({ name: 'buttonUrl', title: 'Button URL', type: 'url' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } })
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' }
  }
})
