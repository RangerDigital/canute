<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation noLogin />

    <div v-if="isLogged" class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('dashboard.success.heading') }}</h1>
      <h2 class="my-1 text-2xl font-semibold md:my-5 text-red md:text-4xl 2xl:text-5xl ">{{ this.userEmail }}</h2>
    </div>

    <button v-if="isLogged" class="self-center px-8 py-3 text-sm font-medium text-white rounded-md bg-red hover:bg-red-dark focus:outline-none" @click="logout()">{{
      $t('nav.settings')
    }}</button>

    <div v-if="!isLogged" class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('dashboard.failure.heading') }}</h1>
      <h2 class="my-1 text-2xl font-semibold md:my-5 text-red md:text-4xl 2xl:text-5xl ">{{ $t('dashboard.failure.subheading') }}</h2>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'Guard',
    components: {
      HomeNavigation,
      HomeFooter,
    },
    data() {
      return {
        isLogged: true,
        userEmail: '',
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('organisation');
        localStorage.removeItem('email');

        this.$router.push('/');
      },
    },
    created() {
      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
      }

      this.axios
        .get('/api/users/me')
        .then((payload) => {
          this.isLogged = true;
          this.userEmail = payload.data.email;
        })
        .catch(() => {
          this.isLogged = false;
        });
    },
  };
</script>
