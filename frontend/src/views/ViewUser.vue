<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <!-- Vertical Container -->
      <div class="w-full p-4 xl:p-12  xl:mx-0 2xl:mx-20 flex flex-col justify-start">
        <div>
          <div class="w-full flex flex-row justify-between">
            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none">SAVE</button>
          </div>
          <div class="xl:block bg-gray-dark my-5 h-px w-full rounded-full"></div>
        </div>
      </div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  export default {
    name: 'ViewUser',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
    },
    data() {
      return {
        groups: [],
        organisation: null,
      };
    },
    methods: {
      getGroups() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/roles')
          .then((payload) => {
            this.groups = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      } else {
        this.organisation = localStorage.organisation;
      }

      this.getGroups();
    },
  };
</script>
