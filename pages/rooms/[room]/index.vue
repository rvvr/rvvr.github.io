<template>
  <NavbarView class="!bg-[#09090b]">
    <template #center>
      <div class="grid grid-cols-[1fr_1fr_1fr] justify-items-center gap-2">
        <div class="font-oswald flex items-center text-sm">
          <template v-if="current_round_number">
            <!-- <span class="mr-1">Play</span> -->
            <IconsCycle class="mr-1 h-3.5 w-3.5 pt-px text-neutral-content" />
            {{ roundNumber }}/{{ `${max_round_number}`.slice(-2) }}
          </template>
        </div>

        <NuxtLink :to="`/rooms/${$route.params.room}/rating`">
          <NavbarBalance :balance="userRating.balance" :fake="true" />
        </NuxtLink>

        <NuxtLink :to="`/rooms/${$route.params.room}/rating`" class="font-oswald flex items-center text-sm">
          <template v-if="userRating.position">
            <!-- <span class="mr-1">Place</span> -->
            <IconsTrophy class="mx-1 h-3 w-3 text-neutral-content" />
            {{ userRating.position }}/{{ roomRating.length }}
          </template>
        </NuxtLink>
      </div>
    </template>
  </NavbarView>

  <div class="font-oswald flex items-center justify-between bg-[#09090b] pb-2 pl-4 pr-1.5 text-xs">
    <div class="flex pt-px">
      <div><IconsTrophy class="inline h-3 w-3 align-baseline text-neutral-content" /> 3 USDT</div>
      <div class="mx-1.5 opacity-50">/</div>
      <div><IconsTrophy class="inline h-3 w-3 align-baseline text-slate-400" /> 2 USDT</div>
      <div class="mx-1.5 opacity-50">/</div>
      <div><IconsTrophy class="inline h-3 w-3 align-baseline text-orange-500" /> 1 USDT</div>
    </div>

    <div class="btn btn-neutral btn-xs">How to play?</div>
  </div>

  <Game />

  <dialog class="modal" ref="modal">
    <ModalsRoomClosed :room-rating="roomRating" :user="user" />
  </dialog>

  <dialog class="modal" ref="modalsRoundClosed">
    <ModalsRoundClosed
      :room-rating="roomRating"
      :roundNumber="roundNumber"
      :user="user"
      :userRating="userRating"
    />
  </dialog>
</template>

<script>
import { mapState } from 'pinia'
import rooms from '~/mixins/rooms'

export default {
  mixins: [rooms],
  data() {
    return {
      wss: null,
    }
  },
  methods: {
    closeRoom() {
      this.$refs.modal.showModal()
      this.closeRoomSocket()
    },
    manageEvent({ round_status }) {
      if (round_status === 'closed') {
        setTimeout(() => {
          if (this.$refs.modalsRoundClosed) this.$refs.modalsRoundClosed.showModal()
        }, 2000)
        setTimeout(() => {
          if (this.$refs.modalsRoundClosed) this.$refs.modalsRoundClosed.close()
        }, 7000)
      }
    },
  },
  computed: {
    ...mapState(useRoomStore, ['userRating', 'roomRating', 'current_round_number', 'max_round_number']),
    ...mapState(useUserStore, ['user']),

    roundsLeft() {
      const left = this.max_round_number - this.current_round_number + 1
      return left > 99 ? '99+' : left
    },

    roundNumber() {
      return `${this.current_round_number}`.slice(-2)
    },
  },
  mounted() {
    // this.$refs.modalsRoundClosed.showModal()
    this.openRoomSocket(this.$route.params.room)
    this.$bus.on('closeRoom', this.closeRoom)
    this.$bus.on('start', this.manageEvent)
  },
  unmounted() {
    this.closeRoomSocket()
    this.$bus.off('closeRoom', this.closeRoom)
    this.$bus.off('start', this.manageEvent)
  },
}
</script>
