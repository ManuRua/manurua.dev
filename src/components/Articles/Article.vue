<script setup lang="ts">
const props = defineProps<{
  image: string
  alt: string
  tags: Array<string>
  date: string
  time: number
  title: string
  to: string
}>()
</script>

<template>
  <router-link :to="to" class="max-w-lg rounded shadow-lg card-hover flex flex-col">
    <img :src="image" class="h-auto object-cover w-full" :alt="alt" loading="lazy" />
    <div class="article-content flex content-between flex-1 flex-col dark:bg-base-50 py-2 px-4">
      <div class="article-content-top flex-1">
        <div class="flex mt-2">
          <carbon-calendar class="mr-1 text-xs text-base-700" />
          <span class="text-base-700 mb-1 text-xs text-center">{{ date }}</span>
        </div>
        <div class="flex mt-1">
          <carbon-time class="mr-1 text-xs text-base-700" />
          <span class="text-base-700 mb-1 text-xs text-center"
            >{{ time }} minutos de lectura</span
          >
        </div>
        <h1 class="text-xl text-base-800 font-bold p-1 mb-1 whitespace-pre-wrap">{{ title }}</h1>
      </div>
      <div class="article-content-bottom">
        <Tag :tags="tags" class="mb-5 flex flex-wrap flex-row justify-start" />
      </div>
    </div>
  </router-link>
</template>

<style lang="scss">
.card-hover {
  transition: all 0.3s ease;
  position: relative;
  top: 0;
  &:hover {
    top: -10px;
  }
}
</style>
