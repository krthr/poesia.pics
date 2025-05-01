import type { Err, Ok } from "neverthrow";
import type { ErrorObject } from "../utils/errors";
import type { MultiPartData } from "h3";

import Sharp from "sharp";
import path from "node:path";
import { ok, fromPromise } from "neverthrow";
import { buildError } from "../utils/errors";

const IMAGES_FOLDER = "images";
const IMAGES_WIDTH = 800;

const bufferToBase64 = (
  buff: Buffer,
  buildUri = true,
  mimeType = "image/jpeg"
) => {
  let parts = [buff.toString("base64")];

  if (buildUri) {
    parts = [`data:${mimeType};base64`, ...parts];
  }

  return parts.join(",");
};

export type ImageResult = {
  imagePath: string;
  imagePreview?: string;
  imageWidth: number;
  imageHeight?: number;
  imageBase64: string;
};

export function useImageService(context: { id: string; filename?: string }) {
  const logger = useLogger("useImageService");

  async function generateThumbnail(sharp: Sharp.Sharp) {
    try {
      const thumbnailBuffer = await sharp
        .clone()
        .resize(5, null)
        .blur(10)
        .toBuffer();

      return bufferToBase64(thumbnailBuffer);
    } catch (error) {
      logger.warn(context, "Failed to generate thumbnail", error);
    }
  }

  async function processAndStoreImage(
    image: MultiPartData
  ): Promise<Ok<ImageResult, never> | Err<never, ErrorObject>> {
    logger.info(context, "processing image");

    if (!image.data) {
      return buildError("INVALID_IMAGE")();
    }

    const imageWidth = IMAGES_WIDTH;
    const sharp = Sharp(image.data).jpeg().resize(imageWidth, null).rotate();

    const imageBufferResult = await fromPromise(
      sharp.toBuffer(),
      buildError("INVALID_IMAGE")
    );

    if (imageBufferResult.isErr()) {
      return imageBufferResult.error;
    }

    const imageBuffer = imageBufferResult.value;
    const imageBase64 = bufferToBase64(imageBuffer);

    const imagePreview = await generateThumbnail(sharp);

    const metadataResult = await fromPromise(
      Sharp(imageBuffer).metadata(),
      (error) => logger.warn(context, "Failed to get image metadata", error)
    );

    const imageHeight = metadataResult.isOk()
      ? metadataResult.value.height
      : undefined;

    const imagePath = path.join(IMAGES_FOLDER, `${context.id}.jpg`);

    const uploadResult = await fromPromise(
      useStorage("disk").setItemRaw(imagePath, imageBuffer),
      buildError("STORAGE_FAILED")
    );

    if (uploadResult.isErr()) {
      return uploadResult.error;
    }

    return ok({
      imagePath,
      imagePreview,
      imageHeight,
      imageWidth,
      imageBase64,
    });
  }

  return { processAndStoreImage };
}
