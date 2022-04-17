export const setCanonical = (): void => {
  const router = useRoute()
  const routes = router.fullPath
  let url: string = ""
  if (typeof window !== "undefined") {
    url = window.location.origin + routes
  }

  useHead({
    link: [
      {
        rel: "canonical",
        href: url,
      }
    ]
  })
}
