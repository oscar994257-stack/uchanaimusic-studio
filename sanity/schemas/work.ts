import { defineField, defineType } from 'sanity'
import { extractYouTubeId } from '../../lib/youtube'
import { WorkInput } from '../components/WorkInput'
import { YouTubeThumbnailInput } from '../components/YouTubeThumbnailInput'

export default defineType({
  name: 'work',
  title: 'Works / Latest Works',
  type: 'document',
  components: { input: WorkInput },
  fields: [
    defineField({ name: 'title', title: '標題', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'type', title: '標籤', type: 'string' }),
    defineField({ name: 'description', title: '說明欄', type: 'text', rows: 4 }),
    defineField({
      name: 'youtubeUrl', title: 'YouTube 網址', type: 'url',
      validation: (Rule) => Rule.required().custom((value) => !value || /^[A-Za-z0-9_-]{11}$/.test(extractYouTubeId(value) || '') || '請貼上有效的 YouTube 影片網址')
    }),
    defineField({ name: 'youtubeThumbnail', title: 'YouTube 影片縮圖', type: 'string', readOnly: true, components: { input: YouTubeThumbnailInput } }),
    // Keep legacy data recognized without exposing extra fields in the form.
    defineField({ name: 'titleI18n', type: 'localizedString', hidden: true }),
    defineField({ name: 'typeI18n', type: 'localizedString', hidden: true }),
    defineField({ name: 'category', type: 'string', hidden: true }),
    defineField({ name: 'categoryI18n', type: 'localizedString', hidden: true }),
    defineField({ name: 'descriptionI18n', type: 'localizedText', hidden: true }),
    defineField({ name: 'featured', type: 'boolean', hidden: true }),
    defineField({ name: 'order', type: 'number', hidden: true }),
    defineField({ name: 'publishedAt', type: 'datetime', hidden: true })
  ],
  orderings: [
    { title: '最新新增', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'title', tag: 'type', category: 'category' },
    prepare: ({ title, tag, category }) => ({ title, subtitle: tag || category })
  }
})
