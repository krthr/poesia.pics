import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { poemsWithExtraFields } from "~/server/db/schema";

export default defineEventHandler(async (event) => {
  const { password } = getQuery(event);

  console.log({ password, useRuntimeConfig: useRuntimeConfig() });

  if (password !== useRuntimeConfig().adminPassword.toString()) {
    throw createError({
      statusCode: 301,
      statusMessage: "Invalid password",
    });
  }

  const poems = await db
    .select()
    .from(poemsWithExtraFields)
    .orderBy(desc(poemsWithExtraFields.createdAt));

  return { poems };
});
