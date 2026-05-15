import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube', type: 'url' }),
    defineField({ name: 'itchUrl', title: 'itch.io', type: 'url' }),
    defineField({ name: 'twitterUrl', title: 'X / Twitter', type: 'url' }),
    defineField({ name: 'discordUrl', title: 'Discord', type: 'url' })
  ],
  preview: {
    select: { title: 'email' },
    prepare: ({ title }) => ({ title: title || 'Contact' })
  }
})
