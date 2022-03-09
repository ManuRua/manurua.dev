<script setup lang="ts">
import { latestArticle, getArticles } from "~/data"
import { limitString, slug } from "~/utils"

// Get latest article
const latest = computed(() => {
  return latestArticle()
})

// Get articles data
const articles = computed(() => {
  return getArticles(6)
})
</script>

<template>
  <div class="inline-grid px-4 lg:px-0">
    <h3 class="mt-10vh text-xl text-elucidator-700 dark:text-dark-repulser-400 font-bold uppercase tracking-widest opacity-50">
      hey! soy Manu Rúa
    </h3>
    <h1 class="mt-9 mb-10vh leading-tight text-5xl <sm:text-4xl text-elucidator-900 dark:text-dark-repulser-400 font-normal max-w-4xl">
      <span class="font-bold underline underline-underline-yellow underline-2 underline-offset-4">Ingeniero</span> <span class="font-bold underline underline-underline-yellow underline-2 underline-offset-4">software</span> y <span class="font-bold underline underline-underline-blue underline-2 underline-offset-4">creador</span> <span class="font-bold underline underline-underline-blue underline-2 underline-offset-4">digital</span> en remoto desde <span class="font-bold underline underline-underline-red underline-2 underline-offset-4">Sevilla</span> 💃🏻
    </h1>
  </div>
  <div class="flex flex-col flex-wrap mb-2 mt-12 px-4 lg:px-0">
    <div class="grid inline-grid grid-cols-2 mb-5">
      <h1 class="text-3xl font-bold text-elucidator-700 dark:text-dark-repulser-400">All post</h1>
      <router-link
        to="/articles"
        class="cursor-pointer text-right my-auto text-elucidator-700 dark:text-dark-repulser-400"
        >See all</router-link
      >
    </div>
    <div
      class="mx-auto inline-grid gap-4 mb-5 sm:grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10"
    >
      <Article
        v-for="(data, i) in articles"
        :key="i"
        :image="data.meta.frontmatter.thumbnail"
        :alt="`blog-banner-${slug(data.meta.frontmatter.name)}`"
        :tags="data.meta.frontmatter.tags"
        :date="`${new Date(data.meta.frontmatter.date).toDateString()}`"
        :title="data.meta.frontmatter.name"
        :to="data.path"
        :description="limitString(data.meta.frontmatter.description, 100)"
        :to-tags="`/tags/${data.meta.frontmatter.tags}`"
      />
    </div>
  </div>
</template>
