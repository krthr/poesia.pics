import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { MOODS } from '../constants/moods.js'

const VALID_IMG_EXTNAMES = ['jpg', 'jpeg', 'png', 'webp', 'jfif', 'heic']

export const poemStoreValidator = vine.compile(
  vine.object({
    image: vine.file({
      extnames: [...VALID_IMG_EXTNAMES, ...VALID_IMG_EXTNAMES.map((v) => v.toUpperCase())],
      size: '20mb',
    }),
    mood: vine.enum(MOODS).optional(),
  })
)

poemStoreValidator.messagesProvider = new SimpleMessagesProvider({
  'image.file.extname':
    'Extensión del archivo inválido. Tipo de imágenes permitidas: ' + VALID_IMG_EXTNAMES.join(', '),
  'image.file.size': 'Archivo demasiado grande. Máx. tamaño permitido: 20MB',
})
