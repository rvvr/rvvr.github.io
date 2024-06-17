// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt'],

  plugins: ['~/plugins/init.client.js', '~/plugins/events.client.js', '~/plugins/timer.client.js'],

  app: {
    head: {
      script: [{ hid: 'stripe', src: 'https://telegram.org/js/telegram-web-app.js', defer: true }],
    },
  },

  googleFonts: {
    preload: true,
    families: {
      Roboto: true,
      Oswald: true,
    },
  },

  css: ['~/assets/css/main.css'],

  // alias: {
  //   pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  // },
})
