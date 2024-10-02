<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <NuxtLink to="/home">
        <NavbarBalance :balance="balance" />
      </NuxtLink>
    </template>
  </NavbarView>

  <div class="relative flex flex-1 bg-[#09090b]">
    <template v-if="running">
      <RocketGame @end="end" class="flex-1" ref="game" />
      <RocketMultiplier ref="multiplier" />
    </template>

    <RocketWait v-else :counter="counter" />
  </div>

  <RocketBet />
</template>

<script>
import rocket from '~/mixins/rocket'

export default {
  mixins: [rocket],

  methods: {
    async prepare() {
      await Promise.all([this.counterTick(), this.fetchRate()])
      this.run()
    },
  },
}
</script>
