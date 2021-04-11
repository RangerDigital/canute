<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <slot></slot>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';
  import AppNavigation from '@/components/AppNavigation.vue';

  export default {
    name: 'HorizontalLayout',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
    },
  };
</script>
