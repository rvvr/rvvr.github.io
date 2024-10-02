import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      running: false,
      counter: 0,
      loop: null,
    }
  },

  async mounted() {
    this.loop = new Loop(() => this.$refs.game?.run(), 20)
    await this.prepare()
  },

  computed: {
    ...mapState(useRocketStore, ['balance']),
  },

  methods: {
    ...mapActions(useRocketStore, ['fetchRate', 'placeBet', 'wipeBet']),

    run() {
      this.placeBet()
      this.running = true
      this.loop.start()
    },

    async end() {
      this.wipeBet()
      this.loop.stop()
      await sleep(2000)
      this.running = false
      await this.prepare()
    },

    async counterTick() {
      while (this.counter < 100) {
        this.counter++
        await sleep(25)
      }
      this.counter = 0
    },
  },

  beforeUnmount() {
    this.loop?.stop()
    useRocketStore().$reset()
  },
}
