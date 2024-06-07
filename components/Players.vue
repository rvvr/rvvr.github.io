<template>
  <div class="font-oswald grid grid-cols-4 gap-4 px-4 pt-3 uppercase">
    <div :class="up">3 players</div>
    <div :class="up" class="text-right font-bold text-lime-500">30.0</div>
    <div :class="down" class="font-bold text-red-500">60.0</div>
    <div :class="down" class="text-right">4 players</div>
  </div>
  <div class="grid grid-cols-2 gap-4 px-4 pb-1">
    <div :class="up" class="avatar-group -space-x-3 pt-2 rtl:space-x-reverse">
      <div v-for="i in 5" :key="i" class="avatar h-10 w-10 border-base-100 bg-base-300">
        <div class="h-8 w-8">
          <img :src="`https://robohash.org/${i}.png?set=set3`" />
        </div>
      </div>
      <div class="avatar placeholder h-10 w-10">
        <div class="h-8 w-8 bg-neutral text-neutral-content">
          <span>+9</span>
        </div>
      </div>
    </div>
    <div :class="down" class="avatar-group justify-end -space-x-3 pt-2 rtl:space-x-reverse">
      <div v-for="i in 4" :key="i" class="avatar h-10 w-10 border-base-100 bg-base-300">
        <div class="h-8 w-8">
          <img :src="`https://robohash.org/${i}.png?set=set3`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['state'],
  data() {
    return {
      up: '',
      down: '',
    }
  },

  mounted() {
    this.$bus.on('winner', (isUp) => {
      this[isUp ? 'up' : 'down'] = 'animate-bounce'
    })

    this.$bus.on('start', () => {
      if (this.state.mode === 'before') {
        this.up = this.down = ''
      }
    })
  },
}
</script>
