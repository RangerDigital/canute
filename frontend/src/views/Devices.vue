<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <!-- Vertical Container -->
      <div class="w-full p-4 xl:p-12  xl:mx-0 2xl:mx-20 flex flex-col justify-start">
        <div>
          <h1 class="xl:mx-5 py-2 font-sans text-gray text-sm">Manage Devices</h1>

          <div class="w-full flex flex-row justify-between">
            <input
              v-model="search"
              placeholder="Search"
              class="w-full xl:w-96 xl:mx-5 block border-transparent focus:outline-none text-sm bg-gray-dark font-base tracking-wide px-3 py-2.5 text-gray rounded-md placeholder-gray ring-red focus:ring-1 "
            />

            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none">
              <svg class="inline xl:transform xl:scale-125 h-6 xl:h-4 xl:mr-4 align-middle text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                /></svg
              ><span class="hidden xl:inline">ADD DEVICE</span></button
            >
          </div>
          <div class="xl:block bg-gray-dark my-5 h-px w-full rounded-full"></div>
        </div>

        <div class="justify-items-center grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
          <Device class="max-w-sm xl:mx-4" v-for="item in searchedDevices" :key="item._id" v-bind:device="item" />
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

  import Device from '@/components/app/Device.vue';

  const FlexSearch = require('flexsearch');

  export default {
    name: 'Devices',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      Device,
    },
    data() {
      return {
        devices: [],
        organisation: null,
        search: '',
        searchedDevices: [],
      };
    },
    methods: {
      getDevices() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/devices')
          .then((payload) => {
            this.devices = payload.data;

            this.searchedDevices = this.devices;
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

      this.getDevices();
    },
    watch: {
      search: {
        immediate: true,
        handler(x) {
          if (x.length == 0) {
            this.searchedDevices = this.devices;
            return;
          }

          var index = new FlexSearch({
            tokenize: 'full',
            depth: 3,
            doc: {
              id: '_id',
              field: ['name'],
            },
          });

          index.add(this.devices);

          this.searchedDevices = index.search(x);
        },
      },
    },
  };
</script>
