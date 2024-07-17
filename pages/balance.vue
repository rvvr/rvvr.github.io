<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Wallet</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4 pt-10">
    <div class="text-center">
      <p class="font-oswald mb-2 opacity-50">Your balance</p>
      <div class="kbd kbd-lg inline-flex items-center justify-center">
        <IconsCoins class="mr-2 mt-1 h-5 w-5" />
        <span class="font-mono text-3xl font-bold text-lime-500">{{ balance }}</span>
      </div>
    </div>

    <div class="relative mt-6" ref="wrap">
      <div
        class="circle absolute left-1/2 z-0 -ml-[110px] aspect-square h-full rounded-full"
        ref="circle"
      ></div>
      <div :class="[active ? 'active' : '']" class="bull z-1 relative mx-auto">
        <button
          @click="debounceTap(), play(), anime($event)"
          class="btn btn-link h-full w-full no-underline opacity-50 hover:no-underline"
        ></button>
      </div>
    </div>

    <div class="font-oswald mt-3 flex items-center justify-center text-center text-sm opacity-50">
      <IconsInfo class="mr-1 inline h-4 w-4" />
      Tap bull to earn more coins
    </div>

    <div class="mb-2 mt-16 flex items-center text-lg font-bold">Get access to freeroll rooms</div>
    <p class="opacity-50">
      In our platform, you have the opportunity to spend coins to gain access to freeroll rooms. These rooms
      provide you with a chance to win real cryptocurrency.
    </p>

    <NuxtLink to="/rooms">
      <button class="btn btn-neutral mt-4 w-full">Join rooms</button>
    </NuxtLink>

    <div class="mb-2 mt-8 flex items-center text-lg font-bold">Boost your balance</div>
    <p class="opacity-50">Ready to boost your balance? Earn coins by playing our blockchain-based game.</p>

    <NuxtLink to="/">
      <button class="btn btn-neutral mt-4 w-full">Boost balance</button>
    </NuxtLink>
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
      balance: null,
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
      window.navigator.vibrate([30])
      let { clientX, clientY } = e
      let el = document.createElement('span')
      el.innerHTML = '+1'
      el.setAttribute('class', 'absolute anime')
      el.setAttribute('style', `top:${clientY}px;left:${clientX}px;`)
      let body = document.body
      body.appendChild(el)

      this.$refs.circle.animate([{ transform: 'scale(1.03)' }], 100)
      el.animate(
        [{ opacity: 1 }, { transform: 'scale(1.90)' }, { opacity: 0, left: '50%', top: '150px' }],
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
.circle {
  @apply bg-gradient-to-t from-yellow-600 to-yellow-200  drop-shadow-lg;

  &:after {
    @apply absolute block rounded-full bg-yellow-500;

    content: '';
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.4) inset;
    background-image: url('/b3.png');
    background-repeat: no-repeat;
    background-position: -26px 10px;
    background-size: 260px;
  }
}

.bull {
  width: 320px;
  height: 219px;
  /* background-image: url('/b3.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 80%; */

  /* &.active {
    background-size:
      0 0,
      100% 100%;
  } */
}

.anime {
  @apply pointer-events-none select-none text-2xl;
  animation: visibility 1s;
  opacity: 0;
  font-weight: 900;
}
</style>
