<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div>
        <h1 class="xl:mx-5 py-2 font-sans text-gray-dark text-sm"
          ><svg class="inline mr-2 h-5 w-5 text-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            /></svg
          >{{ $t('users.title') }}</h1
        >

        <div class="w-full flex flex-row justify-between">
          <TextField class="w-full xl:mx-5" v-model="search" v-bind:placeholder="$t('label.search')" />

          <Button tiny @click="$router.push('/users/create')"
            ><svg class="inline xl:transform xl:scale-125 h-6 xl:h-4 xl:mr-4 align-middle text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              /></svg
            ><span class="hidden xl:inline">{{ $t('users.add') }}</span></Button
          >
        </div>
        <div class="xl:block bg-gray-darker my-5 h-px w-full rounded-full"></div>
      </div>

      <div class="justify-items-center grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
        <User class="max-w-sm xl:mx-4" v-for="item in searchedUsers" :key="item._id" v-bind:user="item" @click="$router.push('/users/' + item._id)" />
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Button from '@/components/inputs/Button.vue';
  import TextField from '@/components/inputs/TextField.vue';

  import User from '@/components/app/User.vue';

  const FlexSearch = require('flexsearch');

  export default {
    name: 'Users',
    components: {
      User,
      HorizontalLayout,
      Button,
      TextField,
      VerticalContainer,
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
              field: ['email', 'roles:name', 'tokens', 'annotation'],
            },
          });

          index.add(this.users);

          this.searchedUsers = index.search(x);
        },
      },
    },
  };
</script>
