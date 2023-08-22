<script setup lang="ts">
import LiteYouTubeEmbed from "vue-lite-youtube-embed"
import 'vue-lite-youtube-embed/style.css'

const props = defineProps<{
  src: string
  title: string
}>()
</script>
<template>
  <LiteYouTubeEmbed
    :id="src"
    :title="title"
    poster="maxresdefault"
    :webp="true"
  />
</template>
