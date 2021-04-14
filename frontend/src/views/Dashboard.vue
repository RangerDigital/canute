<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="flex flex-col self-center justify-start flex-grow w-full h-full xl:self-auto md:max-w-md xl:max-w-full xl:flex-row xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation />

      <!-- Locks List -->
      <div class="self-center w-full p-5 xl:self-auto md:max-w-md">
        <p class="my-2 text-sm text-gray-dark ">{{ $t('label.locks') }}</p>
        <div class="h-px rounded-full bg-gray-darker"></div>

        <div class="flex flex-col xl:justify-center">
          <Lock v-for="item in locks" :key="item._id" v-bind:lock="item" />
        </div>
      </div>

      <!-- Counterweight -->
      <div class="w-60"></div>
    </div>

    <HomeFooter class="hidden xl:flex" />
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
        locks: [],
        organisation: null,
      };
    },
    methods: {
      getLocks() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/locks')
          .then((payload) => {
            this.locks = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations/autoSelect');
      } else {
        this.organisation = localStorage.organisation;
      }

      this.getLocks();
    },
  };
</script>
