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
        <div class="inline-block">
          <span class="underlined before:bg-extra-2 before:animate-ease-in-out">Ingeniero</span> <span class="underlined before:animate-ease-in-out before:bg-extra-2">software</span>
        </div> y <div class="inline-block"><span class="underlined before:bg-extra-1 before:animate-ease-in-out before:animate-delay-400">creador</span> <span class="underlined before:bg-extra-1 before:animate-ease-in-out before:animate-delay-400">digital</span>
        </div> en remoto desde<br/>
        <div class="inline-block h-10 sm:h-12 lg:h-15 2xl:h-18">
          <span class="typewriter underlined"></span>
          <span class="loop inline-block h-full relative w-10 sm:w-12 lg:w-15 2xl:w-18 ml-4 sm:ml-8">
            <img src="/src/assets/icons/flamenca.gif" alt="💃🏻" >
            <img src="/src/assets/icons/sunrise.gif" alt="🌅" >
            <img src="/src/assets/icons/world.gif" alt="🌍" >
          </span>
          
        </div>
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
    @apply flex flex-col lg:px-0;
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

  @keyframes typing {
    0%, 38% { content: ""; }
    1.2%, 36.8% { content: "S"; }
    2.4%, 35.6% { content: "Se"; }
    3.6%, 34.4% { content: "Sev"; }
    4.8%, 33.2% { content: "Sevi"; }
    5%, 32% { content: "Sevil"; }
    6.2%, 30.8% { content: "Sevill"; }
    7.4%, 29.6% { content: "Sevilla"; }

    40%, 68% { content: ""; }
    41.2%, 66.8% { content: "B"; }
    42.4%, 65.6% { content: "Ba"; }
    43.6%, 64.4% { content: "Bal"; }
    44.8%, 63.2% { content: "Bali"; }

    70%, 99% { content: ""; }
    71.2%, 97.8% { content: "e"; }
    72.4%, 96.6% { content: "el"; }
    73.6%, 95.4% { content: "el M"; }
    74.8%, 94.2% { content: "el Mu"; }
    75%, 93% { content: "el Mun"; }
    76.2%, 91.8% { content: "el Mund"; }
    77.4%, 90.6% { content: "el Mundo"; }
  }

  .typewriter::before {
    @apply bg-extra-3 animate-delay-1500 animate-ease-in-out;
    content: "";
  }

  .typewriter::after {
    content: "";
    animation: typing 12s infinite;
  }

  @media (prefers-reduced-motion) {
    .typewriter::after {
      animation: none;
    }
    
    @keyframes sequencePopup {
      0%, 100% { content: "Sevilla"; }
      33% { content: "Bali"; }
      66% { content: "el Mundo"; }
    }

    .typewriter::before {
      content: "Sevilla";
      animation: sequencePopup 12s linear infinite;
      animation-delay: 1s;
    }
  }

  .loop {
   > img {
    @apply inline-block absolute opacity-0;
    @apply h-10 sm:h-12 lg:h-15 2xl:h-18;
    @apply top-2.5 lg:top-3.5 2xl:top-4;
    opacity: 0;
   }
  }

  @media (prefers-reduced-motion: no-preference) {
    .loop img {
      grid-area: 1/1;
      animation-name: appear1;
      animation-duration: 12s;
      animation-timing-function: ease;
      animation-delay: 0.9s;
      animation-iteration-count: infinite;
      animation-fill-mode: both;
    }
    
    .loop img:nth-child(2) {
      animation-name: appear2;
      animation-delay: 5.3s;
    }
    .loop img:nth-child(3) {
      animation-name: appear3;
      animation-delay: 9.3s;
    }
  }

  @keyframes appear1 {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    3%, 21% { opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
     }
    24% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes appear2 {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    3%, 18% { opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
     }
    21% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
  @keyframes appear3 {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    3%, 13% { opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
     }
    16% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
