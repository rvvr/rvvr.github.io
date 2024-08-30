<template>
  <NavbarView>
    <template #center>
      <div class="font-bold text-neutral-content">Friends</div>
    </template>
  </NavbarView>

  <div class="flex-1 p-4">
    <div class="mt-4 text-center">
      <div class="font-oswald card-title inline">Invite friends</div>
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
        <a :href="`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`" class="flex-1">
          <button class="btn btn-accent w-full">Invite a friend</button>
        </a>
        <button @click="copy" class="btn ml-2">
          <IconsCopy />
        </button>
      </div>
    </div>

    <div class="font-oswald mt-8">List of your friends ({{ friends.length }})</div>
    <div class="mt-2 overflow-x-auto">
      <table v-if="friends.length" class="table table-zebra">
        <tbody>
          <tr v-for="friend in friends" :key="friend.invited_user_id">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar rounded-full bg-black outline outline-neutral-content">
                  <div class="mask mask-squircle h-12 w-12">
                    <img :src="`https://robohash.org/${friend.invited_user_id}.png?set=set4`" />
                  </div>
                </div>
                <div>
                  <div class="font-bold">@{{ friend.invited_user_name }}</div>
                  <div class="text-sm opacity-50">#{{ friend.invited_user_id }}</div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-sm opacity-50">No invited friends yet</div>
    </div>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import { mapState, mapActions } from '~/node_modules/pinia/dist/pinia'

export default {
  data() {
    return {
      encodedText: encodeURIComponent('Lets play game!'),
      url: 'https://t.me/bullflagbot?start=',
      encodedUrl: null,
    }
  },
  async mounted() {
    this.url += this.appUser.id
    this.encodedUrl = encodeURIComponent(this.url)
    await this.fetchFriends()
  },
  computed: {
    ...mapState(useUserStore, ['appUser', 'friends']),
  },
  methods: {
    ...mapActions(useUserStore, ['fetchFriends']),

    copy() {
      copy(this.href)
      this.$toast.success(`Invite link copied!`)
    },
  },
}
</script>
