import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Components from "unplugin-vue-components/vite"
import WindiCSS from "vite-plugin-windicss"
import Markdown from "vite-plugin-md"
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
import { readFileSync } from "fs"

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
    SVGLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      headEnabled: true,
      wrapperComponent: "post",
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
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: "#",
            permalinkAttrs: () => ({ "aria-hidden": true }),
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

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
        {
          dir: "posts",
          baseRoute: "posts",
        },
      ],
      extensions: ["vue", "md"],
      extendRoute(route) {
        // Get inspired from anthony fu"s personal website
        // https://github.com/antfu/antfu.me
        const path = resolve(__dirname, route.component.slice(1))
        const md = readFileSync(path, "utf-8")
        const { data } = matter(md)
        if (path.split(".").pop() == "md") {
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
        }
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
      imports: ["vue", "@vueuse/core", "@vueuse/head", "vue-router"],
      dts: true,
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
  },
})
