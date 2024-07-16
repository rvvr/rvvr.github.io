<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Balance</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4 pt-20">
    <div
      class="font-oswald mb-7 flex items-center justify-center text-center text-3xl font-bold text-lime-500"
    >
      <IconsCoins class="mr-3 mt-2 h-8 w-8" />
      <span>{{ balance }}</span>
    </div>

    <div class="relative" ref="wrap">
      <div
        class="absolute left-1/2 z-0 -ml-[110px] aspect-square h-full rounded-full bg-black opacity-30"
      ></div>
      <div :class="[active ? 'active' : '']" class="bull z-1 relative mx-auto">
        <button
          @click="debounceTap(), play(), anime($event)"
          class="btn btn-link h-full w-full no-underline opacity-50 hover:no-underline"
        ></button>
      </div>
    </div>
    <div class="font-oswald mt-3 text-center text-neutral-content">Tap to earn</div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import nuxtStorage from 'nuxt-storage'

export default {
  mounted() {
    if (process.client) {
      const wallet = nuxtStorage.localStorage.getData('wallet')
      if (!wallet) nuxtStorage.localStorage.setData('wallet', 0)
      this.balance = nuxtStorage.localStorage.getData('wallet')
    }
  },

  data() {
    return {
      active: false,
      balance: 0,
    }
  },

  methods: {
    debounceTap: debounce(function () {
      this.stop()
    }, 300),

    play() {
      if (process.client) {
        nuxtStorage.localStorage.setData('wallet', this.balance + 1)
        this.balance = nuxtStorage.localStorage.getData('wallet')
        this.active = true
      }
    },

    stop() {
      this.active = false
    },

    anime(e) {
      let { clientX, clientY } = e
      let el = document.createElement('span')
      el.innerHTML = '+1'
      el.setAttribute('class', 'absolute anime')
      el.setAttribute('style', `top:${clientY}px;left:${clientX}px;`)
      let body = document.body
      body.appendChild(el)
      el.animate(
        [{ opacity: 1 }, { transform: 'scale(1.90)' }, { transform: 'translateY(-200px)', opacity: 0 }],
        300,
      )
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 300)
    },
  },
}
</script>

<style lang="postcss">
.bull {
  width: 320px;
  height: 219px;
  background-image: url('/b1.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  &.active {
    background-image: url(b1.webp);
  }
}

.anime {
  @apply pointer-events-none select-none text-2xl;
  animation: visibility 1s;
  opacity: 0;
  font-weight: 900;
}
</style>
