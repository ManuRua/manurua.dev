<script setup lang="ts">
// In this section, we use @vueuse/head. Check this for more detail
// https://github.com/vueuse/head
useHead({
  title: "Manu Rúa | Desarrollo Backend con Golang, Web3, Gestión con Notion",
  meta: [
    {
      name: "title",
      content: "Manu Rúa | Desarrollo Backend con Golang, Web3, Gestión con Notion",
    },
    {
      name: "description",
      content: "Ingeniero software y creador digital en remoto desde Sevilla 💃🏻\nHablo sobre tecnologías Backend, Web3, Notion... y lo que se me vaya ocurriendo.",
    },
    {
      name: "theme-color",
      content: "#313745",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      charset: "UTF-8",
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:locale",
      content: "es_ES"
    },
    {
      property: "og:url",
      content: "https://manurua.dev/"
    },
    {
      property: "og:site_name",
      content: "Manu Rúa"
    },
    {
      property: "og:title",
      content: "Manu Rúa | Desarrollo Backend con Golang, Web3, Gestión con Notion"
    },
    {
      property: "og:description",
      content: "Ingeniero software y creador digital en remoto desde Sevilla 💃🏻\nHablo sobre tecnologías Backend, Web3, Notion... y lo que se me vaya ocurriendo."
    },
    {
      property: "og:image",
      content: "https://manurua.netlify.app/metaimage.png"
    },
    {
      property: "og:image:secure_url",
      content: "https://manurua.netlify.app/metaimage.png"
    },
    {
      property: "og:image",
      content: "https://manurua.netlify.app/metaimage.png"
    },
    {
      property: "og:image:type",
      content: "image/png"
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:url",
      content: "https://manurua.dev/"
    },
    {
      name: "twitter:title",
      content: "Manu Rúa | Desarrollo Backend con Golang, Web3, Gestión con Notion"
    },
    {
      name: "twitter:description",
      content: "Ingeniero software y creador digital en remoto desde Sevilla 💃🏻\nHablo sobre tecnologías Backend, Web3, Notion... y lo que se me vaya ocurriendo."
    },
    {
      name: "twitter:image",
      content: "https://manurua.netlify.app/metaimage.png"
    },
    {
      name: "twitter:creator",
      content: "@manurua"
    },
    {
      name: "twitter:site",
      content: "@manurua"
    },
  ],
})
</script>

<template>
  <div class="min-h-100vh overflow-hidden block relative pb-30 mx-auto flex flex-col">
    <Navbar />
    <main class="mx-auto mt-4 min-h-prose w-full lg:max-w-screen-lg">
      <router-view :key="$route.path" />
      <ToTopBtn />
    </main>
    <Footer />
  </div>
</template>
