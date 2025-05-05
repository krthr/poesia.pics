import { omit } from "es-toolkit";
import { getPoem } from "~/server/db/queries";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const poem = await getPoem(id!);

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

  return omit(poem, ["metadata", "imagePath", "isExpired"]);
});
