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
    defineField({ name: 'discordUrl', title: 'Discord URL', type: 'url' }),
    defineField({ name: 'paymentUrl', title: '約定收款平台連結', type: 'url', description: '只填可信平台提供的 HTTPS 收款連結；未填時官網僅顯示洽詢報價。不要填 API 金鑰。', validation: rule => rule.uri({ scheme: ['https'] }) })
  ],
  preview: {
    select: { title: 'siteName' },
    prepare: ({ title }) => ({ title: title || 'Site Settings' })
  }
})
