import { ViteSSG } from "vite-ssg"
import App from "./App.vue"
import "virtual:windi.css"
import { routes } from 'vue-router/auto/routes'
import { RouterScrollBehavior } from "vue-router/auto"
import "~/assets/styles/style.scss"
import "@purge-icons/generated"

// https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition
  else return { top: 0, behavior: "smooth" }
}

// https://github.com/antfu/vite-ssg
console.log(routes);
export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  Object.values(import.meta.glob("./module/*.ts", { eager: true })).map((i: any) => i.install?.(ctx))
})
