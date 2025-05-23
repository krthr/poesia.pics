// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },

  app: {
    pageTransition: { name: "page", mode: "out-in" },

    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: { lang: "es" },
      title: "Poesia.pics - Convierte tus imágenes en poemas con IA",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/scripts",
    "@nuxt/ui-pro",
    "@nuxt/image",
    "@nuxtjs/seo",
  ],

  nitro: {
    storage: {
      disk: { driver: "fs-lite", base: process.env.NUXT_STORAGE_FOLDER },
    },

    timing: true,
    compressPublicAssets: true,
  },

  runtimeConfig: {
    adminPassword: "",
    openaiApiKey: "",
    dbFilePath: process.env.NUXT_DB_FILE_PATH,
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      posthogPublicKey: "",
      posthogHost: "",
    },
  },

  css: ["~/assets/css/main.css"],

  ui: {
    colorMode: false,
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: "Poesia.pics - Convierte tus imágenes en poemas con IA",
  },

  seo: {
    meta: {
      title: "Poesia.pics - Convierte tus imágenes en poemas con IA",
      description:
        "Poesia.pics transforma tus fotografías en hermosos poemas utilizando Inteligencia Artificial. Sube una imagen y descubre la poesía que esconde.",
      ogTitle: "Poesia.pics - Convierte tus imágenes en poemas con IA",
      ogDescription:
        "Transforma tus fotografías en hermosos poemas utilizando Inteligencia Artificial.",
      ogImage: "/og-image.jpg",
      ogUrl: process.env.NUXT_PUBLIC_SITE_URL,
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: "Poesia.pics - Convierte tus imágenes en poemas con IA",
      twitterDescription:
        "Transforma tus fotografías en hermosos poemas utilizando Inteligencia Artificial.",
    },
  },

  ogImage: {
    defaults: {
      extension: "jpeg",
    },
  },

  robots: {
    blockAiBots: true,
    blockNonSeoBots: true,
    disallow: ["/admin"],
  },

  $production: {
    scripts: {
      registry: {
        googleAnalytics: {
          id: "G-K80PMDDGSD",
        },
      },
    },
  },
});
