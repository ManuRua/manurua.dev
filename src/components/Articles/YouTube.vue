<script setup lang="ts">
import YouTube from "vue3-youtube"

const props = defineProps<{
  src: string
}>()
</script>
<template>
  <YouTube
    :src="src"
    width="100%"
    height="100%"
    ref="youtube"
    class="m-auto <md:w-auto <sm:h-xs w-2xl h-sm my-10"
  />
</template>
