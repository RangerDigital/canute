<template>
  <section class="h-screen flex flex-col justify-between">
    <HomeNavigation />

    <Footer />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'Home',
    components: {
      HomeNavigation,
      Footer,
    },
  };
</script>
