<script setup lang="ts">
import { isDark, toggleDark, slug } from "~/utils"
import type { NavbarMenu } from "~/types"
import LogoSVG from "/public/logo.svg?component";

// https://vueuse.org/shared/useToggle/
const [search, setSearch] = useToggle()
const [open, setOpen] = useToggle()

// https://vueuse.org/core/onKeyStroke/
onKeyStroke("Escape", () => {
  search.value = false
})
onKeyStroke("Escape", () => {
  open.value = false
})

// https://vueuse.org/core/onClickOutside/
const modalSearch = ref(null)
onClickOutside(modalSearch, (e) => {
  search.value = false
})

const navbottom = ref(null)
onClickOutside(navbottom, (e) => {
  open.value = false
})

// Search article
const searchArticle = ref("")
const router = useRouter()
const goSearch = () => {
  if (searchArticle.value) {
    router.push(`/search/${slug(searchArticle.value)}`).then(() => {
      search.value = false
      searchArticle.value = ""
    })
  }
}

// Hide navbottom after page has been changed
router.afterEach(() => {
  open.value = false
})

// Navbar list
const dataNavbar: NavbarMenu[] = [
  {
    name: "inicio",
    to: "/",
  },
  {
    name: "b-log",
    to: "/articles",
  },
  // {
  //   name: "sobre mí",
  //   to: "/about",
  // },
]
</script>

<template>
  <nav
    class="z-10 text-base-700 dark:text-base-400 relative h-20 px-4 animate-fade-in-down animate-duration-1000"
    role="navigation"
    aria-label="navbar"
  >
    <div class="max-w-screen-lg mx-auto h-full flex flex-row items-center space-x-4">
      <div class="logo flex-1">
        <router-link to="/" class="font-bold lg:tracking-wide text-2xl">
          <LogoSVG class="w-16 fill-dark dark:fill-base-50" loading="lazy"/>
        </router-link>
      </div>
      <div class="flex flex-wrap items-center justify-center">
        <router-link
          v-for="(data, i) in dataNavbar"
          :key="i"
          class="mono mr-5 py-0.5 px-2 rounded-lg text-base-700 dark:text-base-200 dark:hover:text-base-50 hover:text-gray-900 hidden lg:block"
          :to="data.to"
          active-class="bg-gray-200 dark:bg-gray-500 dark:text-base-200"
          >{{ data.name }}</router-link
        >
        <carbon-sun
          v-if="isDark"
          class="mr-5 cursor-pointer text-base-700 dark:text-base-200"
          tabindex="0"
          @click="toggleDark"
          title="Toggle light mode"
        />
        <carbon-moon
          v-else
          class="mr-5 cursor-pointer text-base-700 dark:text-base-200"
          tabindex="0"
          @click="toggleDark"
          title="Toggle dark mode"
        />
        <carbon-search
          class="cursor-pointer text-base-700 dark:text-base-200"
          tabindex="0"
          @click="setSearch"
          title="Search articles.."
        />
        <carbon-menu
          class="cursor-pointer text-base-700 dark:text-base-200 ml-5 sm:block lg:hidden"
          tabindex="0"
          @click="setOpen"
        />
      </div>
    </div>
  </nav>

  <!-- Nav bottom -->
  <nav
    v-if="open"
    ref="navbottom"
    class="py-4 px-8 bg-base-100 dark:bg-base-600 fixed bottom-0 z-99 inset-x-0 rounded-t-lg shadow-lg overflow-x-hidden overflow-y-hidden lg:hidden"
    :class="open ? 'block translate-y-0' : 'hidden translate-y-full'"
  >
    <ul class="flex flex-col">
      <router-link to="/" class="bg-base-50 dark:bg-base-500 p-2 mb-2 rounded-md">
        <li class="flex flex-row flex-wrap items-center dark:text-base-100">
          <carbon-home class="mr-2" />inicio
        </li>
      </router-link>
      <router-link
        to="/articles"
        class="bg-base-50 dark:bg-base-500 p-2 mb-2 rounded-md"
      >
        <li class="flex flex-row flex-wrap items-center dark:text-base-100">
          <carbon-table-of-contents class="mr-2" />b-log
        </li>
      </router-link>
      <!-- <router-link to="/about" class="bg-base-50 dark:bg-base-500 p-2 mb-2 rounded-md">
        <li class="flex flex-row flex-wrap items-center dark:text-base-100">
          <uil-document-layout-center class="mr-2" />sobre mí
        </li>
      </router-link> -->
    </ul>
  </nav>
  <!-- Search -->
  <div
    v-if="search"
    class="fixed overflow-x-hidden overflow-y-hidden inset-8 flex justify-content items-center z-50"
  >
    <div ref="modalSearch" class="relative mx-auto w-auto max-w-2xl">
      <carbon-search
        class="absolute right-8 top-4 text-xl text-gray-400 cursor-pointer"
        @click="goSearch"
      />
      <input
        ref="search"
        v-model="searchArticle"
        type="text"
        class="bg-white shadow rounded border-0 w-lg h-14 py-5 px-5 focus:outline-none"
        placeholder="Buscar posts aquí..."
        @keydown.enter="goSearch"
      />
    </div>
  </div>
  <div
    v-if="search || open"
    class="fixed inset-0 z-40 opacity-60 bg-dark-200"
    :class="open ? 'lg:hidden' : ''"
  />
</template>

<style lang="scss">
.active-class {
  @apply p-2 mb-2 rounded-md bg-base-200 dark:bg-base-700;
}
</style>
