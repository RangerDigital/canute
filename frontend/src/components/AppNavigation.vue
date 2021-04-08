<template
  ><!-- Left Bar-->
  <nav class="flex flex-col xl:w-60 justify-start flex-none">
    <!-- Organisation -->
    <div class="w-full my-2 xl:my-5 2xl:my-12 flex flex-row cursor-pointer" @click="$router.push('/organisations')">
      <div class="mx-5 xl:mx-0 xl:mr-5 bg-gray-darker w-px rounded-full"></div>

      <div class="flex flex-col justify-around">
        <h2 class="py-2 font-sans font-medium text-white text-base">{{ organisationName }}</h2>
        <p class="my-1 text-sm  text-red">{{ organisationAddress }}</p>
        <p v-if="organisationAdmin" class="my-2 text-sm  text-gray-dark">Admin</p>
      </div>
    </div>

    <Navigation class="hidden xl:flex my-2 xl:my-5 2xl:my-12" />
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
