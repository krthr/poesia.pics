import { drizzle } from "drizzle-orm/libsql/node";
import * as schema from "./schema";

const runtimeConfig = useRuntimeConfig();

export const db = drizzle({
  casing: "snake_case",
  connection: { url: runtimeConfig.dbFilePath },
  schema,
});
