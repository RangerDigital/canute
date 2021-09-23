<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation />

    <section class="flex flex-col items-center justify-between p-5 my-5 2xl:my-14 md:px-8 xl:w-11/12 2xl:w-9/12 xl:flex-row xl:self-center">
      <div>
        <div class="transform -translate-x-2 md:-translate-x-3 md:my-1 -rotate-3">
          <h2 class="my-5 text-1xl font-marker md:my-10 text-primary md:text-3xl 2xl:text-4xl 3xl:text-5xl">{{ $t('home.for.developers') }}</h2>
        </div>

        <h1 class="my-1 text-2xl font-semibold text-white font-heading md:my-5 md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold font-heading md:my-5 text-primary md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 xl:text-base text-gray">{{ $t('home.about') }}</p>

        <!-- Call to Action -->
        <div class="flex flex-row items-center justify-center mt-16 mb-8 md:justify-start">
          <Button solid @click="callToAction()">{{ $t('home.action') }}</Button>

          <Button ghost class="hidden md:block" @click="$router.push('/learn')">{{ $t('btn.learn') }}</Button>
        </div>
      </div>

      <img class="my-10 transform -translate-x-5 w-100 xl:translate-x-0 xl:scale-125 xl:w-3/6" src="@/assets/images/hero.png" />
    </section>

    <section class="hidden md:block">
      <div class="flex flex-col justify-center w-full my-7 md:flex-row md:my-16">
        <div
          id="anime-item"
          class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52 "
          @click="$router.push('/dashboard')"
        >
          <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>

          <p class="my-3 mt-2 text-sm text-white font-heading">{{ $t('nav.dashboard') }}</p>

          <p class="text-xs text-gray-dark">{{ $t('btn.goto') }} /dashboard</p>
        </div>

        <div
          id="anime-item"
          class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52 "
          @click="$router.push('/')"
        >
          <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>

          <p class="my-3 mt-2 text-sm text-white font-heading">{{ $t('btn.home') }}</p>

          <p class="text-xs text-gray-dark">{{ $t('btn.goto') }} /home</p>
        </div>

        <div
          id="anime-item"
          class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52"
          @click="$router.push('/auth')"
        >
          <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>

          <p class="my-3 mt-2 text-sm text-white font-heading">{{ $t('btn.auth') }}</p>

          <p class="text-xs text-gray-dark">{{ $t('btn.goto') }} /auth</p>
        </div>
      </div>
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
    mounted() {
      this.$nextTick(function() {
        this.$anime({
          targets: '#anime-item',
          opacity: ['0%', '100%'],

          translateY: ['-20%', '0%'],
          delay: this.$anime.stagger(600, { start: 700, easing: 'easeOutQuad' }),
          easing: 'easeInOutQuad',
        });
      });
    },
  };
</script>
