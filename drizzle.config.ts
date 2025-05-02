import { defineConfig } from "drizzle-kit";
import { DB_FILE_PATH } from "./constants";

export default defineConfig({
  out: "./drizzle",
  schema: "./server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: { url: DB_FILE_PATH },
  casing: "snake_case",
  verbose: true,
});
