<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <Navigation class="p-6" />

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import Navigation from '@/components/app/Navigation.vue';

  export default {
    name: 'MobileNavigation',
    components: {
      HomeNavigation,
      HomeFooter,
      Navigation,
    },
  };
</script>
