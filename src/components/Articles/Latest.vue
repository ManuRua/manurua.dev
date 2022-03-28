<script setup lang="ts">
const props = defineProps<{
  image: string
  alt: string
  tags: Array<string>
  date: string
  title: string
  to: string
  toTags: string
}>()
</script>
<template>
  <router-link
    :to="to"
    class="h-full inline-grid gap-0 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
  >
    <img
      :src="$props.image"
      class="rounded h-sm object-cover mx-auto w-full"
      :alt="$props.alt"
      :aria-label="$props.alt"
      role="img"
      loading="lazy"
    />
    <div class="mt-5 flex flex-col lg:px-5 lg:pt-5 lg:mt-0">
      <span class="mb-2 sm:mt-5 lg:mt-0 text-base-700 dark:text-base-50"
        >Published at {{ $props.date }}</span
      >
      <router-link
        :to="to"
        class="text-3xl text-base-800 dark:text-base-400 font-bold mb-2"
      >
        {{ $props.title }}
      </router-link>
      <Tag :tags="$props.tags" class="mb-5 flex flex-row justify-start" />
    </div>
  </router-link>
</template>
