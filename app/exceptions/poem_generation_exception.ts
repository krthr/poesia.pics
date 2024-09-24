import { Exception } from '@adonisjs/core/exceptions'

const DEFAULT_MESSAGE = 'Ha ocurrido un error al escribir tu poema. Inténtalo más tarde.'

export default class PoemGenerationException extends Exception {
  static status = 500
  static code = 'E_POEM_GENERATION'

  constructor(message: string = DEFAULT_MESSAGE) {
    super(message)
  }
}
