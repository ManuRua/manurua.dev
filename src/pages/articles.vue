<script setup lang="ts">
import { getArticles, paginateData } from "~/data"
import { slug, limitString } from "~/utils"

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }

// Get articles data
const currentPage = ref<number>(1)
const articles = computed(() => {
  const articles = getArticles()
  const paginate = paginateData({
    articles: articles,
    currentPage: currentPage.value,
    pageSize: 3,
  })

  return paginate
})

// Pagination
const clickStartPage = () => {
  currentPage.value = articles.value.startPage
}
const clickPaginate = (paginate: number) => {
  console.log(paginate)
  currentPage.value = paginate
}
const clickEndPage = () => {
  currentPage.value = articles.value.endPage
}
</script>

<template>
  <div class="flex flex-col flex-wrap mb-2 px-4 lg:px-0">
    <h1 class="text-base-700 dark:text-base-400 font-bold">Últimos Artículos</h1>
    <h3 class="mt-1 text-base-700 dark:text-base-400">
      Total: {{ getArticles().length }}
    </h3>
    <div class="grid inline-grid gap-4 py-6 mb-2 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
      <Article
        v-for="(data, i) in articles.listArticles"
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
    <div class="flex flex-wrap justify-center items-center mb-5">
      <Paginate
        :start-page="articles.startPage"
        :end-page="articles.endPage"
        :mid="articles.mid"
        :current-page="currentPage"
        :click-start-page="clickStartPage"
        :click-paginate="clickPaginate"
        :click-end-page="clickEndPage"
      />
    </div>
  </div>
</template>
