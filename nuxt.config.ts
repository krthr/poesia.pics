// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/scripts", "@nuxt/ui-pro", "@nuxt/image"],

  nitro: {
    storage: {
      disk: {
        driver: "fs-lite",
        base: "./tmp",
      },
    },

    timing: true,
    compressPublicAssets: true,
  },

  runtimeConfig: {
    openaiApiKey: "",
    databaseUrl: "",
  },

  css: ["~/assets/css/main.css"],

  image: {
    dir: "./tmp",
    format: ["webp", "jpeg", "jpg"],
  },
});
