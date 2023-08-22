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
  <header class="flex flex-col md:flex-row items-start justify-between pb-8 md:pb-12 lg:pb-16 2xl:pb-24">
    <!-- <LinkPreview url="https://github.com/ManuRua/deno-intro" /> -->
    <div class="w-full sm:w-3/4 md:w-2/3 xl:w-1/2 pt-8 md:pt-12 lg:pt-16 pb-8 md:pb-0">
      <div class="flex">
        <picture class="mr-4">
          <img src="/src/assets/icons/wave.gif" alt="👋" width="32" height="32">
        </picture>
        <h3 class="text-2xl text-base-700 dark:text-base-50 font-bold uppercase tracking-widest opacity-50">
          hey! soy Manu Rúa
        </h3>
      </div>
      <SocialLinks />
      <h1 class="heading-main !leading-tight">
        <div class="inline-block"><span class="underlined before:bg-extra-2 before:animate-ease-in-out">Ingeniero</span> <span class="underlined before:animate-ease-in-out before:bg-extra-2">software</span></div> y <div class="inline-block"><span class="underlined before:bg-extra-1 before:animate-ease-in-out before:animate-delay-400">creador</span> <span class="underlined before:bg-extra-1 before:animate-ease-in-out before:animate-delay-400">digital</span></div> en remoto desde <div class="inline"><span class="underlined before:bg-extra-3 before:animate-delay-1500 before:animate-ease-in-out">Sevilla</span></div>
      </h1>
    </div>
    <div class="w-full flex flex-col items-end md:items-start md:w-5/12 md:pb-1 2xl:pb-2">
      <div class="relative">
        <!-- <img src="/public/profile_square.jpg" class="profile w-1/2 h-auto" decoding="async" data-nimg="1" /> -->
      </div>
    </div>
  </header>
  <!-- <div class="section mt-32">
    <SectionTitle title="skills" class="mb-16" />
    <Techies />
  </div> -->
  <div class="section mt-32 mb-16">
    <div class="flex justify-between mb-16">
      <SectionTitle title="b-log" />
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

<style lang="scss">
  .section {
    @apply flex flex-col px-4 lg:px-0;
  }

  .profile {
    border-radius: 70% 48% 70% 41%/70% 60% 50% 50%;
    // max-height: calc(100vh - 12rem);
    // @apply bg-gradient-to-r from-extra-1 via-extra-3 to-extra-2 p-1
  }

  .heading-main {
    @apply animate-fade-in animate-duration-1000;
    @apply mt-20 sm:mt-15;
    @apply font-normal text-4xl sm:text-5xl lg:text-6xl 2xl:text-7xl;
    @apply text-base-900 dark:text-base-50;
  }

  .underlined {
    @apply relative no-underline font-bold inline-block;
  }

  .underlined::before {
    @apply absolute content-DEFAULT h-1 bottom-2px <sm:bottom-0 -z-1;
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
