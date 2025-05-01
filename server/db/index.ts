import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const runtimeConfig = useRuntimeConfig();

export const db = drizzle({
  casing: "snake_case",
  connection: { url: runtimeConfig.databaseUrl, prepare: false },
  schema,
});
