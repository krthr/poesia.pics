import type { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const poems = pgTable("poems", {
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid(10))
    .notNull(),

  title: text().notNull(),
  poem: text().notNull(),
  mood: text({
    enum: ["default", "romantic", "erotic", "melancholic", "fun"],
  }).notNull(),

  imagePath: text().notNull(),
  imageWidth: integer(),
  imageHeight: integer(),
  imageRatio: numeric().generatedAlwaysAs(
    (): SQL =>
      sql`nullif(${poems.imageWidth}, 0) / nullif(${poems.imageHeight}, 0)`
  ),
  imagePreview: text(),

  metadata: json().default({}).$type<{ prompt: string; model: string }>(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
