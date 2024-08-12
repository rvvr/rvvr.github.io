export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@pinia/nuxt'],

  plugins: [
    '~/plugins/01.initUser.client.js',
    '~/plugins/02.initApp.client.js',
    '~/plugins/03.events.client.js',
  ],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no',
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

  runtimeConfig: {
    public: {
      initData: process.env.INIT_DATA,
      devId: process.env.DEV_ID,
      exchangeLink: process.env.EXCHANGE_LINK,
      apiURL: 'https://game.demo.cryptobull.io/api/v1',
      baseURL: 'https://game.demo.cryptobull.io',
    },
  },
})
