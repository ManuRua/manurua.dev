<script setup lang="ts">
import { capitalizeStr } from "~/utils"

const props = defineProps<{
  tags: Array<string>
}>()
</script>

<template>
  <div>
    <router-link
      v-for="(data, i) in tags"
      :key="i"
      :to="`/tags/${data.toLowerCase()}`"
      class="text-base-700 p-1 text-xs bg-gray-100 dark:bg-gray-200 rounded-full m-1 mr-2 ml-0"
    >
      <span class="p-2 mono">{{ capitalizeStr(data) }}</span>
    </router-link>
  </div>
</template>

<style lang="scss">
.card-hover {
  transition: all 0.3s ease;
  position: relative;
  top: 0;
  &:hover {
    top: -5px;
  }
}
</style>
