<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav showBackHamburger />

    <AppNavigation class="w-full self-center max-w-md" />

    <Navigation class="p-5 w-full self-center max-w-md" />

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import AppNavigation from '@/components/AppNavigation.vue';
  import Navigation from '@/components/app/Navigation.vue';

  export default {
    name: 'MobileNavigation',
    components: {
      HomeNavigation,
      HomeFooter,
      Navigation,
      AppNavigation,
    },
  };
</script>
