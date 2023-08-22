import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { unheadVueComposablesImports } from '@unhead/vue'
import UnheadVite from '@unhead/addons/vite'
import Components from "unplugin-vue-components/vite"
import WindiCSS from "vite-plugin-windicss"
import Markdown from "unplugin-vue-markdown/vite"
import matter from "gray-matter"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import AutoImport from "unplugin-auto-import/vite"
import PurgeIcons from "vite-plugin-purge-icons"
import { VitePWA } from "vite-plugin-pwa"
import SVGLoader from 'vite-svg-loader'
import Prism from "markdown-it-prism"
import Anchor from "markdown-it-anchor"
// @ts-expect-error
import Toc from "markdown-it-table-of-contents"
// @ts-expect-error
import LinkAttrs from "markdown-it-link-attributes"
// @ts-expect-error
import ItAttrs from "markdown-it-attrs"
// @ts-expect-error
import LazyLoading from "markdown-it-image-lazy-loading"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  define: {
    "process.env": process.env,
  },
  plugins: [
    UnheadVite(),
    SVGLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    VueRouter({
      routesFolder: [
        {
          src: "src/pages",
        },
        {
          src: "posts",
          path: "posts/",
          extensions: ['.md']
        },
      ],
      extensions: [".vue", ".md"],
      extendRoute(route) {
        const path = resolve(__dirname, route.fullPath.slice(1))
        if (route.name.startsWith('/posts/')) {
          const { data } = matter.read(path + '.md')
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
      },
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Markdown({
      headEnabled: 'unhead',
      wrapperComponent: "Post",
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
      },
      wrapperClasses: "article-body mb-5",
      markdownItSetup(md) {
        md.use(Prism),
          md.use(ItAttrs),
          md.use(Anchor, {
            permalink: Anchor.permalink.linkInsideHeader({
              placement: "before",
              symbol: "#",
              ariaHidden: true,
            }),
          }),
          md.use(LinkAttrs, {
            pattern: /^https?:/,
            attrs: {
              target: "_blank",
              rel: "noopener",
            },
          }),
          md.use(Toc),
          md.use(LazyLoading)
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          prefix: "",
        }),
      ],
      dts: true,
    }),
    // https://github.com/antfu/unplugin-icons
    Icons({
      compiler: "vue3",
    }),

    // https://github.com/windicss/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      includeAssets: ["/favicon-dark/favicon.ico", "robots.txt"],
      manifest: {
        // You can change this name into your own
        name: "Manu Rúa | Ingeniero Software",
        short_name: "Manu Rúa",
        description: "Blog y web personal de Manu Rúa",
        theme_color: "#347f76",
        icons: [
          {
            src: "/favicon-dark/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon-dark/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon-dark/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "@vueuse/core", unheadVueComposablesImports, VueRouterAutoImports],
      dts: true,
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"]
  }
})
