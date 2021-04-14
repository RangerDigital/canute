<template>
  <section class="flex flex-col justify-between min-h-screen">
    <div class="flex flex-col justify-start h-full">
      <HomeNavigation noLogin noNav showBackHamburger />

      <AppNavigation class="self-center w-full max-w-md" />

      <Navigation class="self-center w-full max-w-md p-5" />
    </div>

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
