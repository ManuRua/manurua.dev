<script setup lang="ts">
// https://vueuse.org/core/useWindowScroll/
const { x, y } = useWindowScroll()

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
</script>
<template>
  <div class="fixed right-5 bottom-5 z-1">
    <button
      aria-label="Back to top"
      :class="`to-top-btn bg-base-400 p-4 shadow rounded-1/2 ${
        y < 350 ? 'hidden' : 'block'
      } hover:shadow-lg`"
      @click="toTop"
    >
      <carbon-back-to-top class="text-sm flex flex-wrap justify-center text-white" />
    </button>
  </div>
</template>

<style lang="scss">
  .to-top-btn {
    line-height: 1.15;
  }
</style>
