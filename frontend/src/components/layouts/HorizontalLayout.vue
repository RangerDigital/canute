<template>
  <section class="flex flex-col justify-between h-full min-h-screen">
    <HomeNavigation noLogin noNav />

    <div class="flex flex-col self-center justify-start flex-grow w-full h-full xl:self-auto md:max-w-md xl:max-w-full xl:flex-row xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" :style="y" />

      <div v-if="loading" class="flex items-center justify-center flex-grow"> <LoadingSpinner /></div>

      <slot v-if="!loading"></slot>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

  export default {
    name: 'HorizontalLayout',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      LoadingSpinner,
    },
    props: {
      loading: Boolean,
    },

    computed: {
      y() {
        return `margin-top: ${this.scrollPosition}px`;
      },
    },

    data() {
      return {
        scrollPosition: null,
      };
    },

    methods: {
      updateScroll() {
        if (window.scrollY < window.innerHeight) {
          this.scrollPosition = window.scrollY;
        }
      },
    },

    mounted() {
      window.addEventListener('scroll', this.updateScroll);
    },

    destroy() {
      window.removeEventListener('scroll', this.updateScroll);
    },
  };
</script>
