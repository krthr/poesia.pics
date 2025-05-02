export const STORAGE_FOLDER =
  process.env.NODE_ENV === "production" ? "/app/storage" : "./tmp";

export const DB_FILE_PATH =
  process.env.NODE_ENV === "production"
    ? "file:/app/db/db.sqlite"
    : "file:./tmp/db.sqlite";
