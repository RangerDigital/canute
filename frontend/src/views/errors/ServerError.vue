<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation noLogin />

    <div class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold text-white font-heading md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('errors.500.heading') }}</h1>
      <h2 class="my-1 text-2xl font-semibold font-heading md:my-5 text-primary md:text-4xl 2xl:text-5xl ">{{ $t('errors.500.subheading') }}</h2>

      <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('errors.500.about') }}</p>

      <!-- Console Animation -->
      <div id="anime-item" class="p-3 m-3 my-16 rounded-md shadow-sm min-w-sm bg-gray-darker">
        <div class="flex flex-row justify-start ">
          <div id="anime-item" class="w-3 h-3 md:w-3.5 md:h-3.5 m-1 rounded-full bg-primary"> </div>
          <div id="anime-item" class="w-3 h-3 md:w-3.5 md:h-3.5 m-1 rounded-full bg-primary"> </div>
          <div id="anime-item" class="w-3 h-3 md:w-3.5 md:h-3.5 m-1 rounded-full bg-primary"> </div>
        </div>

        <div class="flex flex-col justify-start p-1 md:p-5">
          <p id="anime-item" class="my-1 text-xs leading-tight text-left md:text-sm text-gray"
            ><span class="hidden md:inline opacity-40 text-primary">( {{ timestamp.default }} ) type:</span
            ><span class="md:hidden opacity-40 text-primary">( {{ timestamp.small }} )</span> http - (code: 500) internal error received from server.
          </p>
          <p id="anime-item" class="my-1 text-xs leading-tight text-left md:text-sm text-gray"
            ><span class="hidden md:inline opacity-40 text-primary">( {{ timestamp.default }} ) type:</span
            ><span class="md:hidden opacity-40 text-primary">( {{ timestamp.small }} )</span> sentry - connecting to the sentry server.
          </p>
          <p id="anime-item" class="my-1 text-xs leading-tight text-left md:text-sm text-gray"
            ><span class="hidden md:inline opacity-40 text-primary">( {{ timestamp.default }} ) type:</span
            ><span class="md:hidden opacity-40 text-primary">( {{ timestamp.small }} )</span> sentry - notifying our development team.
          </p>
          <p id="anime-item" class="my-1 text-xs leading-tight text-left md:text-sm text-gray"
            ><span class="hidden md:inline opacity-40 text-primary">( {{ timestamp.default }} ) type:</span
            ><span class="md:hidden opacity-40 text-primary">( {{ timestamp.small }} )</span> sentry - success, working on solution!</p
          >
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
    name: 'ServerError',
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

          translateY: ['-20%', '0%'],
          delay: this.$anime.stagger(600, { start: 700, easing: 'easeOutQuad' }),
          easing: 'easeInOutQuad',
        });
      });
    },
  };
</script>
