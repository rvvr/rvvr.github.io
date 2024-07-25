<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Friends</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="mt-4 text-center">
      <div class="card-title inline">Invite friends</div>
      <p class="mt-2 opacity-50">You and your friend will receive bonuses</p>
    </div>

    <div class="card card-compact mb-4 mt-8 bg-white bg-opacity-10 shadow-xl">
      <div class="card-body flex-row items-center">
        <div class="relative">
          <IconsMultiGift class="inline h-16 w-16" />
          <span
            class="font-oswald badge badge-warning badge-lg absolute left-0 top-[35px] align-text-bottom font-bold text-green-700"
          >
            +5000
          </span>
        </div>
        <div class="pl-2">
          <h2 class="card-title block">Share to friend</h2>
          <p class="opacity-80">Now you and your friend can earn amazing rewards just by sharing the app!</p>
        </div>
      </div>
      <div class="flex px-4 pb-4 pt-2">
        <a
          class="flex-1"
          href="https://t.me/share/url?url=https%3A%2F%2Ft.me%2Fbullfights_bot%2Fstart%3Fstartapp%3Did524648&text=Play%20with%20me%21"
        >
          <button class="btn btn-accent w-full">Invite a friend</button>
        </a>
        <button @click="copy" class="btn ml-2">
          <IconsCopy />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'

export default {
  methods: {
    copy() {
      copy('https://t.me/bullfights_bot/start?startapp=id524648')
      this.$toast.success(`Invite link copied!`)
    },
  },
}
</script>

<style></style>
