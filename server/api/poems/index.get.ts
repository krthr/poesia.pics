import { listPoems } from "~/server/db/queries";

export default defineEventHandler(async (event) => {
  const { password } = getQuery(event);

  const adminPassword = useRuntimeConfig().adminPassword.toString();
  if (password !== adminPassword) {
    throw createError({
      statusCode: 301,
      statusMessage: "Invalid password",
    });
  }

  const poems = await listPoems();

  return { poems };
});
