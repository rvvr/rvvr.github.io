<template>
  <div ref="graph">
    <client-only>
      <v-stage :config="stage">
        <v-layer :config="layer">
          <v-line v-for="(line, i) in lines" :config="line" :key="i"></v-line>
        </v-layer>
      </v-stage>
    </client-only>
  </div>
</template>

<script>
const lineConf = {
  stroke: 'red',
  strokeWidth: 4,
  lineCap: 'round',
  lineJoin: 'round',
  shadowColor: 'white',
  shadowBlur: 10,
  shadowOffset: { x: -10, y: 0 },
  shadowOpacity: 0.5,
}
export default {
  data() {
    return {
      layer: { x: 0, y: 0 },
      stage: { width: 200, height: 200 },
      lines: [{ points: [0, 100, 1, 100], ...lineConf }],
    }
  },

  mounted() {
    this.stage.width = this.$refs.graph.clientWidth
    let full = false
    const step = 1
    let startTime = Date.now()

    setInterval(() => {
      if (this.lines.length > this.stage.width / step / 2 - 1) full = true
      if (full) {
        this.lines.shift()
        this.lines = this.lines.map((line) => {
          line.points[0] -= step
          line.points[2] -= step
          return line
        })
        // this.layer.x -= step
      }

      const elapsed = Date.now() - startTime

      const start = this.lines.slice(-1)[0].points.slice(-2)

      let finishY = start[1]
      if (elapsed > 500) {
        startTime = Date.now()
        finishY += Math.random() < 0.5 ? -Math.random() * 10 : Math.random() * 10
      }

      this.lines.push({
        points: [...start, start[0] + step, finishY],
        ...lineConf,
      })
    }, 50)
  },
}
</script>

<style></style>
