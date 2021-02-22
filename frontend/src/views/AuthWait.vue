<template>
  <section class="h-screen flex flex-col justify-between">
    <Navigation />

    <section class="text-gray-700 body-font md:mb-60 ">
      <div class="container px-8 mx-auto pt-36 lg:px-4">
        <div class="flex flex-col w-full mb-12 text-center">
          <h2 class="mb-1 text-xs font-semibold tracking-widest text-blue-600 uppercase title-font">SUCCESS</h2>
          <h1 class="my-8 text-2xl font-bold tracking-tighter text-center text-black lg:text-5xl title-font">
            An E-Mail with the instruction has been sent!
          </h1>
          <p class="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">Please check your inbox! You can close this tab! </p>
        </div>
      </div>
    </section>

    <Footer />
  </section>
</template>

<script>
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'Auth',
    components: {
      Navigation,
      Footer,
    },
    data() {
      return {
        email: '',
      };
    },

    methods: {
      sendEmail() {
        this.axios.post('/api/auth/magic', { email: this.email });
      },
    },
  };
</script>
