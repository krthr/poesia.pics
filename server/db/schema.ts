import type { SQL } from "drizzle-orm";
import { getTableColumns, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  numeric,
  integer,
  sqliteView,
  QueryBuilder,
} from "drizzle-orm/sqlite-core";
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

// https://github.com/drizzle-team/drizzle-orm/issues/3332#issuecomment-2663764515
const qb = new QueryBuilder({ casing: "snake_case" });
export const poemsWithExtraFields = sqliteView("poems_with_extra_fields").as(
  qb
    .select({
      ...getTableColumns(poems),
      isExpired:
        sql<boolean>`unixepoch() - ${poems.createdAt} > (60 * 60 * 24)`.as(
          "is_expired"
        ),
      remainingHours:
        sql<number>`(unixepoch() - ${poems.createdAt}) * 1.0 / 60 / 60`.as(
          "remaining_hours"
        ),
    })
    .from(poems)
);
