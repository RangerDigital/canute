<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <!-- Vertical Container -->
      <div class="w-full p-4 xl:p-12  xl:mx-0 2xl:mx-20 flex flex-col justify-start">
        <div>
          <h1 class="xl:mx-5 py-2 font-sans text-gray-dark text-sm">Manage Groups</h1>

          <div class="w-full flex flex-row justify-between">
            <input
              v-model="search"
              placeholder="Search"
              class="w-full xl:w-96 xl:mx-5 block border-transparent focus:outline-none text-sm bg-gray-darker font-base tracking-wide px-3 py-2.5 text-white rounded-md placeholder-gray-dark ring-red focus:ring-1 "
            />

            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none"
              ><svg class="inline xl:transform xl:scale-125 h-6 xl:h-4 xl:mr-4 align-middle text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                /></svg
              ><span class="hidden xl:inline">ADD GROUP</span></button
            >
          </div>
          <div class="xl:block bg-gray-darker my-5 h-px w-full rounded-full"></div>
        </div>

        <div class="justify-items-center grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
          <Group class="max-w-sm xl:mx-4 xl:hover:border-red" v-for="item in searchedGroups" :key="item._id" v-bind:group="item" />
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

  import Group from '@/components/app/Group.vue';

  const FlexSearch = require('flexsearch');

  export default {
    name: 'Groups',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      Group,
    },
    data() {
      return {
        groups: [],
        organisation: null,
        search: '',
        searchedGroups: [],
      };
    },
    methods: {
      getGroups() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/roles')
          .then((payload) => {
            this.groups = payload.data;

            this.searchedGroups = this.groups;
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
    watch: {
      search: {
        immediate: true,
        handler(x) {
          if (x.length == 0) {
            this.searchedUsers = this.users;
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

          index.add(this.groups);

          this.searchedGroups = index.search(x);
        },
      },
    },
  };
</script>
