<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin />

    <div v-if="isLogged" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Success 🎉 Logged in as</h1>
      <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ this.userEmail }}</h2>
    </div>

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
    mouted() {
      this.axios
        .get('/api/me')
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
