import 'dotenv/config'

import * as path from 'node:path'

import { $ } from 'execa'
import fsExtra from 'fs-extra'

const DEFAULT_LANGUAGE = 'nl'
const SUPPORTED_LANGUAGES = ['nl', 'en']

const cwd = process.cwd()
const outputDir = path.join(cwd, 'public', 'locales')

type Label = {
  id: number
  name: string
  value: string
  dimension_value: string
}

if (process.env.STORYBLOK_ACCESS_TOKEN) {
  await generateTranslationFiles()
} else {
  console.log('No STORYBLOK_ACCESS_TOKEN found')
}

async function fetchTranslations(lang: string): Promise<Label[]> {
  const params = new URLSearchParams({
    datasource: 'labels',
    dimension: lang,
    per_page: '500',
    token: process.env.STORYBLOK_ACCESS_TOKEN ?? '',
  })
  const res = await fetch(
    `https://api.storyblok.com/v2/cdn/datasource_entries?${params.toString()}`,
  )
  const data = await res.json()
  return data.datasource_entries
}

async function generateTranslationFiles() {
  for (const lang of SUPPORTED_LANGUAGES) {
    const translations = await fetchTranslations(lang)
    const content = translations.reduce<Record<string, string>>((acc, curr) => {
      return {
        ...acc,
        [curr.name]:
          lang === DEFAULT_LANGUAGE
            ? curr.value
            : curr.dimension_value ?? '!invalid value!',
      }
    }, {})

    const langDir = path.join(outputDir, lang)
    await fsExtra.ensureDir(langDir)

    const outputPath = path.join(langDir, 'common.json')
    const hasChanged = await writeIfChanged(outputPath, JSON.stringify(content))

    if (hasChanged) {
      console.log(
        `Wrote to /public/locales/${lang}/common.json with ${Object.keys(content).length} keys`,
      )
    } else {
      console.log(`No changes in translations for ${lang}, skipping write`)
    }
  }
}

async function writeIfChanged(filepath: string, newContent: string) {
  const currentContent = await fsExtra
    .readFile(filepath, 'utf8')
    .catch(() => '')
  if (currentContent === newContent) return false
  await fsExtra.writeFile(filepath, newContent, 'utf8')
  await $`prettier --write ${filepath} --ignore-unknown`
  return true
}
