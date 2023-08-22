<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <h2 class="section-title py-1 px-2 bg-gray-200 dark:bg-gray-500 rounded-lg w-max font-bold text-base-900 dark:text-base-50">{{ $props.title }}</h2>
</template>

<style lang="scss">
  .section-title {
    @apply h-12 lg:h-13
    @apply text-3xl lg:text-4xl
  }
</style>
