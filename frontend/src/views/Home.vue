<template>
  <section class="h-screen flex flex-col justify-between">
    <HomeNavigation />

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'Home',
    components: {
      HomeNavigation,
      HomeFooter,
    },
  };
</script>
