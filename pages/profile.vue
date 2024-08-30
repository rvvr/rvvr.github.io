<template>
  <NavbarView>
    <template #left><div /></template>
    <template #center>
      <div class="font-bold text-neutral-content">Profile settings</div>
    </template>
    <template #right>
      <NuxtLink @click="$router.go(-1)"><NavbarClose /></NuxtLink>
    </template>
  </NavbarView>

  <div class="p-4">
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text">App theme</span>
      </div>
      <select class="select select-bordered" data-choose-theme>
        <option v-for="(theme, i) in themes" :key="i" :value="theme">{{ theme }}</option>
      </select>
    </label>
  </div>
</template>

<script>
import { themeChange } from 'theme-change'
import { themes } from '@/themes'

export default {
  data() {
    return { themes }
  },
  mounted() {
    themeChange(false)
  },
}
</script>
