import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'backgroundMusic',
  title: 'Background Music',
  type: 'document',
  fields: [
    defineField({ name: 'trackTitle', title: 'Track Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      description: 'Upload MP3, WAV, M4A, or other browser-supported audio files.',
      options: { accept: 'audio/*' }
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Optional fallback/reference link. Uploaded audio is preferred for background playback.'
    }),
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 })
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }
  ],
  preview: {
    select: { title: 'trackTitle', subtitle: 'youtubeUrl' }
  }
})
