<template>
  <header>
    <div class="flex flex-row items-center justify-between p-4 md:p-5 border-b">
      <img src="../assets/LogoFull.svg" class="h-10 mx-2 md:h-11 md:mx-8 cursor-pointer" @click="$router.push('/').catch((err) => {})" />

      <router-link class="md:hidden mr-1 border p-1 rounded-lg" to="/auth">
        <svg class="h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </router-link>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Navigation',
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
