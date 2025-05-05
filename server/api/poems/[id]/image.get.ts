import { getPoem } from "~/server/db/queries";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const { password } = getQuery(event);
  const poem = await getPoem(id!);

  if (!poem) {
    throw createError({
      statusCode: 404,
      statusMessage: "Poema no encontrado.",
    });
  }

  const adminPassword = useRuntimeConfig().adminPassword.toString();

  if (adminPassword !== password) {
    if (poem.isExpired) {
      throw createError({
        statusCode: 404,
        statusMessage: "Poema expirado.",
      });
    }
  }

  const file = await useStorage("disk").getItemRaw(poem.imagePath);
  return send(event, file);
});
