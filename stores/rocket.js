export const useRocketStore = defineStore('rocket', {
  state: () => ({
    randomDiff: 0,
    rate: 0,
    ds: 0,
    multiplier: 1,
    betPlaced: 0,
    betPlanned: 0,
  }),
})
