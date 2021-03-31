<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <LoadingSpinner v-if="!isLoaded" class="self-center" />

    <div v-if="isLoaded && !organisations.length" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl"
        ><span class="text-red">Sorry,</span> You don't belong to any organizations <span class="text-red">yet!</span></h1
      >

      <p class="my-5 md:my-8 text-sm md:text-base text-gray">Ask your building admin about access.</p>
    </div>

    <div v-if="isLoaded && organisations.length" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl">Select <span class="text-white">your</span> organisation. </h1>
    </div>

    <div v-if="isLoaded && organisations.length" class="self-center w-full md:max-w-md p-5">
      <p class="my-2 text-sm  text-gray-dark ">Organisations</p>
      <div class="h-px bg-gray-dark rounded-full"></div>

      <div class="flex flex-col">
        <!-- Organisation -->

        <div v-for="item in organisations" :key="item._id" class="my-4 md:my-1 flex flex-row justify-between cursor-pointer" @click="selectOrganisation(item)">
          <div class="w-full flex flex-row justify-between items-center">
            <div class="my-2 xl:my-5 2xl:my-12 flex flex-row">
              <div class="bg-red w-px mr-5 rounded-full"></div>

              <div class="flex flex-col justify-around">
                <h2 class="py-2 font-sans text-red text-base lg:text-lg">{{ item.name }}</h2>
                <p class="my-2 text-sm  text-gray">{{ item.address }}</p>
              </div>
            </div>

            <p class="my-2 text-sm font-medium text-gray-dark focus:outline-none"
              >Select
              <svg class="inline h-6 mx-0.5 align-middle text-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 5l7 7-7 7" /></svg
            ></p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoaded && organisations.length"></div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

  export default {
    name: 'Organisation',
    components: {
      HomeNavigation,
      HomeFooter,
      LoadingSpinner,
    },
    data() {
      return {
        organisations: [],
        isLoaded: false,
      };
    },
    methods: {
      getOrganisations() {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

        this.axios.get('/api/orgs').then((payload) => {
          this.organisations = payload.data;

          this.isLoaded = true;
        });
      },
      selectOrganisation(organisation) {
        localStorage.organisation = organisation._id;
        localStorage.organisationName = organisation.name;
        localStorage.organisationAddress = organisation.address;
        localStorage.organisationAdmin = organisation.isAdmin;

        this.$router.push('/dashboard');
      },
    },
    created() {
      this.getOrganisations();
    },
  };
</script>
