import VueKonva from 'vue-konva'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueKonva)
  // return {
  //   provide: {
  //     toast: useToast(),
  //   },
  // }
})