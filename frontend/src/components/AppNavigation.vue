<template
  ><!-- Left Bar-->
  <nav class="flex flex-col justify-start flex-none xl:w-60">
    <!-- Organisation -->
    <div class="flex flex-row w-full my-2 cursor-pointer xl:my-5 2xl:my-12" @click="$router.push('/organisations')">
      <div class="w-px mx-5 rounded-full xl:mx-0 xl:mr-5 bg-gray-darker"></div>

      <div class="flex flex-col justify-around">
        <h2 class="py-2 font-sans text-base font-medium text-white">{{ organisationName }}</h2>
        <p class="my-1 text-sm text-red">{{ organisationAddress }}</p>
        <p v-if="organisationAdmin" class="my-2 text-sm text-gray-dark">Admin</p>
      </div>
    </div>

    <Navigation class="hidden my-2 xl:flex xl:my-5 2xl:my-12" />
  </nav>
</template>
<script>
  import Navigation from '@/components/app/Navigation.vue';

  export default {
    name: 'AppNavigation',
    components: {
      Navigation,
    },
    data() {
      return {
        organisationName: '',
        organisationAddress: '',
        organisationAdmin: false,
      };
    },
    mounted() {
      this.organisationName = localStorage.organisationName;
      this.organisationAddress = localStorage.organisationAddress;

      if (localStorage.organisationAdmin === 'true') {
        this.organisationAdmin = true;
      }
    },
  };
</script>
