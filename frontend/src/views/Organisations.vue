<template>
  <section class="flex flex-col justify-between min-h-screen">
    <HomeNavigation noLogin noNav />

    <LoadingSpinner v-if="!isLoaded" class="self-center" />

    <div v-if="isLoaded && !organisations.length" class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl" v-html="$t('organisations.error.heading')"></h1>

      <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('organisations.error.about') }}</p>
    </div>

    <div v-if="isLoaded && organisations.length" class="self-center text-center ">
      <h1 class="my-1 text-2xl font-semibold md:my-5 text-red md:text-4xl 2xl:text-5xl" v-html="$t('organisations.heading')"></h1>
    </div>

    <div v-if="isLoaded && organisations.length" class="self-center w-full p-5 md:max-w-md">
      <p class="my-2 text-sm text-gray-dark ">{{ $t('label.organisations') }}</p>
      <div class="h-px rounded-full bg-gray-darker"></div>

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
