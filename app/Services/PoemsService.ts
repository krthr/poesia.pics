import Logger from '@ioc:Adonis/Core/Logger'
import { readFile } from 'node:fs/promises'

import { createCompletion } from 'App/Services/OpenAiService'
import { getImageCaption } from 'App/Services/ReplicateService'
import { getRandomAuthors } from 'App/Utils/Authors'
import { processImage } from 'App/Services/ImageService'
import { Mood } from 'App/Constants/Moods'
import { Locale } from 'App/Constants/Locales'

const MODES: Record<Mood, string> = {
  erotic: 'an erotic',
  romantic: 'a romantic',
  melancholic: 'a melancholic',
  fun: 'a fun',
  default: 'a',
} as const

const LANGS: Record<Locale, string> = {
  es: 'Spanish',
  en: 'English',
} as const

export async function generatePoem(imagePath: string, mood: Mood = 'default') {
  const buff = await readFile(imagePath)

  const processedImage = await processImage(buff)
  const caption = await getImageCaption(processedImage.base64)

  const lang: Locale = 'es'
  const author = getRandomAuthors(lang, mood).join(', ')

  const promp = [
    MODES[mood],
    'poem',
    `in ${LANGS[lang]}`,
    'written by',
    author,
    'inspired by',
    caption,
  ].join(' ')

  Logger.info({ caption, mood, lang, author, promp }, 'generating poem')

  const poem = await createCompletion(promp)

  return {
    author,
    caption,
    photo: processedImage.buffer,
    photoPreview: processedImage.preview,
    mood,
    poem,
    promp,
  }
}
