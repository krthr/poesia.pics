// https://nuxt.com/docs/api/configuration/nuxt-config

const uploadFolder = () =>
  process.env.NODE_ENV === "production"
    ? {
        ipx: {
          fs: {
            dir: [process.env.NUXT_STORAGE_FOLDER!],
          },
        },
      }
    : {
        dir: process.env.NUXT_STORAGE_FOLDER!,
      };

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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://beta.poesia.pics",
    },
  },

  css: ["~/assets/css/main.css"],

  image: {
    format: ["webp", "jpeg", "jpg"],
    provider: "ipx",
    ...uploadFolder(),
  },

  ui: {
    colorMode: false,
  },

  site: {
    url: "https://beta.poesia.pics",
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
      ogUrl: "https://beta.poesia.pics",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterTitle: "Poesia.pics - Convierte tus imágenes en poemas con IA",
      twitterDescription:
        "Transforma tus fotografías en hermosos poemas utilizando Inteligencia Artificial.",
    },
  },

  robots: {
    blockNonSeoBots: true,
    blockAiBots: true,
  },

  $production: {
    app: {
      head: {
        script: [
          {
            innerHTML: `
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init bs ws ge fs capture De Ai $s register register_once register_for_session unregister unregister_for_session Is getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty xs Ss createPersonProfile Es gs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing ys debug ks getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('phc_r0kIdaUL8jaTd2FvR0UEs56NP7GoRhRmho8IRhX879Y', {
                    api_host: 'https://us.i.posthog.com',
                    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
                })
            `,
          },
        ],
      },
    },

    scripts: {
      registry: {
        googleAnalytics: {
          id: "G-K80PMDDGSD",
        },
      },
    },
  },
});
