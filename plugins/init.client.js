import VueKonva from 'vue-konva'
import Vue3Toasity from 'vue3-toastify'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueKonva)
  vueApp.use(Vue3Toasity, {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_CENTER,
    theme: toast.THEME.DARK,
    hideProgressBar: true,
  })

  return {
    provide: {
      toast: toast,
    },
  }
})
