import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

import { OpenAI } from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid'

import ImageService from '#services/image_service'
import { Mood } from '#constants/moods'
import Poem from '#models/poem'
import PoemGenerationException from '#exceptions/poem_generation_exception'

const PoemObject = z.object({
  titulo: z.string(),
  poema: z.string(),
})

const MODES: Record<Mood, string> = {
  erotic: 'erótico',
  romantic: 'romántico',
  melancholic: 'melancólico',
  fun: 'divertido',
  default: '',
} as const

@inject()
export default class PoemService {
  private openai: OpenAI

  constructor(
    protected ctx: HttpContext,
    protected imageService: ImageService
  ) {
    this.openai = new OpenAI()
  }

  private async createChatCompletions(id: string, mood: Mood, imageBase64: string) {
    this.ctx.logger.info({ id, mood }, 'writing poem')

    let parsedPoem: z.infer<typeof PoemObject> | undefined | null
    let response

    const mode = MODES[mood]
    const prompt = `Eres un escritor de poesía. Siempre escribes en español.
    Tu estilo de escritura es similar al de Octavio Paz, Julio Cortázar, Alejandra Pizarnik y Raúl Gómez Jattin.
    Evitas usar rimas en tus poemas. Escribe un poema ${mode} inspirado en la siguiente imagen.
    `
      .replaceAll(/\n/g, ' ')
      .replaceAll(/\s+/g, ' ')
      .trim()

    try {
      response = await this.openai.beta.chat.completions.parse({
        messages: [
          {
            role: 'system',
            content: prompt,
          },
          {
            role: 'user',
            content: [
              {
                image_url: { url: imageBase64 },
                type: 'image_url',
              },
            ],
          },
        ],
        model: 'gpt-4o-2024-08-06',
        max_completion_tokens: 500,
        response_format: zodResponseFormat(PoemObject, 'poem'),
      })

      parsedPoem = response.choices.at(0)?.message.parsed
    } catch (error) {
      this.ctx.logger.error(error, 'error calling the openai api')
      throw new PoemGenerationException()
    }

    if (!parsedPoem) {
      this.ctx.logger.error({ response }, 'Poem generated was empty')
      throw new PoemGenerationException()
    }

    parsedPoem.poema = parsedPoem.poema.replace(/\s+/, ' ').trim()
    parsedPoem.titulo = parsedPoem.titulo.replace(/\s+/, ' ').trim()

    return { parsedPoem, prompt }
  }

  async generatePoem(mood: Mood, imagePath?: string) {
    const id = nanoid(10)

    this.ctx.logger.info({ id, mood }, 'generating a new poem')

    const processedImage = await this.imageService.processAndStore(id, imagePath)

    const response = await this.createChatCompletions(id, mood, processedImage.imageBase64)

    try {
      this.ctx.logger.debug({ id }, 'saving poem to db')

      const poem = await Poem.create({
        id,
        title: response.parsedPoem.titulo,
        poem: response.parsedPoem.poema,
        imagePath: processedImage.imagePath,
        imagePreview: processedImage.imagePreview,
        imageHeight: processedImage.imageHeight,
        imageWidth: processedImage.imageWidth,
        prompt: response.prompt,
        mood,
      })

      return poem
    } catch (error) {
      this.ctx.logger.error(error)
      throw new PoemGenerationException()
    }
  }
}
