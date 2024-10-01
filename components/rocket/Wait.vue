<template>
  <Transition>
    <div class="z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center px-4">
      <div>
        <img class="mx-auto h-12 w-12 animate-bounce" alt="" src="/rocket-svgrepo-com.png" />
        <div class="font-oswald">Waiting for next round</div>
        <progress :value="counter" class="progress progress-error" max="100"></progress>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: ['counter'],
}
</script>
