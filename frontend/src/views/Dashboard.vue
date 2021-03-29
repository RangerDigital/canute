<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin />

    <div v-if="isLogged" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Success 🎉 Logged in as</h1>
      <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ this.userEmail }}</h2>
    </div>

    <button
      v-if="isLogged"
      class="self-center max-w-lg font-semibold mx-5 my-6 lg:my-0 px-12 py-3 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none"
      @click="logout()"
      >Logout</button
    >

    <div v-if="!isLogged" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Sorry 🔥 Not logged in!</h1>
      <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">Check console log.</h2>
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
        isLogged: false,
        userEmail: '',
      };
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$route.push('/');
      },
    },
    mounted() {
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
