// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  app: {
    head: {
      script: [{ hid: "stripe", src: "https://telegram.org/js/telegram-web-app.js", defer: true }]
    }
  }
});
