<template>
  <section>
    <footer class="mt-20 bg-black">
      <div class="container flex justify-between p-5 mx-auto">
        <button class="md:hidden text-sm text-center text-gray-200 sm:text-left focus:outline-none " @click="toggleLanguage()">
          <svg class="inline h-5 mx-0.5 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ $t('nav.language') }}
        </button>
        <p class="text-sm text-center text-gray-200 sm:text-left ">Jakub Bednarski © 2021</p>
      </div>
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'Footer',
    methods: {
      toggleLanguage() {
        if (this.$i18n.locale == 'pl') {
          this.$i18n.locale = 'en';
        } else {
          this.$i18n.locale = 'pl';
        }
      },
    },
  };
</script>
