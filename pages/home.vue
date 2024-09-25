<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Wallet</div>
    </template>
  </NavbarView>

  <div class="h-full flex-1 p-4">
    <div class="mb-4 grid grid-cols-2 gap-4">
      <NuxtLink to="/games">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <span class="absolute right-4 top-4 flex h-3 w-3">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>
          <div class="card-body items-center">
            <img class="mx-auto h-12" src="/coinb.png" />
            <p class="font-oswald">Boost balance</p>
          </div>
        </div>
      </NuxtLink>
      <NuxtLink to="/games">
        <div class="card card-compact relative bg-white bg-opacity-10 shadow-sm">
          <span class="absolute right-4 top-4 flex h-3 w-3">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
            ></span>
            <span class="relative inline-flex h-3 w-3 rounded-full bg-sky-500"></span>
          </span>

          <div class="card-body items-center">
            <img class="mx-auto h-12" src="/money.png" />
            <p class="font-oswald">Freeroll rooms</p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div class="text-center">
        <div class="mt-4 inline-flex items-baseline justify-center" ref="balance">
          <img class="mr-2 h-6 w-6" alt="" src="/coin.png" />
          <span class="font-oswald text-3xl font-bold text-lime-500">{{ user.balance }}</span>
        </div>
      </div>

      <div class="relative mt-4 w-full" ref="wrap">
        <div
          class="circle mx-auto h-72 w-72 rounded-full bg-gradient-to-t from-yellow-600 to-yellow-200 p-2.5 drop-shadow-lg"
          ref="circle"
        >
          <div class="in-circle h-full w-full rounded-full bg-yellow-500"></div>
        </div>
        <button
          @touchend="debounceTap(), tap()"
          @touchstart="storeEvent($event)"
          class="absolute left-0 top-0 h-full w-full no-underline hover:no-underline"
        ></button>
      </div>

      <div class="font-oswald mt-4 flex items-center justify-center text-center text-sm opacity-50">
        <IconsInfo class="mr-1 inline h-4 w-4" />
        Tap bull to earn more coins
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapActions, mapState, mapWritableState } from 'pinia'

export default {
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
      await this.saveTaps(taps)
    }, 300),

    tap() {
      this.active = true
      this.user.balance++
      this.taps++
      if (this.event) {
        Object.values(this.event.touches).forEach((e) => this.animate(e))
      }

      window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
    },

    animate(e) {
      let { pageX, pageY } = e
      let el = document.createElement('span')
      let body = document.body
      el.innerHTML = '+1'
      el.setAttribute('class', 'anime')
      el.setAttribute('style', `top:${pageY}px;left:${pageX}px;`)
      body.appendChild(el)
      this.$refs.circle.animate([{ transform: 'scale(1.01)' }], 100)
      el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-150px)' }], 1000)
      setTimeout(() => el.parentNode.removeChild(el), 1000)
    },
  },
}
</script>

<style lang="postcss">
.in-circle {
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.4) inset;
  background-image: url('/b3.png');
  background-repeat: no-repeat;
  background-size: 120%;
  background-position: 40% -40%;
}

.anime {
  @apply pointer-events-none absolute select-none text-2xl font-bold text-white opacity-0;
  animation: visibility 1s;
  will-change: opacity, transform, left, right;
}
</style>
