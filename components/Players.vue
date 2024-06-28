<template>
  <div class="font-oswald grid grid-cols-4 gap-4 px-4 pt-3">
    <div>{{ players.up.length }} players</div>
    <div class="text-right font-bold text-lime-500">{{ treasury.up }}</div>
    <div class="font-bold text-red-500">{{ treasury.down }}</div>
    <div class="text-right">{{ players.down.length }} players</div>
  </div>
  <div class="grid grid-cols-2 gap-4 px-4 pb-1">
    <div :class="up" class="avatar-group -space-x-3 pt-2 rtl:space-x-reverse">
      <div
        v-for="(player, i) in players.up.slice(0, 5)"
        :key="i"
        class="avatar h-10 w-10 border-base-100 bg-base-300"
      >
        <div class="h-8 w-8">
          <img :src="player.avatar_url ? player.avatar_url : `https://robohash.org/${i}.png?set=set3`" />
        </div>
      </div>

      <div v-if="players.up.slice(5).length" :key="i" class="avatar placeholder h-10 w-10">
        <div class="h-8 w-8 bg-neutral text-neutral-content">
          <span>+{{ players.up.slice(5).length }}</span>
        </div>
      </div>
    </div>
    <div :class="down" class="avatar-group justify-end -space-x-3 pt-2 rtl:space-x-reverse">
      <div
        v-for="(player, i) in players.down.slice(0, 5)"
        :key="i"
        class="avatar h-10 w-10 border-base-100 bg-base-300"
      >
        <div class="h-8 w-8">
          <img :src="player.avatar_url ? player.avatar_url : `https://robohash.org/${i}.png?set=set3`" />
        </div>
      </div>

      <div v-if="players.down.slice(5).length" :key="i" class="avatar placeholder h-10 w-10">
        <div class="h-8 w-8 bg-neutral text-neutral-content">
          <span>+{{ players.down.slice(5).length }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      up: '',
      down: '',
      players: { up: [], down: [] },
      treasury: { up: 0, down: 0 },
    }
  },

  methods: {
    manageStart({ round_status, players, treasury }) {
      this.players = players
      this.treasury = treasury
      if (round_status === 'open') {
        this.up = this.down = ''
      }
    },

    manageWinner(side) {
      this[side] = 'animate-bounce'
    },
  },

  mounted() {
    this.$bus.on('start', this.manageStart)
    this.$bus.on('winner', this.manageWinner)
  },

  unmounted() {
    this.$bus.off('start', this.manageStart)
    this.$bus.off('winner', this.manageWinner)
  },
}
</script>
