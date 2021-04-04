<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <!-- Vertical Container -->
      <div class="w-full p-4 xl:p-12  xl:mx-0 2xl:mx-20 flex flex-col justify-start">
        <div>
          <h1 class="xl:mx-5 py-2 font-sans text-gray text-sm">Manage Users</h1>

          <div class="w-full flex flex-row justify-between">
            <input
              v-model="search"
              placeholder="Search"
              class="w-full xl:w-96 xl:mx-5 block border-transparent focus:outline-none text-sm bg-gray-dark font-base tracking-wide px-3 py-2.5 text-gray rounded-md placeholder-gray ring-red focus:ring-1 "
            />

            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none"
              ><svg class="inline xl:transform xl:scale-125 h-6 xl:h-4 xl:mr-4 align-middle text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                /></svg
              ><span class="hidden xl:inline">ADD USER</span></button
            >
          </div>
          <div class="xl:block bg-gray-dark my-5 h-px w-full rounded-full"></div>
        </div>

        <div class="justify-items-center grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
          <User class="max-w-sm xl:mx-4" v-for="item in searchedUsers" :key="item._id" v-bind:user="item" />
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

  import User from '@/components/app/User.vue';

  const FlexSearch = require('flexsearch');

  export default {
    name: 'Users',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      User,
    },
    data() {
      return {
        users: [],
        organisation: null,
        search: '',
        searchedUsers: [],
      };
    },
    methods: {
      getUsers() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/users')
          .then((payload) => {
            // Create tokens by flattering roles array for search.
            for (let user of payload.data) {
              if (user.isAdmin) {
                user.tokens = 'Admin';
              } else {
                user.tokens = '';
              }

              for (let role of user.roles) {
                user.tokens += ' ' + role.name;
              }

              this.users.push(user);
            }

            this.searchedUsers = this.users;
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

      this.getUsers();
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
              field: ['user:email', 'roles:name', 'tokens', 'annotation'],
            },
          });

          index.add(this.users);

          this.searchedUsers = index.search(x);
        },
      },
    },
  };
</script>
