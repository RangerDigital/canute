<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div>
        <h1 class="my-2 font-medium text-md xl:text-lg xl:mx-5 text-primary">{{ $t('users.title') }}</h1>
        <p class="my-2 text-sm mb-7 xl:mx-5 text-gray">{{ $t('users.subheading') }}</p>

        <div class="flex flex-row items-center justify-between w-full xl:px-5">
          <TextField class="w-full xl:mx-5" v-model="search" v-bind:placeholder="$t('label.search')" />

          <Button tiny @click="$router.push('/users/create')"
            ><svg class="inline h-5 text-white align-middle xl:hidden " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              /></svg
            ><span class="hidden xl:inline">{{ $t('users.add') }}</span></Button
          >
        </div>
        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-2">
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
        searchIndex: null,
        searchedUsers: [],
      };
    },
    methods: {
      getUsers() {
        this.axios.get('/api/orgs/' + this.organisation + '/users').then((payload) => {
          // Generate tags for searching from roles and admin.
          for (let user of payload.data) {
            user.tags = '';

            if (user.isAdmin) {
              user.tokens += 'Admin';
            }

            for (let role of user.roles) {
              user.tags += ' ' + role.name;
            }

            this.users.push(user);
          }
          this.searchedUsers = this.users;
        });
      },

      createIndex() {
        this.searchIndex = require('flexsearch').create({
          profile: 'match',
          depth: 3,
          doc: {
            id: '_id',
            field: ['email', 'tags', 'annotation'],
          },
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
      this.createIndex();
    },
    watch: {
      search: {
        immediate: true,
        handler(query) {
          if (query.length == 0) {
            return (this.searchedUsers = this.users);
          }

          this.searchIndex.add(this.users);
          this.searchedUsers = this.searchIndex.search(query);
        },
      },
    },
  };
</script>