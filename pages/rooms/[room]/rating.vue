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

  <div class="p-4">
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="w-9"></th>
            <th clas>Player</th>
            <th class="w-28 text-center">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 6" :class="{ 'bg-base-300 font-bold text-neutral-content': i == 2 }">
            <th>{{ i }}</th>
            <td>
              <div class="flex items-center">
                <img :src="`https://robohash.org/${i}.png?set=set3`" class="mr-2 h-8 w-8" />

                John Doe
              </div>
            </td>
            <td :class="[i > 4 ? 'font-bold uppercase text-red-500' : 'text-lime-500']" class="text-center">
              {{ i > 4 ? 'out' : 1150 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
