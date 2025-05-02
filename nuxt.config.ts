// https://nuxt.com/docs/api/configuration/nuxt-config

const STORAGE_FOLDER =
  process.env.NODE_ENV === "production" ? "./public/uploads" : "./tmp";

const DB_FILE_PATH =
  process.env.NODE_ENV === "production"
    ? "file:/app/db/db.sqlite"
    : "file:./tmp/db.sqlite";

console.log({ STORAGE_FOLDER, DB_FILE_PATH });

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxt/eslint", "@nuxt/scripts", "@nuxt/ui-pro", "@nuxt/image"],

  nitro: {
    storage: {
      disk: { driver: "fs-lite", base: STORAGE_FOLDER },
    },

    timing: true,
    compressPublicAssets: true,
  },

  runtimeConfig: {
    openaiApiKey: "",
    dbFilePath: DB_FILE_PATH,
  },

  css: ["~/assets/css/main.css"],

  image: {
    format: ["webp", "jpeg", "jpg"],
    provider: "ipx",
    ipx: { fs: { dir: STORAGE_FOLDER } },
  },

  ui: {
    colorMode: false,
  },
});
