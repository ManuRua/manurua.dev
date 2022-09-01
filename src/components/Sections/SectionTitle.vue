<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <h2 class="py-0.5 px-2 bg-gray-200 dark:bg-gray-500 rounded-lg text-2xl w-max h-9 font-bold text-base-900 dark:text-base-50">{{ $props.title }}</h2>
</template>
