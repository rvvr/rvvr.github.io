<template>
  {{ output }}
</template>

<script>
import CountDown from 'countdown-pro'

export default {
  props: ['date'],

  data() {
    return {
      countdown: null,
      output: '',
    }
  },

  mounted() {
    const end = this.date * 1000
    const now = +Date.now()
    if (now > end) return

    this.output = CountDown.format(end - now, 'mm:ss')
    const self = this

    this.countdown = new CountDown({
      time: end - now,
      interval: 1000,
      onChange(time) {
        self.output = CountDown.format(time, 'mm:ss')
      },
      onEnd() {
        self.countdown.pause()
      },
    })
    this.countdown.start()
  },

  beforeUnmount() {
    this.countdown?.pause()
  },
}
</script>
