import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: { url: process.env.NUXT_DB_FILE_PATH! },
  casing: "snake_case",
  verbose: true,
});
