<template>
  <div class="flex-1 p-4">
    <div class="flex items-center p-4 text-neutral-content">
      <span><IconsFree class="mr-2 h-6 w-6" /></span>
      <span class="text-xl font-bold">Freeroll rooms</span>
    </div>

    <table class="table table-sm">
      <tbody>
        <tr v-for="i in 9">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12 bg-secondary">
                  <img :src="`https://robohash.org/${i}.png`" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div class="font-bold">Room #{{ i }}</div>

                <div class="avatar-group -space-x-4">
                  <div v-for="j in 10 - i" :key="i" class="avatar h-8 w-8 border-base-100 bg-base-300">
                    <div class="h-8 w-8">
                      <img :src="`https://robohash.org/${j}.png?set=set3`" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>

          <td class="text-right">
            <NuxtLink to="/">
              <button class="btn">Join</button>
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>
