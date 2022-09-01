import { defineConfig } from "vite-plugin-windicss"
import plugin from "windicss/plugin"

export default defineConfig({
  extract: {
    include: ["index.html", "src/**/*.{vue, ts, md}"],
  },
  darkMode: "class",
  theme: {
    minHeight: {
      prose: "40ch",
    },
    extend: {
      colors: {
        base: {
          "50": "#f6f7f9",
          "100": "#edeff2",
          "200": "#e1e4ea",
          "300": "#c3c9d5",
          "400": "#a5adc0",
          "500": "#828da6",
          "600": "#63708c",
          "700": "#4e586e",
          "800": "#3f475a",
          "900": "#313745",
        },
        "primary-blue": {
          1: "#CAF3F9",
          2: "#93E0EB",
          3: "#66CBD9",
          4: "#42B3C2",
          5: "#2396A6",
        },
        "secondary-yellow": {
          1: "#FFEFCE",
          2: "#FFE09D",
          3: "#FFD375",
          4: "#FFC953",
          5: "#FFBE33",
        },
        "secondary-red": {
          1: "#FFD2CE",
          2: "#FFA49D",
          3: "#FF7F75",
          4: "#FF6053",
          5: "#FF4133",
        },
      },
      animation: {
        "fade-swing": "fadeInLeft 500ms ease 2000ms, swing 500ms ease-in 2300ms",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: {
          // @ts-expect-error
          fontSize: theme("fontSize.2xl"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
        h2: {
          // @ts-expect-error
          fontSize: theme("fontSize.xl"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
        h3: {
          // @ts-expect-error
          fontSize: theme("fontSize.lg"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
        h4: {
          // @ts-expect-error
          fontSize: theme("fontSize.lg"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
        h5: {
          // @ts-expect-error
          fontSize: theme("fontSize.lg"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
        h6: {
          // @ts-expect-error
          fontSize: theme("fontSize.lg"),
          // @ts-expect-error
          fontWeight: theme("fontWeight.bold"),
        },
      })
    }),
  ],
})
