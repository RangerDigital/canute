<template>
  <section class="h-screen flex flex-col justify-between">
    <Navigation />

    <section class="text-gray-700 body-font">
      <div class="container flex flex-col items-center px-5 py-16 mx-auto my-30  lg:px-20 lg:py-24 md:flex-row">
        <div class="flex flex-col items-center w-full pt-0 mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0 lg:text-center">
          <h1 class="my-8 text-2xl font-bold tracking-tighter text-center text-black lg:text-left lg:text-5xl title-font">
            {{ $t('home.heading') }}
          </h1>

          <p class="mb-8 text-base leading-relaxed text-center text-gray-700 lg:text-left lg:text-1xl">
            {{ $t('home.subheading') }}
          </p>

          <div class="flex justify-center flex-wrap">
            <input
              class="flex-grow w-full px-4 md:w-72 py-2 mb-4 md:mr-4 text-base text-black transition duration-1000 ease-in-out transform rounded-lg bg-gray-100 focus:outline-none focus:border-purple-500 sm:mb-0 focus:bg-white focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
              v-bind:placeholder="$t('home.email.placeholder')"
              v-bind="email"
              type="email"
            />
            <button
              class="flex items-center px-6 py-2 mt-2 md:mt-auto font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-gray-900 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2"
              @click="sendEmail()"
            >
              {{ $t('home.email.action') }}
            </button>
          </div>

          <p class="w-full mt-2 mb-8 text-sm text-center md:text-left text-gray-600">
            {{ $t('home.email.sublabel') }}
          </p>
        </div>
        <div class="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <img class="object-cover object-center rounded-lg " alt="hero" src="https://dummyimage.com/720x600/F3F4F7/8693ac" />
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
    name: 'Home',
    components: {
      Navigation,
      Footer,
    },
    data() {
      return { email: '' };
    },
    methods: {
      sendEmail() {
        this.axios.post('/api/auth/magic', { email: this.email });
      },
    },
  };
</script>
