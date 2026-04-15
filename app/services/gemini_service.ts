import env from '#start/env'
import { GoogleGenAI, createPartFromBase64 } from '@google/genai'

const client = new GoogleGenAI({ apiKey: env.get('GEMINI_API_KEY') })

function buildSystemPrompt(voice: {
  name: string
  promptHint: string
  mood: { slug: string }
  language: { code: string }
}): string {
  const langName = voice.language.code === 'es' ? 'Spanish' : 'English'

  return [
    `You are a poet writing in ${langName}.`,
    `Your poetic voice is inspired by "${voice.name}".`,
    `Style guidance: ${voice.promptHint}`,
    `The emotional tone is ${voice.mood.slug}.`,
    `Write a single poem inspired by the image provided.`,
    `Output ONLY the poem text — no title, no explanation, no commentary.`,
  ].join('\n')
}

export async function generatePoem(
  imageBuffer: Buffer,
  mimeType: string,
  voice: {
    name: string
    promptHint: string
    mood: { slug: string }
    language: { code: string }
  }
): Promise<string> {
  const systemPrompt = buildSystemPrompt(voice)
  const base64 = imageBuffer.toString('base64')

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          createPartFromBase64(base64, mimeType),
          { text: 'Write a poem inspired by this image.' },
        ],
      },
    ],
    config: {
      systemInstruction: systemPrompt,
    },
  })

  const text = response.text?.trim()
  if (!text) {
    throw new Error('Gemini returned empty response')
  }

  return text
}
