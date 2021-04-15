<template>
  <section class="flex flex-col justify-between min-h-screen">
    <div class="flex flex-col justify-start h-full">
      <HomeNavigation noLogin noNav showBackHamburger />

      <OrganisationPreview class="self-center w-full max-w-md ml-10" />

      <Navigation class="self-center w-full max-w-md p-5" />
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import OrganisationPreview from '@/components/OrganisationPreview.vue';
  import Navigation from '@/components/app/Navigation.vue';

  export default {
    name: 'MobileNavigation',
    components: {
      HomeNavigation,
      HomeFooter,
      Navigation,
      OrganisationPreview,
    },
  };
</script>
