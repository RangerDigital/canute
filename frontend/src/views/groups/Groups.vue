<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div>
        <h1 class="my-2 font-medium font-heading text-md xl:text-lg xl:mx-5 text-primary">{{ $t('groups.title') }}</h1>
        <p class="my-2 text-sm mb-7 xl:mx-5 text-gray">{{ $t('groups.subheading') }}</p>

        <div class="flex flex-row items-center justify-between w-full xl:px-5">
          <TextField class="w-full xl:mx-5" v-model="search" v-bind:placeholder="$t('label.search')" />

          <Button tiny @click="$router.push('/groups/create')"
            ><svg class="inline h-5 text-white align-middle xl:hidden " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.6"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              /></svg
            ><span class="hidden xl:inline">{{ $t('groups.add') }}</span></Button
          >
        </div>
        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-2 xl:gap-3 2xl:gap-4">
        <Group class="max-w-sm xl:mx-4 xl:hover:border-primary" v-for="item in searchedGroups" :key="item._id" v-bind:group="item" @click="$router.push('/groups/' + item._id)" />
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Button from '@/components/inputs/Button.vue';
  import TextField from '@/components/inputs/TextField.vue';

  import Group from '@/components/app/Group.vue';

  export default {
    name: 'Groups',
    components: {
      Group,
      HorizontalLayout,
      Button,
      TextField,
      VerticalContainer,
    },
    data() {
      return {
        groups: [],
        organisation: null,

        search: '',
        searchIndex: null,
        searchedGroups: [],
      };
    },
    methods: {
      getGroups() {
        this.axios.get('/api/orgs/' + this.organisation + '/roles').then((payload) => {
          this.groups = payload.data;
          this.searchedGroups = payload.data;
        });
      },

      createIndex() {
        this.searchIndex = require('flexsearch').create({
          profile: 'match',
          depth: 3,
          doc: {
            id: '_id',
            field: ['name'],
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

      this.getGroups();
      this.createIndex();
    },
    watch: {
      search: {
        immediate: true,
        handler(query) {
          if (query.length == 0) {
            return (this.searchedGroups = this.groups);
          }

          this.searchIndex.add(this.groups);
          this.searchedGroups = this.searchIndex.search(query);
        },
      },
    },
  };
</script>
