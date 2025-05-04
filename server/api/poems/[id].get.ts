import { eq } from "drizzle-orm";
import { pick } from "es-toolkit";
import { db } from "~/server/db";
import { poemsWithExtraFields } from "~/server/db/schema";

export interface PoemJson {
  title: string;
  id: string;
  poem: string;
  imageHeight: number | null;
  imagePath: string;
  imagePreview: string | null;
  imageRatio: number | null;
  imageWidth: number | null;
  mood: "default" | "romantic" | "erotic" | "melancholic" | "fun";
  remainingHours: number;
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const [poem] = await db
    .select()
    .from(poemsWithExtraFields)
    .where(eq(poemsWithExtraFields.id, id!))
    .limit(1);

  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema no encontrado.",
    });
  }

  if (poem.isExpired) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema expirado.",
    });
  }

  return {
    ...pick(poem, [
      "title",
      "id",
      "poem",
      "imageHeight",
      "imagePath",
      "imagePreview",
      "imageRatio",
      "imageWidth",
      "mood",
      "remainingHours",
    ]),
  } as PoemJson;
});
