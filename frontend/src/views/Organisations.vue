<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <div class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl">Select <span class="text-white">your</span> organisation. </h1>
    </div>

    <div class="self-center  w-full md:max-w-md p-5">
      <p class="my-2 text-sm  text-gray-dark ">Organisations</p>
      <div class="h-px bg-gray-dark rounded-full"></div>

      <div class="flex flex-col justify-center">
        <!-- Organisation -->

        <div v-for="item in organisations" :key="item._id" class="flex flex-row justify-between cursor-pointer" @click="selectOrganisation(item)">
          <div class="w-full flex flex-row justify-between items-center">
            <div class="my-2 xl:my-5 2xl:my-12 flex flex-row">
              <div class="bg-red w-px mr-5 rounded-full"></div>

              <div class="flex flex-col justify-around">
                <h2 class="py-2 font-sans text-red text-base lg:text-lg">{{ item.name }}</h2>
                <p class="my-2 text-sm font-medium text-gray">{{ item._id }}</p>
              </div>
            </div>

            <button class="my-2 text-sm font-medium text-gray focus:outline-none"
              >Select
              <svg class="inline h-6 mx-0.5 align-middle text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 5l7 7-7 7" /></svg
            ></button>
          </div>
        </div>
      </div>
    </div>

    <div></div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'Organisation',
    components: {
      HomeNavigation,
      HomeFooter,
    },
    data() {
      return {
        organisations: [],
      };
    },
    methods: {
      getOrganisations() {
        this.axios.get('/api/orgs').then((payload) => {
          this.organisations = payload.data;
        });
      },
      selectOrganisation(organisation) {
        localStorage.organisation = organisation._id;
        localStorage.organisationName = organisation.name;
        localStorage.organisationAddress = organisation.address;

        this.$router.push('/dashboard');
      },
    },
    created() {
      if (localStorage.organisation) {
        this.selectedOrganisation = localStorage.organisation;
      }

      this.getOrganisations();
    },
  };
</script>
