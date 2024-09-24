import { Exception } from '@adonisjs/core/exceptions'

const DEFAULT_MESSAGE = 'Ha ocurrido un error al procesar la imagen. Inténtalo más tarde.'

export default class ImageProcessingException extends Exception {
  static status = 500
  static code = 'E_IMAGE_PROCESSING'

  constructor(message: string = DEFAULT_MESSAGE) {
    super(message)
  }
}
