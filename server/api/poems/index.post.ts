import type { ErrorObject } from "~/server/utils/errors";
import { useGeneratePoem } from "~/server/services/poems";

export default defineEventHandler(
  async (event): Promise<{ id: string } | ErrorObject> => {
    const formData = await readMultipartFormData(event);
    const image = formData?.find((field) => field.name === "image");

    if (!image) {
      return createError({ statusCode: 400, statusMessage: "Invalid body." });
    }

    const generateResult = await useGeneratePoem("default", image);
    if (generateResult.isErr()) {
      return generateResult.error;
    }

    const poem = generateResult.value;
    return poem;
  }
);
