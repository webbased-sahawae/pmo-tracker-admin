// https://nuxt.com/docs/api/configuration/nuxt-config
// import routes from "./data/routes.json";

export default defineNuxtConfig({
  ssr: false,
  modules: ["nuxt-vue3-google-signin", "nuxt-primevue"],
  googleSignIn: {
    clientId:
      "643210795718-odgaolru40pcotuainctvues1kakfm1g.apps.googleusercontent.com",
  },
  generate: {
    fallback: true,
    // routes
  },

  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    components: { prefix: "Prime", include: ["Toast", "Button"] },
  },
  runtimeConfig: {
    public: {
      ...process.env,
    },
  },
});
