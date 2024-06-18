<template>
  <div class="navbar grid grid-cols-[48px_auto_48px] justify-items-center gap-2 bg-base-200">
    <NuxtLink class="flex w-12 justify-center" to="/">
      <img class="h-10 w-10" alt="" src="/favicon.png" />
    </NuxtLink>

    <div>
      <template v-if="isIndex">
        <!-- wallet -->
        <NuxtLink v-if="isLogged" to="/wallet/deposit/">
          <div class="btn btn-neutral btn-lg -mt-8 bg-info-content pt-4">
            Balance
            <IconsWallet class="h-4 w-4 text-neutral-content" />
            <span class="font-oswald pb-1 text-xl font-bold leading-none text-lime-500">
              {{ user.balance }}
            </span>
            <!-- <IconsTether class="-ml-1 block h-4 w-4 text-neutral-400" /> -->
          </div>
        </NuxtLink>

        <!-- wallet connect -->
        <div v-else v-show="!isLogged" class="flex justify-center">
          <span v-show="appUser.id" class="loading loading-dots loading-md"></span>
        </div>
      </template>
    </div>

    <!-- profile -->
    <div v-show="isIndex">
      <div v-if="avatar" class="avatar btn btn-circle btn-ghost h-10 min-h-10" role="button" tabindex="0">
        <div class="h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-black">
          <img :src="avatar" class="rounded-full" alt="" />
        </div>
      </div>
    </div>

    <!-- close icon -->
    <NuxtLink v-show="!isIndex" class="flex-none justify-end" to="/">
      <button class="btn btn-circle h-10 min-h-10 w-10 bg-base-300">
        <IconsCross class=""></IconsCross>
      </button>
    </NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(useUserStore, ['user', 'appUser', 'avatar']),

    isIndex() {
      return this.$route.name === 'index'
    },
    isLogged() {
      return !!this.user?.user_id
    },
  },
}
</script>
