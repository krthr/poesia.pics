import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { poems } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const poem = await db.query.poems.findFirst({
    where: eq(poems.id, id!),
    columns: { metadata: false },
  });

  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema no encontrado.",
    });
  }

  const elapsedHours =
    (new Date().getTime() - poem.createdAt!.getTime()) / 1000 / 60 / 60;

  const remainingHours = Math.ceil(24 - elapsedHours);

  if (remainingHours < 24) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema expirado.",
    });
  }

  return { ...poem, elapsedHours, remainingHours };
});
