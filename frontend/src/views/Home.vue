<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation />

    <section class="p-5 md:px-12 xl:w-11/12 2xl:w-9/12 flex flex-col xl:flex-row xl:self-center items-center justify-between">
      <div>
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.heading') }}</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.subheading') }}</h2>

        <p class="my-5 md:my-8 text-sm xl:text-base text-gray">{{ $t('home.about') }}</p>

        <!-- Call to Action -->
        <div class="mt-16 mb-8 flex flex-row items-center justify-center md:justify-start">
          <button class="font-medium text-sm px-8 py-3 text-white bg-red hover:bg-red-dark rounded focus:outline-none" @click="callToAction()">{{ $t('home.action') }}</button>

          <button class="hidden md:block ml-6 font-medium text-sm px-7 py-3 text-gray focus:outline-none hover:text-gray-light" @click="$router.push('/learn')"
            >{{ $t('btn.learn') }}
          </button>
        </div>
      </div>

      <img class="w-100 my-10 transform -translate-x-5 xl:translate-x-0 xl:scale-125 xl:w-3/6" src="@/assets/images/hero.png" />
    </section>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'Home',
    components: {
      HomeNavigation,
      HomeFooter,
    },
    methods: {
      callToAction() {
        if (localStorage.token) {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/auth');
        }
      },
    },
  };
</script>
