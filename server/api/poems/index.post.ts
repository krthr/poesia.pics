import type { ErrorObject } from "~/server/utils/errors";
import type { Mood } from "~/server/constants/moods";
import type { MultiPartData } from "h3";

import { useGeneratePoem } from "~/server/services/poems";
import { MOODS } from "~/server/constants/moods";

export default defineEventHandler(
  async (event): Promise<{ id: string } | ErrorObject> => {
    const formData = await readMultipartFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: "Imagen no enviada.",
      });
    }

    let mood: Mood = "default";
    let image: MultiPartData | undefined = undefined;

    for (const field of formData) {
      if (field.name === "image") {
        image = field;
      } else if (field.name === "mood") {
        const value = field.data.toString("utf-8") as Mood;
        mood = MOODS.includes(value) ? value : "default";
      }
    }

    if (!image) {
      return createError({ statusCode: 400, statusMessage: "Invalid body." });
    }

    const generateResult = await useGeneratePoem(mood, image);
    if (generateResult.isErr()) {
      return generateResult.error;
    }

    const poem = generateResult.value;
    return poem;
  }
);
