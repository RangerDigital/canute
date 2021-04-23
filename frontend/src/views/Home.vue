<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation />

    <section class="flex flex-col items-center justify-between p-5 md:px-12 xl:w-11/12 2xl:w-9/12 xl:flex-row xl:self-center">
      <div>
        <h1 class="my-1 text-2xl font-semibold text-white font-heading md:my-5 md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold font-heading md:my-5 text-primary md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 xl:text-base text-gray">{{ $t('home.about') }}</p>

        <!-- Call to Action -->
        <div class="flex flex-row items-center justify-center mt-16 mb-8 md:justify-start">
          <Button solid @click="callToAction()">{{ $t('home.action') }}</Button>

          <!-- <button class="hidden py-3 ml-6 text-sm md:block px-7 text-gray focus:outline-none hover:text-gray-light" @click="$router.push('/learn')">{{ $t('btn.learn') }} </button> -->
        </div>
      </div>

      <img class="my-10 transform -translate-x-5 w-100 xl:translate-x-0 xl:scale-125 xl:w-3/6" src="@/assets/images/hero.png" />
    </section>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import Button from '@/components/inputs/Button.vue';

  export default {
    name: 'Home',
    components: {
      HomeNavigation,
      HomeFooter,
      Button,
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
