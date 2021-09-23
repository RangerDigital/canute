<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation noLogin />

    <div class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold text-white font-heading md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('errors.404.heading') }}</h1>
      <h2 class="my-1 text-2xl font-semibold font-heading md:my-5 text-primary md:text-4xl 2xl:text-5xl ">{{ $t('errors.404.subheading') }}</h2>

      <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('errors.404.about') }}</p>

      <!-- Links -->

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
    </div>

    <!-- Return Button -->
    <div id="anime-item" class="flex justify-center">
      <Button solid class="max-w-xs" @click="$router.push('/dashboard')">{{ $t('btn.return') }}</Button>
    </div>
    <div class="h-16 lg:h-48"></div>
  </section>
</template>

<script>
  import { format } from 'date-fns';

  import HomeNavigation from '@/components/HomeNavigation.vue';
  import Button from '@/components/inputs/Button.vue';
  export default {
    name: 'NotFoundError',
    components: {
      HomeNavigation,
      Button,
    },

    data() {
      return {
        timestamp: {
          default: '',
          small: '',
        },
      };
    },
    mounted() {
      this.timestamp.default = format(new Date(), 'MMM d, yyyy HH:mm');
      this.timestamp.small = format(new Date(), 'HH:mm');

      this.$nextTick(function() {
        this.$anime({
          targets: '#anime-item',
          opacity: ['0%', '100%'],

          translateY: ['-25%', '0%'],
          delay: this.$anime.stagger(600, { start: 700, easing: 'linear' }),
          easing: 'easeOutQuad',
        });
      });
    },
  };
</script>
