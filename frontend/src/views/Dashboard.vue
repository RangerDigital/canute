<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav v-bind:loggedAs="userEmail" />

    <!-- Horizontal Main Container -->
    <div class="flex flex-row justify-between md:px-20 md:py-6">
      <!-- Left Bar-->
      <nav class="flex flex-col">
        <!-- Organisation -->
        <div class="my-12 flex flex-row">
          <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

          <div class="flex flex-col justify-around">
            <h2 class="py-2 font-sans font-semibold text-white text-xl">Hello! <span class="text-red">Sun Park</span></h2>
            <p class="my-2 text-sm font-medium text-gray">Rosłońskiego, Przemyśl</p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="my-12 flex flex-row">
          <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

          <div class="flex flex-col justify-around">
            <div class="my-12 flex flex-col justify-around">
              <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Things</router-link>
              <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Dashboard</router-link>
            </div>
            <div class="my-12 flex flex-col justify-around">
              <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Profile</router-link>
              <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Settings</router-link>
              <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Organisations</router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'Dashboard',
    components: {
      HomeNavigation,
      HomeFooter,
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
      console.log(localStorage.organisation);

      if (localStorage.organisation) {
        this.userOrganisation = localStorage.organisation;
      } else {
        this.$router.push('/orgs');
      }

      this.getUser();
    },
  };
</script>
