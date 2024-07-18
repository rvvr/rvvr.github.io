<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Wallet</div>
    </template>
  </NavbarView>

  <div class="h-full flex-1 p-4">
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
    <div class="mb-8 grid grid-cols-2 gap-4">
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

        <div class="kbd kbd-lg mt-4 inline-flex items-center justify-center" ref="balance">
          <IconsCoins class="mr-2 mt-1 h-5 w-5" />
          <span class="font-mono text-3xl font-bold text-lime-500">{{ user.balance }}</span>
        </div>
      </div>

      <div class="relative mt-4 w-full" ref="wrap">
        <div class="circle aspect-square rounded-full" ref="circle"></div>
        <button
          @touchend="debounceTap(), tap()"
          @touchstart="storeEvent($event)"
          class="absolute left-0 top-0 h-full w-full no-underline hover:no-underline"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import nuxtStorage from 'nuxt-storage'
import { mapActions, mapState, mapWritableState } from 'pinia'

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
      taps: 0,
      active: false,
      event: null,
    }
  },

  computed: {
    ...mapState(useUserStore, ['appUser']),
    ...mapWritableState(useUserStore, ['user']),
  },

  methods: {
    ...mapActions(useWalletStore, ['saveTaps']),

    storeEvent(event) {
      this.event = event
    },

    debounceTap: debounce(async function () {
      let taps = this.taps
      this.taps = 0
      this.active = false
      let user = await this.saveTaps(taps)
      if (!this.active) this.user = user
    }, 300),

    tap() {
      this.active = true
      this.user.balance++
      this.taps++
      window.navigator.vibrate([1])
      Object.values(this.event.touches).forEach((e) => this.animate(e))
    },

    animate(e) {
      let { pageX, pageY } = e
      let el = document.createElement('span')
      el.innerHTML = '+1'
      el.setAttribute('class', 'anime')
      el.setAttribute('style', `top:${pageY}px;left:${pageX}px;`)
      let body = document.body
      body.appendChild(el)
      this.$refs.circle.animate([{ transform: 'scale(1.01)' }], 100)
      el.animate(
        [
          { opacity: 1 },
          { transform: 'translateY(-100px)' },
          { opacity: 0, transform: 'translateY(-100px)' },
        ],
        500,
      )
      setTimeout(() => {
        el.parentNode.removeChild(el)
      }, 1000)
    },
  },
}
</script>

<style lang="postcss">
.circle {
  @apply bg-gradient-to-t from-yellow-600 to-yellow-200 drop-shadow-lg;
  width: 86%;
  margin-left: 7%;

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
    background-size: 120%;
    background-position: 40% -40%;
  }
}

.anime {
  @apply pointer-events-none absolute select-none text-2xl font-bold;
  animation: visibility 1s;
  opacity: 0;
  will-change: opacity, transform, left, right;
}
</style>
