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
  <div class="section mt-9vh mb-5vh h-70vh">
    <h3 class="text-2xl text-base-700 dark:text-base-50 font-bold uppercase tracking-widest opacity-50">
      hey! soy Manu Rúa
    </h3>
    <!-- <LinkPreview url="https://github.com/ManuRua/deno-intro" /> -->
    <SocialLinks />
    <h1 class="animate-fade-in animate-duration-1000 mt-20 <sm:mt-15 leading-tight text-7xl <sm:text-4xl text-base-900 dark:text-base-50 font-normal max-w-4xl">
      <div class="inline-block"><span class="underlined before:bg-secondary-yellow-5 before:animate-ease-in-out">Ingeniero</span> <span class="underlined before:animate-ease-in-out before:bg-secondary-yellow-5">software</span></div> y <div class="inline-block"><span class="underlined before:bg-primary-blue-4 before:animate-ease-in-out before:animate-delay-400">creador</span> <span class="underlined before:bg-primary-blue-4 before:animate-ease-in-out before:animate-delay-400">digital</span></div> en remoto desde <div class="inline"><span class="underlined before:bg-secondary-red-5 before:animate-delay-1500 before:animate-ease-in-out">Sevilla</span></div>
    </h1>
  </div>
  <div class="section mb-2 mt-12">
    <SectionTitle title="skills" class="mb-5" />
    <Techies />
  </div>
  <div class="section mb-2 mt-12">
    <div class="flex justify-between mb-5">
      <SectionTitle title="b-log" />
      <!-- <router-link
        to="/articles"
        class="mono shadow-md cursor-pointer text-right text-base my-auto py-2 px-5 bg-primary-blue-4 rounded-full text-base-50"
        >></router-link
      > -->
    </div>
    <div
      class="mx-auto inline-grid gap-4 mb-5 sm:grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-10"
    >
      <Article
        v-for="(data, i) in articles"
        :key="i"
        :image="data.meta.frontmatter.thumbnail"
        :alt="`blog-banner-${slug(data.path)}`"
        :tags="data.meta.frontmatter.tags"
        :date="`${new Date(data.meta.frontmatter.date).toLocaleDateString('es-ES', dateOptions)}`"
        :time="data.meta.frontmatter.time"
        :title="data.meta.frontmatter.name"
        :to="data.path"
      />
    </div>
  </div>
</template>
<!--  -->

<style lang="scss">
  .section {
    @apply flex flex-col px-4 lg:px-0
  }

  .underlined {
    @apply relative no-underline font-bold inline-block;
  }

  .underlined::before {
    @apply absolute content-DEFAULT h-0.5 bottom-2px <sm:bottom-0 -z-1;
    animation-name: underlined;
    animation-duration: 900ms;
    animation-fill-mode: forwards;
    transform-origin: top right;
  }

  @keyframes underlined {
  from {
    transform: scaleX(0);
    width: 0;
  }

  to {
    transform: scaleX(1);
     width: 100%;
  }
}
</style>
