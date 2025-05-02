// https://nuxt.com/docs/api/configuration/nuxt-config

import { DB_FILE_PATH, STORAGE_FOLDER } from "./constants";

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

    ipx: {
      baseURL: "/images",
      fs: {
        dir: [STORAGE_FOLDER],
      },
    },
  },

  ui: {
    colorMode: false,
  },
});
