import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'

import Poem from '#models/poem'
import PoemService from '#services/poem_service'
import { poemStoreValidator } from '#validators/poem_store'

export default class PoemsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('pages/home')
  }

  /**
   * Handle form submission for the create action
   */
  @inject()
  async store({ logger, request, response }: HttpContext, poemService: PoemService) {
    const body = await request.validateUsing(poemStoreValidator).catch((err) => {
      logger.error(err)
      throw err
    })

    const poem = await poemService.generatePoem(body.mood || 'default', body.image.tmpPath)

    return response.redirect().toRoute('poem', {
      id: poem.id,
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response, session, view }: HttpContext) {
    const id = params['id']
    const poem = await Poem.findBy('id', id)

    if (!poem) {
      return response.redirect('/')
    }

    if (poem.isExpired) {
      session.flashAll()
      session.flashErrors({
        E_EXPIRED_POEM: 'El poema ha expirado.',
      })

      return response.redirect('/')
    }

    return view.render('pages/poem', { poem })
  }
}
