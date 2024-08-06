import VueKonva from 'vue-konva'
import Vue3Toasity from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin(async ({ vueApp }) => {
  window.Telegram.WebApp.setHeaderColor('#130b30')
  window.Telegram.WebApp.setBackgroundColor('#130b30')

  vueApp.use(VueKonva)
  vueApp.use(Vue3Toasity, {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.BOTTOM_CENTER,
    theme: toast.THEME.DARK,
    hideProgressBar: true,
    autoClose: 1000,
  })

  return {
    provide: {
      toast: toast,
    },
  }
})
