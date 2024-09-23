import { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'

import Sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import drive from '@adonisjs/drive/services/main'

import path from 'node:path'

function bufferToBase64(buff: Buffer) {
  return 'data:image/jpeg;base64,' + buff.toString('base64')
}

const IMAGES_FOLDERS = 'images'

export function imageKey(id: string) {
  return path.join(IMAGES_FOLDERS, `${id}.jpg`)
}

@inject()
export default class ImageService {
  constructor(protected ctx: HttpContext) {}

  private async generateThumbnail(buff: Buffer) {
    try {
      const thumbnailBuffer = await Sharp(buff).jpeg().resize(5, null).blur(10).toBuffer()
      return bufferToBase64(thumbnailBuffer)
    } catch (error) {
      this.ctx.logger.error(error)
    }
  }

  async processAndStore(id: string, originalPath?: string) {
    try {
      if (!originalPath) {
        throw new Error('Invalid originalPath')
      }

      this.ctx.logger.info({ id, originalPath }, 'ImageService.processAndStore')

      const buff: Buffer = await readFile(originalPath)

      const imagePreview = await this.generateThumbnail(buff)
      if (!imagePreview) {
        return
      }

      const imageBuffer = await Sharp(buff).jpeg({ quality: 80 }).resize(500, null).toBuffer()

      const imagePath = imageKey(id)
      await drive.use().put(imagePath, imageBuffer)

      const imageBase64 = bufferToBase64(imageBuffer)

      return { imagePath, imageBase64, imageBuffer, imagePreview }
    } catch (error) {
      this.ctx.logger.error(error)
    }
  }
}
