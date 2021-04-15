<template
  ><!-- Left Bar-->
  <nav class="flex flex-col justify-start flex-none xl:w-60">
    <OrganisationPreview />

    <Navigation class="hidden my-2 xl:flex xl:my-5 2xl:my-12" />
  </nav>
</template>
<script>
  import Navigation from '@/components/app/Navigation.vue';
  import OrganisationPreview from '@/components/OrganisationPreview.vue';

  export default {
    name: 'AppNavigation',
    components: {
      Navigation,
      OrganisationPreview,
    },
  };
</script>
