import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Commission / Services',
  type: 'document',
  fields: [
    defineField({ name: 'serviceName', title: 'Service Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'serviceNameI18n', title: 'Service Name Translations', type: 'localizedString' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'descriptionI18n', title: 'Description Translations', type: 'localizedText' }),
    defineField({ name: 'icon', title: 'Icon', type: 'string' }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 })
  ],
  preview: {
    select: { title: 'serviceName' }
  }
})
