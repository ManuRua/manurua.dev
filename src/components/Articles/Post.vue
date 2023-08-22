<script setup lang="ts">
import { isClient } from "@vueuse/core"
import { getRelatedArticles } from "~/data"
import { slug, limitString, setCanonical } from "~/utils"
import type { DataShare } from "~/types"

const { frontmatter } = defineProps<{ frontmatter: any }>()
const dateOptions = { year: "numeric", month: "long", day: "numeric" }

const router = useRoute()
const routes = router.fullPath
let url: string = ""
if (typeof window !== "undefined") {
  url = window.location.origin + routes
}

useHead({
  title: frontmatter.name,
  meta: [
    {
      name: "title",
      content: frontmatter.name,
    },
    {
      name: "description",
      content: frontmatter.description,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:article:published_time",
      content: frontmatter.date,
    },
    {
      property: "og:article:tag",
      content: frontmatter.tags,
    },
    {
      property: "og:url",
      content: url,
    },
    {
      property: "og:title",
      content: frontmatter.name,
    },
    {
      property: "og:image",
      content: "https://manurua.netlify.app" + frontmatter.thumbnail,
    },
    {
      property: "og:image:secure_url",
      content: "https://manurua.netlify.app" + frontmatter.thumbnail,
    },
    {
      property: "og:image",
      content: "https://manurua.netlify.app" + frontmatter.thumbnail,
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:url",
      content: url,
    },
    {
      name: "twitter:title",
      content: frontmatter.name,
    },
    {
      name: "twitter:image",
      content: "https://manurua.netlify.app" + frontmatter.thumbnail,
    },
    {
      name: "twitter:creator",
      content: "@manurua",
    },
    {
      name: "twitter:site",
      content: "@manurua",
    },
  ],
})

setCanonical()

const relatedArticles = computed(() => {
  return getRelatedArticles({
    limit: 4,
    tags: frontmatter.tags,
    name: frontmatter.name,
  })
})

const dataShare: DataShare[] = [
  {
    icon: "facebook",
    network: "facebook",
    name: "Facebook",
    url: url,
    title: frontmatter.name,
    hashtags: frontmatter.tags[0],
  },
  {
    icon: "twitter",
    network: "twitter",
    name: "Twitter",
    url: url,
    title: frontmatter.name,
    hashtags: frontmatter.tags[0],
    twitterUser: "@manurua",
  },
  {
    icon: "whatsapp",
    network: "whatsapp",
    name: "Whatsapp",
    url: url,
    title: frontmatter.name,
  },
  {
    icon: "telegram",
    network: "telegram",
    name: "Telegram",
    url: url,
    title: frontmatter.name,
  },
]

// /* 
//   Inspired by https://github.com/antfu/antfu.me/blob/HEAD/src/components/Post.vue
// */
if (isClient) {
  const navigate = () => {
    if (location.hash) {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEventListener(window, "hashchange", navigate, false)

  onMounted(() => {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault()
        const href = a.getAttribute("href")
        history.replaceState({}, "", href)
        navigate()
      })
    })

    navigate()
    setTimeout(navigate, 500)
  })
}
</script>

<template>
  <div class="py-5 px-4 lg:px-0">
    <h1
      class="pb-5 text-base-900 dark:text-base-50 text-left font-bold text-3xl md:block md:text-5xl whitespace-pre-wrap"
    >
      {{ frontmatter.name }}
    </h1>
    <div class="flex flex-row <sm:flex-col flex-wrap justify-left">
      <div class="flex">
        <carbon-calendar class="mr-1 mt-2px dark:text-base-50" />
        <p class="text-center text-dark-100 font-light mb-1 sm:mb-5 dark:text-base-50">
          {{ new Date(frontmatter.date).toLocaleDateString("es-ES", dateOptions) }}
        </p>
      </div>
      <p class="text-center text-dark-100 font-light mb-5 mx-4 dark:text-base-50 <sm:hidden">·</p>
      <div class="flex">
        <carbon-time class="mr-1 mt-2px dark:text-base-50" />
        <p class="text-center text-dark-100 font-light mb-5 dark:text-base-50">
          {{ frontmatter.time }} minutos de lectura
        </p>
      </div>
    </div>
    <Tag :tags="frontmatter.tags" class="mb-5 flex flex-row justify-left flex-wrap" />
    <figure>
      <img
        :src="frontmatter.thumbnail"
        :alt="`thumbnail-${frontmatter.name}`"
        class="w-full h-md object-cover object-top rounded-md shadow-lg"
        loading="lazy"
      />
      <figcaption class="text-xs text-center text-dark-100 font-light mt-1 dark:text-base-50">
        Fuente: <a :href="frontmatter.thbn_src">{{ frontmatter.thbn_src }}fsdf</a>
      </figcaption>
    </figure>
    <div
      class="mt-5 mb-5 text-base-500 divide-y dark:text-base-50"
      style="border-bottom: 1px solid #63c0b6"
    >
      <slot />
    </div>
    <h2 class="text-center text-3xl font-bold text-base-700 dark:text-base-400 mt-5 mb-4">
      Compártelo a tu gente
    </h2>
    <div class="flex flex-wrap justify-center items-center mb-5">
      <Share
        v-for="(share, i) in dataShare"
        :key="i"
        :icon="share.icon"
        :name="share.name"
        :network="share.network"
        :url="share.url"
        :title="share.title"
        :description="share.description"
        :quote="share.quote"
        :hashtags="share.hashtags"
        :twitter-user="share.twitterUser"
        :media="share.media"
      />
    </div>
    <div class="flex flex-wrap flex-col px-4 lg:px-0 mt-5">
      <h1 class="mb-5 mt-8 text-3xl text-base-700 dark:text-base-400 font-bold">
        Artículos Relacionados
      </h1>
      <div class="mx-auto grid inline-grid gap-4 mb-5 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
        <Article
          v-for="(data, i) in relatedArticles"
          :key="i"
          :image="data.meta.frontmatter.thumbnail"
          :alt="`blog-banner-${slug(data.meta.frontmatter.name)}`"
          :tags="data.meta.frontmatter.tags"
          :date="`${new Date(frontmatter.date).toLocaleDateString('es-ES', dateOptions)}`"
          :time="data.meta.frontmatter.time"
          :title="data.meta.frontmatter.name"
          :to="data.path"
          :description="limitString(data.meta.frontmatter.description, 200)"
          :to-tags="`/tags/${data.meta.frontmatter.tags}`"
        />
      </div>
    </div>
  </div>
</template>
