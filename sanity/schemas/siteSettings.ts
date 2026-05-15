import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Website Name', type: 'string' }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text' }),
    defineField({ name: 'youtubeUrl', title: 'YouTube Channel URL', type: 'url' }),
    defineField({ name: 'itchUrl', title: 'itch.io URL', type: 'url' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'twitterUrl', title: 'X / Twitter URL', type: 'url' }),
    defineField({ name: 'discordUrl', title: 'Discord URL', type: 'url' })
  ],
  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({ title: title || 'Site Settings' })
  }
})
