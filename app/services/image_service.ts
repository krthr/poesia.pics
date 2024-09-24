import { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'

import Sharp from 'sharp'
import { readFile } from 'node:fs/promises'
import drive from '@adonisjs/drive/services/main'

import path from 'node:path'

import ImageProcessingException from '#exceptions/image_processing_exception'

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
    if (!originalPath) {
      this.ctx.logger.error({ id, originalPath }, 'no original path')
      throw new ImageProcessingException()
    }

    this.ctx.logger.info({ id, originalPath }, 'processing new image')

    try {
      this.ctx.logger.debug({ originalPath }, 'reading file from disk')
      const buff: Buffer = await readFile(originalPath)

      const imagePreview = await this.generateThumbnail(buff)

      const imageWidth = 800
      let imageHeight

      const sharp = Sharp(buff).jpeg({ quality: 90 }).resize(imageWidth, null)
      const imageBuffer = await sharp.toBuffer()
      const imageMetadata = await sharp.metadata()

      if (
        imageMetadata &&
        typeof imageMetadata.height === 'number' &&
        typeof imageMetadata.width === 'number'
      ) {
        imageHeight = Math.ceil(imageMetadata.height * (imageWidth / imageMetadata.width))
      }

      const imagePath = imageKey(id)
      await drive.use().put(imagePath, imageBuffer)

      const imageBase64 = bufferToBase64(imageBuffer)

      return { imagePath, imageBase64, imageBuffer, imagePreview, imageWidth, imageHeight }
    } catch (error) {
      this.ctx.logger.error(error)
      throw new ImageProcessingException()
    }
  }
}
