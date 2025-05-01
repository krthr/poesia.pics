import { ok, type Err, type Ok } from "neverthrow";
import type { ErrorObject } from "../utils/errors";
import type { MultiPartData } from "h3";
import type { Mood } from "../constants/moods";

import { nanoid } from "nanoid";
import { pick } from "es-toolkit";
import { useImageService } from "./image";
import { PROMPT } from "../ai/prompt";
import { chatCompletion } from "../ai";
import { z } from "zod";
import { poems } from "../db/schema";
import { db } from "../db";

export async function useGeneratePoem(
  mood: Mood,
  image: MultiPartData
): Promise<Ok<{ id: string }, never> | Err<never, ErrorObject>> {
  const logger = useLogger("useGeneratePoem");
  const id = nanoid(10);

  const context = { mood, id };

  const imageService = useImageService({ id, ...pick(image, ["filename"]) });
  const processedImageResult = await imageService.processAndStoreImage(image);

  if (processedImageResult.isErr()) {
    return processedImageResult;
  }

  const prompt = PROMPT;
  const processedImage = processedImageResult.value;

  logger.info(context, "generating poem");

  const completionResult = await chatCompletion(
    prompt,
    processedImage.imageBase64,
    z.object({ title: z.string(), content: z.string() })
  );

  if (completionResult.isErr()) {
    return completionResult;
  }

  logger.info(context, "saving poem");

  const completion = completionResult.value;
  await db.insert(poems).values({
    mood,
    id,
    poem: completion.content,
    title: completion.title,
    metadata: { prompt, model: "o4-mini" },
    ...pick(processedImage, [
      "imageHeight",
      "imagePreview",
      "imagePath",
      "imageWidth",
    ]),
  });

  return ok({ id });
}
