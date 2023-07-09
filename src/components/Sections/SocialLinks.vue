<template>
  <div class="mt-4 <sm:mt-2 flex social-links animate-fade-in animate-duration-1000">
    <a
      href="https://github.com/ManuRua"
      target="_blank"
      rel="noreferrer"
      title="repository github"
      class="flex mr-2"
    >
      <uil-github />
    </a>
    <a
      href="https://twitter.com/manurua"
      target="_blank"
      rel="noreferrer"
      title="twitter account"
      class="flex mx-2"
    >
      <uil-twitter viewBox="1 0 22 22" />
    </a>
    <a
      href="https://www.instagram.com/manurua.dev/"
      target="_blank"
      rel="noreferrer"
      title="instagram account"
      class="flex mx-2"
    >
      <uil-instagram viewBox="0 0 22 22" />
    </a>
    <a
      href="https://www.linkedin.com/in/manuelrua/"
      target="_blank"
      rel="noreferrer"
      title="linkedin account"
      class="flex mx-2"
    >
      <uil-linkedin viewBox="0 0 22 22" />
    </a>
  </div>
</template>

<style lang="scss">
.social-links > a > svg {
  @apply w-10 h-10 <sm:w-8 <sm:h-8 cursor-pointer text-base-700 dark:text-base-200 hover:text-gray-900 dark:hover:text-base-50;
}
</style>
