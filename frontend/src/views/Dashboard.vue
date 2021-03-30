<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="flex flex-col xl:flex-row justify-between xl:px-6 xl:py-6">
      <AppNavigation />
      <ThingsList class="self-start" />

      <div class="w-60"></div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import ThingsList from '@/components/app/ThingsList.vue';

  export default {
    name: 'Dashboard',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      ThingsList,
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      }
    },
  };
</script>
