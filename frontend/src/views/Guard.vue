<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin />

    <div v-if="isLogged" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">{{ $t('dashboard.success.heading') }}</h1>
      <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ this.userEmail }}</h2>
    </div>

    <button v-if="isLogged" class="self-center font-medium text-sm px-8 py-3 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none" @click="logout()">Logout</button>

    <div v-if="!isLogged" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">{{ $t('dashboard.failure.heading') }}</h1>
      <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ $t('dashboard.failure.subheading') }}</h2>
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
      console.log(localStorage.token);

      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
      }

      this.axios
        .get('/api/users/me')
        .then((payload) => {
          this.isLogged = true;
          this.userEmail = payload.data.email;
          console.log(payload);
        })
        .catch((err) => {
          this.isLogged = false;
          console.log(err);
        });
    },
  };
</script>
