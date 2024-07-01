<template>
  <NavbarView>
    <template #left><div /></template>
    <template #center>
      <div class="font-bold text-neutral-content">Room rating</div>
    </template>
    <template #right>
      <NuxtLink :to="`/rooms/${$route.params.room}`"><NavbarClose /></NuxtLink>
    </template>
  </NavbarView>

  <Loader :data="data">
    <div class="p-4">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="w-9"></th>
              <th>Player</th>
              <th class="w-28 text-center">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in sorted"
              :key="i"
              :class="{ 'bg-base-300 font-bold text-neutral-content': i == 2 }"
            >
              <th>{{ row.position }}</th>
              <td>
                <div class="flex items-center">
                  <img
                    :src="
                      row.avatar_url
                        ? useRuntimeConfig().public.baseURL + row.avatar_url
                        : `https://robohash.org/${i}.png?set=set3`
                    "
                    class="mr-2 h-8 w-8 rounded-full"
                  />

                  {{ row.username }}
                </div>
              </td>
              <td
                :class="[row.balance ? 'text-lime-500' : 'uppercase text-red-500']"
                class="text-center font-bold"
              >
                {{ row.balance ? row.balance : 'out' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </Loader>
</template>

<script>
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      data: null,
    }
  },

  methods: {
    ...mapActions(useRoomStore, ['getRoomRating']),
  },

  computed: {
    sorted() {
      return this.data.sort((a, b) => a.position - b.position)
    },
  },

  async mounted() {
    this.data = await this.getRoomRating(this.$route.params.room)
  },
}
</script>
