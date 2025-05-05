import { db } from ".";
import { desc, eq } from "drizzle-orm";

import { poemsWithExtraFields } from "./schema";

const runtimeConfig = useRuntimeConfig();

function serializePoem(poem: typeof poemsWithExtraFields.$inferSelect) {
  const imageApiUrl = `/api/poems/${poem.id}/image`;
  const siteUrl = runtimeConfig.public.siteUrl;
  const imageUrl = new URL(imageApiUrl, siteUrl).toString();

  return { ...poem, imageUrl };
}

export type PoemJson = ReturnType<typeof serializePoem>;

export async function listPoems(): Promise<PoemJson[]> {
  const poems = await db
    .select()
    .from(poemsWithExtraFields)
    .orderBy(desc(poemsWithExtraFields.createdAt));

  return poems.map(serializePoem);
}

export async function getPoem(id: string): Promise<PoemJson | undefined> {
  const poems = await db
    .select()
    .from(poemsWithExtraFields)
    .where(eq(poemsWithExtraFields.id, id!))
    .limit(1);

  const poem = poems.at(0);
  if (!poem) {
    return;
  }

  return serializePoem(poem);
}
