// https://nuxt.com/docs/api/configuration/nuxt-config
console.log("dirs", process.env.NITRO_STORAGE_BASE, process.env.IMAGE_DIR);

const ipxDir = process.env.NODE_ENV === "production" ? "/app/storage" : "./tmp";

console.log({ ipxDir });

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxt/eslint", "@nuxt/scripts", "@nuxt/ui-pro", "@nuxt/image"],

  nitro: {
    storage: {
      disk: { driver: "fs-lite", base: process.env.NITRO_STORAGE_BASE },
    },

    timing: true,
    compressPublicAssets: true,
  },

  runtimeConfig: {
    openaiApiKey: "",
    dbFilePath: "./tmp/db.sqlite",
  },

  css: ["~/assets/css/main.css"],

  image: {
    format: ["webp", "jpeg", "jpg"],
    provider: "ipx",
    ipx: { fs: { dir: ipxDir } },
  },

  ui: {
    colorMode: false,
  },
});
