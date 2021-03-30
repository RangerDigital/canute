<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav v-bind:loggedAs="userEmail" />

    <!-- Horizontal Main Container -->
    <div class="flex flex-col xl:flex-row justify-between xl:px-6 xl:py-6">
      <AppNavigation v-bind:organisation="userOrganisation" />
      <ThingsList />

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
      return {
        userOrganisation: '',
        userEmail: '',
      };
    },
    methods: {
      getUser() {
        this.axios
          .get('/api/users/me')
          .then((payload) => {
            this.userEmail = payload.data.email;
          })
          .catch(() => {
            this.isLogged = false;
            this.$router.push('/guard');
          });
      },
    },
    mounted() {
      if (localStorage.organisation) {
        this.userOrganisation = localStorage.organisation;
      } else {
        this.$router.push('/organisations');
      }

      this.getUser();
    },
  };
</script>
