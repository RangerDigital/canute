<template>
  <footer class="flex flex-row items-center justify-between p-5 lg:justify-end md:px-20 md:py-6">
    <!-- Language Toggler / Desktop Only -->
    <section class="lg:hidden">
      <button class="text-xs xl:text-sm text-gray-darker xl:hover:text-gray focus:outline-none" @click="toggleLanguage()">
        <svg class="xl:inline hidden  h-6 mx-0.5 align-middle text-gray-darker" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {{ $t('btn.locale') }}
      </button>
    </section>

    <a class="text-xs cursor-pointer xl:text-sm text-gray-darker xl:hover:text-gray" href="https://bednarski.dev">Canute OS © 2021</a>
  </footer>
</template>

<script>
  export default {
    name: 'HomeFooter',
    methods: {
      toggleLanguage() {
        if (this.$i18n.locale == 'pl') {
          this.$i18n.locale = 'en';
          localStorage.locale = 'en';
        } else {
          this.$i18n.locale = 'pl';
          localStorage.locale = 'pl';
        }
      },
    },
  };
</script>
