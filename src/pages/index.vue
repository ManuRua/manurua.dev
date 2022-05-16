<script setup lang="ts">
import { latestArticle, getArticles } from "~/data"
import { limitString, slug, setCanonical } from "~/utils"

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

setCanonical()

// Get latest article
// const latest = computed(() => {
//   return latestArticle()
// })

// Get articles data
const articles = computed(() => {
  return getArticles(6)
})
</script>

<template>
  <div class="inline-grid px-4 lg:px-0">
    <h3 class="mt-10vh text-xl text-base-700 dark:text-base-50 font-bold uppercase tracking-widest opacity-50">
      hey! soy Manu Rúa
    </h3>
    <div class="mt-2 flex">
      <a
        href="https://github.com/ManuRua"
        target="_blank"
        rel="noreferrer"
        title="repository github"
        class="flex mr-2"
      >
        <uil-github class="w-8 h-8 cursor-pointer text-base-700 dark:text-base-200 hover:text-gray-900 dark:hover:text-base-50" />
      </a>
      <a
        href="https://twitter.com/manurua"
        target="_blank"
        rel="noreferrer"
        title="twitter account"
        class="flex mx-2"
      >
        <uil-twitter class="w-8 h-8 cursor-pointer text-base-700 dark:text-base-200 hover:text-gray-900 dark:hover:text-base-50" viewBox="1 0 22 22" />
      </a>
      <a
        href="https://www.instagram.com/manurua.dev/"
        target="_blank"
        rel="noreferrer"
        title="instagram account"
        class="flex mx-2"
      >
        <uil-instagram class="w-8 h-8 cursor-pointer text-base-700 dark:text-base-200 hover:text-gray-900 dark:hover:text-base-50" viewBox="0 0 22 22" />
      </a>
      <a
        href="https://www.linkedin.com/in/manuelrua/"
        target="_blank"
        rel="noreferrer"
        title="linkedin account"
        class="flex mx-2"
      >
        <uil-linkedin class="w-8 h-8 cursor-pointer text-base-700 dark:text-base-200 hover:text-gray-900 dark:hover:text-base-50" viewBox="0 0 22 22" />
      </a>
    </div>
    <h1 class="mt-9 mb-10vh leading-tight text-5xl <sm:text-4xl text-base-900 dark:text-base-50 font-normal max-w-4xl">
      <span class="font-bold underline underline-secondary-yellow-5 underline-2 underline-offset-4">Ingeniero</span> <span class="font-bold underline underline-secondary-yellow-5 underline-2 underline-offset-4">software</span> y <span class="font-bold underline underline-primary-blue-4 underline-2 underline-offset-4">creador</span> <span class="font-bold underline underline-primary-blue-4 underline-2 underline-offset-4">digital</span> en remoto desde <span class="font-bold underline underline-secondary-red-5 underline-2 underline-offset-4">Sevilla</span> 💃🏻
    </h1>
  </div>
  <div class="flex flex-col flex-wrap mb-2 mt-12 px-4 lg:px-0">
    <div class="flex justify-between mb-5">
      <h2 class="py-0.5 px-2 bg-gray-200 dark:bg-gray-500 rounded-lg text-2xl self-center font-bold text-base-900 dark:text-base-50">b-log</h2>
      <router-link
        to="/articles"
        class="mono shadow-md cursor-pointer text-right text-base my-auto py-2 px-5 bg-primary-blue-4 rounded-full text-base-50"
        >ver todos</router-link
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
        :date="`${new Date(data.meta.frontmatter.date).toLocaleDateString('es-ES', dateOptions)}`"
        :time="data.meta.frontmatter.time"
        :title="data.meta.frontmatter.name"
        :to="data.path"
        :to-tags="`/tags/${data.meta.frontmatter.tags}`"
      />
    </div>
  </div>
</template>
