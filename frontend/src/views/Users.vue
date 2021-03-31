<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-between xl:px-6 xl:py-6">
      <AppNavigation />

      <!-- Vertical Container -->
      <div class="w-full p-3 xl:p-12 xl:mx-20 flex flex-col justify-start">
        <div>
          <input
            v-model="search"
            placeholder="Search"
            class="w-full xl:w-96 xl:mx-12 block border-transparent focus:outline-none bg-gray-dark font-base tracking-wide px-3 py-3 text-gray rounded-md placeholder-gray ring-red focus:ring-1 "
          />
          <div class="xl:block bg-gray-dark my-5 h-px w-full rounded-full"></div>
        </div>
        <div class="justify-items-center grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
          <User class="max-w-sm xl:mx-4" v-for="item in users" :key="item._id" v-bind:user="item" />
        </div>
      </div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import User from '@/components/app/User.vue';

  export default {
    name: 'Users',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      User,
    },
    data() {
      return {
        users: [],
        organisation: null,
      };
    },
    methods: {
      getUsers() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/users')
          .then((payload) => {
            this.users = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      } else {
        this.organisation = localStorage.organisation;
      }

      this.getUsers();
    },
  };
</script>
