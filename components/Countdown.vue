<template>
  {{ output }}
</template>

<script>
import * as countdown from 'countdown'
import dayjs from 'dayjs'

export default {
  props: ['date'],

  data() {
    return {
      timer: null,
      output: '0:00',
    }
  },

  methods: {
    stop() {
      window.clearInterval(this.timer)
    },
  },

  mounted() {
    console.log('🚀 ~ this.timer=countdown.default ~ countdown:', countdown)

    const date = dayjs.unix(this.date)
    if (Date.now() > date) return
    this.timer = countdown.default(date, (ts) => {
      console.log('🚀 ~ this.timer=countdown.default ~ countdown:', countdown)
      if (ts.end < ts.start) this.output = ts.minutes + ':' + `${ts.seconds}`.padStart(2, '0')
      else this.stop()
    })
  },

  beforeUnmount() {
    this.stop()
  },
}
</script>
