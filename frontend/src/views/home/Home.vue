<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation />

    <section class="flex flex-col items-center justify-between p-5 my-5 2xl:my-14 md:px-8 xl:w-11/12 2xl:w-9/12 xl:flex-row xl:self-center">
      <div>
        <div class="transform -translate-x-2 md:-translate-x-3 md:my-1 -rotate-3">
          <h3 id="anime-item" class="my-5 text-xl font-marker md:my-10 text-primary md:text-3xl 2xl:text-4xl 3xl:text-5xl">{{ $t('home.for.residents') }}</h3>
        </div>

        <h1 class="my-1 text-2xl font-semibold text-white font-heading md:my-5 md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold font-heading md:my-5 text-primary md:text-4xl 2xl:text-5xl 3xl:text-6xl">{{ $t('home.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 xl:text-base text-gray">{{ $t('home.about') }}</p>

        <!-- Call to Action -->
        <div class="flex flex-row items-center justify-center mt-16 mb-8 md:justify-start">
          <Button solid @click="callToAction()">{{ $t('home.action') }}</Button>

          <Button ghost class="hidden md:block" @click="scrollToElement('modules')">{{ $t('btn.learn') }}</Button>
        </div>
      </div>

      <img class="my-10 transform -translate-x-5 w-100 xl:translate-x-0 xl:scale-125 xl:w-3/6" src="@/assets/images/hero.png" />
    </section>

    <!-- Modules -->
    <ModulesGrid ref="modules" />

    <Divider />

    <!-- Canute Access -->
    <AccessSection />

    <Button ghost class="self-center max-w-xs m-5" @click="showToast">DEV: Show Toast</Button>
    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import ModulesGrid from './components/ModulesGrid.vue';
  import AccessSection from './components/AccessSection.vue';

  import Divider from './components/Divider.vue';
  import Button from '@/components/inputs/Button.vue';

  import ToastService from '@/modules/ToastService';

  export default {
    name: 'Home',
    components: {
      HomeNavigation,
      HomeFooter,
      AccessSection,
      Divider,
      ModulesGrid,
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

      scrollToElement(element) {
        const el = this.$refs[element];

        if (el) {
          el.$el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },

      showToast() {
        ToastService.success();
      },
    },
    mounted() {
      this.$nextTick(function() {
        this.$anime({
          targets: '#anime-item',
          opacity: ['0%', '100%'],

          translateY: ['-20%', '0%'],
          delay: this.$anime.stagger(600, { start: 100, easing: 'easeOutQuad' }),
          easing: 'easeInOutQuad',
        });
      });
    },
  };
</script>
