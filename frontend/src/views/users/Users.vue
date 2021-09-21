<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div>
        <h1 class="my-2 font-medium font-heading text-md xl:text-lg xl:mx-5 text-primary">{{ $t('users.title') }}</h1>
        <p class="my-2 text-sm mb-7 xl:mx-5 text-gray">{{ $t('users.subheading') }}</p>

        <div class="flex flex-row items-center justify-between w-full xl:px-5">
          <TextField class="w-full xl:mx-5" v-model="search" :placeholder="$t('label.search')" />

          <div class="flex flex-row">
            <Button class="inline lg:hidden" icon disabled @click="$router.push('/users/scan')"
              ><svg class="h-5 align-middle " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                /></svg
            ></Button>

            <Button icon class="hidden lg:inline" disabled @click="$router.push('/users/import')"
              ><svg class="h-5 align-middle " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                /></svg
            ></Button>

            <Button tiny @click="$router.push('/users/create')"
              ><svg class="inline h-5 align-middle xl:hidden " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.6"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                /></svg
              ><span class="hidden xl:inline">{{ $t('users.add') }}</span></Button
            >
          </div>
        </div>
        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-2 xl:gap-3 2xl:gap-4">
        <User class="max-w-sm xl:mx-4" id="anime-item" v-for="item in searchedUsers" :key="item._id" v-bind:user="item" @click="$router.push('/users/' + item._id)" />
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import { startGridAnimation } from '@/modules/AnimeUtils.js';

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
      startGridAnimation,

      getUsers() {
        this.axios.get('/api/orgs/' + this.organisation + '/members').then((payload) => {
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
          this.startGridAnimation();
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
