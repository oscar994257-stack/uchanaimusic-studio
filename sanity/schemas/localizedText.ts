import { defineField, defineType } from 'sanity'

const languageFields = [
  ['zh', 'Chinese Traditional'],
  ['en', 'English'],
  ['ja', 'Japanese'],
  ['ko', 'Korean'],
  ['es', 'Spanish'],
  ['fr', 'French'],
  ['de', 'German'],
  ['pt', 'Portuguese'],
  ['th', 'Thai'],
  ['vi', 'Vietnamese'],
  ['id', 'Indonesian'],
  ['ms', 'Malay'],
  ['ru', 'Russian'],
  ['ar', 'Arabic']
] as const

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: languageFields.map(([name, title]) => defineField({ name, title, type: 'text' }))
})
