<template>
  <NavbarView>
    <template #left><div /></template>
    <template #center>
      <div class="font-bold text-neutral-content">Room history</div>
    </template>
    <template #right>
      <NuxtLink to="/rooms/"><NavbarClose /></NuxtLink>
    </template>
  </NavbarView>

  <div class="py-4">
    <Loader :data="history">
      <div class="overflow-x-auto">
        <table class="table table-pin-rows">
          <thead>
            <tr>
              <th>#</th>
              <th class="text-right">Total Up</th>
              <th class="text-right">Total Down</th>
              <th class="text-center">Result</th>
              <th class="text-center">Wins</th>
              <th class="text-right">Bet</th>
              <th class="text-right">Payout</th>
              <th class="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in history" :key="i">
              <td>{{ row.round_num }}</td>
              <td class="text-right">{{ row.total_up }}</td>
              <td class="text-right">{{ row.total_down }}</td>
              <td class="text-center">{{ row.result }}</td>
              <td class="text-center">{{ row.win_or_loss }}</td>
              <td class="text-right">{{ row.bet }}</td>
              <td class="text-right">{{ row.payout }}</td>
              <td class="text-right">{{ row.balance }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Loader>
  </div>
</template>

<script>
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      history: null,
    }
  },
  methods: {
    ...mapActions(useRoomStore, ['getRoomHistory']),
  },

  async mounted() {
    this.history = await this.getRoomHistory(this.$route.params.room)
  },
}
</script>
