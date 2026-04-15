import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import app from '@adonisjs/core/services/app'

const WIDTH = 1200
const HEIGHT = 1600

async function loadFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url)
  return response.arrayBuffer()
}

type FontEntry = { name: string; data: ArrayBuffer; weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style: 'normal' | 'italic' }

let fontsCache: FontEntry[] | null = null

async function getFonts(): Promise<FontEntry[]> {
  if (fontsCache) return fontsCache

  const [loraRegular, loraBold] = await Promise.all([
    loadFont(
      'https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2'
    ),
    loadFont(
      'https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2'
    ),
  ])

  fontsCache = [
    { name: 'Lora', data: loraRegular, weight: 400, style: 'normal' },
    { name: 'Lora', data: loraBold, weight: 700, style: 'normal' },
  ]

  return fontsCache
}

export async function generatePoemImage(poem: {
  content: string
  imagePath: string
  voice: { name: string; mood: { slug: string } }
}): Promise<Buffer> {
  const uploadsDir = join(app.makePath('storage'), 'uploads', 'poems')
  const imageBuffer = await readFile(join(uploadsDir, poem.imagePath))
  const ext = poem.imagePath.split('.').pop() || 'jpg'
  const mimeType = ext === 'jpg' ? 'jpeg' : ext
  const imageDataUrl = `data:image/${mimeType};base64,${imageBuffer.toString('base64')}`

  const fonts = await getFonts()

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#fafaf9',
          fontFamily: 'Lora',
          color: '#292524',
        },
        children: [
          {
            type: 'img',
            props: {
              src: imageDataUrl,
              style: {
                width: '100%',
                height: '600px',
                objectFit: 'cover',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              },
              children: [
                {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '32px',
                      lineHeight: '1.6',
                      fontStyle: 'italic',
                      color: '#44403c',
                      whiteSpace: 'pre-wrap',
                    },
                    children: poem.content,
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '30px 60px',
                borderTop: '1px solid #d6d3d1',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '20px', color: '#78716c' },
                    children: poem.voice.name,
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: '24px', fontWeight: 700, color: '#292524' },
                    children: 'poesia.pics',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts,
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: WIDTH },
  })

  return resvg.render().asPng() as unknown as Buffer
}
