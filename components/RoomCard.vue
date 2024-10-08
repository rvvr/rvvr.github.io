<template>
  <div class="card card-compact mb-4 bg-white bg-opacity-10 shadow-xl">
    <figure :style="style" class="relative h-40">
      <img :src="`https://robohash.org/${room.id}.png`" class="ml-[130px]" />

      <div
        v-if="room.price_pool"
        class="font-oswald absolute bottom-1.5 left-1.5 flex items-baseline rounded-xl bg-black bg-opacity-80 px-3 py-1 pt-0.5 text-2xl text-neutral-content"
      >
        <IconsTrophy class="mr-1 h-4 w-4" />
        <span class="pt-[1px] opacity-90">{{ room.price_pool }} usdt</span>
      </div>
    </figure>
    <div class="card-body">
      <h2 class="font-oswald card-title block">
        {{ room.name }}
      </h2>
      <div class="flex justify-between">
        <div>
          <IconsTime v-if="!started" class="mb-1 inline h-3.5 w-3.5 text-neutral-content" />
          Start{{ started ? 'ed' : 's' }}
          <span :class="[started ? 'text-lime-500' : 'text-accent']" class="bold">{{ time }}</span>
        </div>

        <div class="flex items-center justify-end">
          <IconsUser class="mr-1.5 inline h-3 w-3 text-neutral-content" />
          <span class="pt-[1px]"> {{ room.current_participants }}/{{ room.max_participants }} </span>
        </div>
      </div>
      <p class="opacity-50">{{ room.description }}</p>

      <div class="card-actions pt-3">
        <button v-if="!vacancies" class="btn w-full !text-opacity-80" disabled>Tournament is full</button>

        <button
          v-else-if="!room.active"
          @click="join(room.id, $event)"
          :disabled="disabled"
          class="btn btn-neutral relative w-full justify-center !text-white"
        >
          <IconsMultiTicket class="absolute left-3 top-[3px] h-10 w-auto" />
          <div v-if="room.enter_fee || room.invite_only" class="flex">
            <img v-if="room.enter_fee" class="mr-1 h-5 w-5" alt="" src="/coin.png" />

            <span class="font-oswald text-lg leading-none">
              {{ room.invite_only ? inviteOnlyText : room.enter_fee }}
            </span>
          </div>
        </button>

        <NuxtLink
          v-else-if="room.status === 'running'"
          :to="`/games/rooms/${gameType}-${room.id}`"
          class="w-full"
        >
          <button class="btn btn-accent w-full">Enter room</button>
        </NuxtLink>

        <button v-else class="btn w-full !text-opacity-80" disabled>
          <span v-if="timeStamp > Date.now()"> You will be able to join {{ time }}... </span>
          <span v-else>Starting...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { mapState } from '~/node_modules/pinia/dist/pinia'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

export default {
  props: ['room', 'join', 'index', 'gameType', 'vacancies'],

  data() {
    return {
      style: null,
      left: 0,
      max: 300,
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.makeColors()
    })
    this.countLeft()
  },

  methods: {
    makeColors() {
      const color = stringToColor(this.room.name)
      const colorTwo = stringToColor(this.room.start_date)
      this.style = `background: white; background: radial-gradient(circle, ${color} 0%, ${colorTwo} 100%);`
    },
    randomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    countLeft() {
      const date1 = dayjs.tz(this.room.start_date, 'Etc/UCT')
      const date2 = dayjs()
      this.left = -date2.diff(date1, 's')
    },
  },

  computed: {
    ...mapState(useUserStore, ['user', 'friends']),

    inviteOnlyText() {
      return this.notEnoughFriends ? this.room.invite_text : 'Enter'
    },
    notEnoughFriends() {
      return this.room.invite_only && this.friends.length < 5
    },
    notEnoughBalance() {
      return this.room.enter_fee && this.room.enter_fee > this.user.balance
    },
    disabled() {
      return this.notEnoughFriends || this.notEnoughBalance
    },
    timeStamp() {
      return dayjs.tz(this.room.start_date, 'Etc/UCT')
    },
    time() {
      return dayjs.tz(this.room.start_date, 'Etc/UCT').fromNow()
    },
    started() {
      return this.room.status === 'running'
    },
  },
}

const stringToColor = (str) => {
  let hash = 0
  str.split('').forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}
</script>
