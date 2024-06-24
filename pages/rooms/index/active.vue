<template>
  <div class="flex-1 p-1">
    <table class="table table-sm">
      <tbody>
        <tr v-for="i in 2">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12 bg-secondary">
                  <img :src="`https://robohash.org/${i}.png`" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold text-neutral-content">Daily room</div>
                <div>0{{ i }}.06 / 12:00</div>
              </div>
            </div>
          </td>

          <td>{{ 7 - i }}/6</td>

          <td class="text-right">
            <NuxtLink :to="`/rooms/${i}`">
              <button class="btn btn-neutral w-24">Enter</button>
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
