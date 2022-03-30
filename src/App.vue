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
      property: "og:url",
      content: "https://manurua.dev/"
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
      content: "https://manurua.dev/metaimage.svg"
    },
    {
      property: "twitter:card",
      content: "summary_large_image"
    },
    {
      property: "twitter:url",
      content: "https://manurua.dev/"
    },
    {
      property: "twitter:title",
      content: "Manu Rúa | Desarrollo Backend con Golang, Web3, Gestión con Notion"
    },
    {
      property: "twitter:description",
      content: "Ingeniero software y creador digital en remoto desde Sevilla 💃🏻\nHablo sobre tecnologías Backend, Web3, Notion... y lo que se me vaya ocurriendo."
    },
    {
      property: "twitter:image:src",
      content: "https://manurua.dev/metaimage.svg"
    },
    {
      property: "twitter:image",
      content: "<a href='https://manurua.dev/metaimage.svg'>https://manurua.dev/metaimage.svg</a>"
    },
    {
      property: "twitter:creator",
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
