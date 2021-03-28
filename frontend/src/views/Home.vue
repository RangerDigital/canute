<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation />

    <section class="p-5 md:px-20 xl:px-36 xl:w-10/12 flex flex-col xl:flex-row xl:self-center items-center justify-between">
      <div>
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl lg:text-5xl">One app. Every door.</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl lg:text-5xl ">Happy residents!</h2>

        <p class="my-5 md:my-10 text-sm md:text-base lg:text-lg font-medium text-gray">Multi-family building internet connected access control system.</p>

        <!-- Call to Action -->
        <div class="mt-16 mb-8 flex flex-row items-center justify-center md:justify-start">
          <button class="font-semibold px-12 py-3 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none" @click="$router.push('auth')">Get Started </button>

          <button class="hidden md:block ml-6 font-semibold px-7 py-3 text-gray border-2 border-gray bg-black rounded-md focus:outline-none" @click="$router.push('auth')"
            >Contact Sales
          </button>
        </div>
      </div>

      <img class="w-100 my-10 transform -translate-x-5 xl:transform-none xl:w-3/6" src="@/assets/images/hero.png" />
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
  };
</script>
