import type { SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { sqliteTable, text, numeric, integer } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const poems = sqliteTable("poems", {
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
  imageRatio: numeric({ mode: "number" }).generatedAlwaysAs(
    (): SQL =>
      sql`case 
        when ${poems.imageWidth} is not null and ${poems.imageHeight} is not null then
          (${poems.imageWidth} * 1.0) / (${poems.imageHeight} * 1.0)
        else null end
      `
  ),
  imagePreview: text(),

  metadata: text({ mode: "json" })
    .default({})
    .$type<{ prompt: string; model: string }>(),
  createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});
