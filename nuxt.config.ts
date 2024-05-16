// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],

  plugins: ['~/plugins/init.client.js'],

  app: {
    head: {
      script: [{ hid: 'stripe', src: 'https://telegram.org/js/telegram-web-app.js', defer: true }],
    },
  },
})
