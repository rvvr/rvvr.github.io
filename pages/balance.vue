<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Wallet</div>
    </template>
  </NavbarView>

  <div class="grid h-full flex-1 grid-rows-[1fr_2fr] gap-2 p-4">
    <!-- <div>
      <div class="mb-2 mt-16 flex items-center text-lg font-bold">Get access to freeroll rooms</div>
      <p class="opacity-50">

      </p>

      <NuxtLink to="/rooms">
        <button class="btn btn-neutral mt-4 w-full">Join rooms</button>
      </NuxtLink>

      <div class="mb-2 mt-8 flex items-center text-lg font-bold">Boost your balance</div>
      <p class="opacity-50"></p>

      <NuxtLink to="/">
        <button class="btn btn-neutral mt-4 w-full">Boost balance</button>
      </NuxtLink>
    </div> -->
    <div class="grid grid-cols-2 gap-2">
      <NuxtLink to="/rooms">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-xl">
          <span class="absolute right-4 top-4 flex h-3 w-3">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>

          <div class="card-body">
            <h2 class="card-title">Get access to freeroll rooms</h2>

            <p>In our platform, you have the opportunity to spend coins to gain access to freeroll rooms.</p>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-xl">
          <span class="absolute right-4 top-4 flex h-3 w-3">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>
          <div class="card-body">
            <h2 class="card-title">Boost your balance</h2>
            <p>Ready to boost your balance? Earn coins by playing our blockchain-based game.</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div class="text-center">
        <div class="font-oswald flex items-center justify-center text-center text-sm opacity-50">
          <IconsInfo class="mr-1 inline h-4 w-4" />
          Your balance, tap bull to earn more coins
        </div>

        <div class="kbd kbd-lg mt-4 inline-flex items-center justify-center">
          <IconsCoins class="mr-2 mt-1 h-5 w-5" />
          <span class="font-mono text-3xl font-bold text-lime-500">{{ balance }}</span>
        </div>
      </div>

      <div class="relative mt-4" ref="wrap">
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
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import nuxtStorage from 'nuxt-storage'
import { mapState } from '~/node_modules/pinia/dist/pinia'

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

  computed: {
    ...mapState(useUserStore, ['appUser']),
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
      window.navigator.vibrate([10])
      let { clientX, clientY } = e
      let el = document.createElement('span')
      el.innerHTML = '+1'
      el.setAttribute('class', 'absolute anime')
      el.setAttribute('style', `top:${clientY}px;left:${clientX}px;`)
      let body = document.body
      body.appendChild(el)

      this.$refs.circle.animate([{ transform: 'scale(1.03)' }], 100)
      el.animate(
        [{ opacity: 1 }, { transform: 'scale(1.90)' }, { opacity: 0, left: '50%', top: '450px' }],
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
