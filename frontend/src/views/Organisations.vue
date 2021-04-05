<template>
  <section class="min-h-screen flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <LoadingSpinner v-if="!isLoaded" class="self-center" />

    <div v-if="isLoaded && !organisations.length" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl" v-html="$t('organisations.error.heading')"></h1>

      <p class="my-5 md:my-8 text-sm md:text-base text-gray">{{ $t('organisations.error.about') }}</p>
    </div>

    <div v-if="isLoaded && organisations.length" class=" self-center text-center">
      <h1 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl" v-html="$t('organisations.heading')"></h1>
    </div>

    <div v-if="isLoaded && organisations.length" class="self-center w-full md:max-w-md p-5">
      <p class="my-2 text-sm  text-gray-dark ">{{ $t('label.organisations') }}</p>
      <div class="h-px bg-gray-dark rounded-full"></div>

      <div class="flex flex-col">
        <Organisation v-for="item in organisations" :key="item._id" v-bind:organisation="item" />
      </div>
    </div>

    <div v-if="isLoaded && organisations.length"></div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import Organisation from '@/components/app/Organisation.vue';
  import LoadingSpinner from '@/components/app/LoadingSpinner.vue';

  export default {
    name: 'Organisations',
    components: {
      HomeNavigation,
      HomeFooter,
      LoadingSpinner,
      Organisation,
    },
    data() {
      return {
        organisations: [],
        isLoaded: false,
        autoSelect: false,
      };
    },
    methods: {
      getOrganisations() {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

        this.axios.get('/api/orgs').then((payload) => {
          this.organisations = payload.data;

          if (this.autoSelect && this.organisations.length == 1) {
            let organisation = this.organisations[0];

            localStorage.organisation = organisation._id;
            localStorage.organisationName = organisation.name;
            localStorage.organisationAddress = organisation.address;
            localStorage.organisationAdmin = organisation.isAdmin;

            this.$router.push('/dashboard');
          }

          this.isLoaded = true;
        });
      },
    },
    created() {
      if (this.$route.params.autoSelect.length) {
        this.autoSelect = true;
      }
      this.getOrganisations();
    },
  };
</script>
