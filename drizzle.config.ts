import { defineConfig } from "drizzle-kit";

export const DB_FILE_PATH =
  process.env.NODE_ENV === "production"
    ? "file:/app/db/db.sqlite"
    : "file:./tmp/db.sqlite";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: { url: DB_FILE_PATH },
  casing: "snake_case",
  verbose: true,
});
