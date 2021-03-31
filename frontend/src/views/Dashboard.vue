<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-between xl:px-6 xl:py-6">
      <AppNavigation />

      <!-- Locks List -->
      <div class="self-center xl:self-auto w-full md:max-w-md p-5">
        <p class="my-2 text-sm text-gray-dark ">Locks</p>
        <div class="h-px bg-gray-dark rounded-full"></div>

        <div class="flex flex-col xl:justify-center">
          <Lock v-for="item in locks" :key="item._id" v-bind:lock="item" />
        </div>
      </div>

      <!-- Counterweight -->
      <div class="w-60"></div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import Lock from '@/components/app/Lock.vue';

  export default {
    name: 'Dashboard',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      Lock,
    },
    data() {
      return {
        locks: [{ name: 'West Gate' }, { name: 'Front Door' }],
      };
    },
    methods: {
      getLocks() {},
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      }

      this.getLocks();
    },
  };
</script>
