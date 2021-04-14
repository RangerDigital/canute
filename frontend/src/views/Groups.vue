<template>
  <HorizontalLayout>
    <!-- Vertical Container -->
    <div class="flex flex-col justify-start w-full p-4 xl:p-12 xl:mx-0 2xl:mx-20">
      <div>
        <h1 class="py-2 font-sans text-sm xl:mx-5 text-gray-dark">
          <svg class="inline w-5 h-5 mr-2 text-gray-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            /></svg
          >{{ $t('groups.title') }}</h1
        >

        <div class="flex flex-row justify-between w-full">
          <input
            v-model="search"
            v-bind:placeholder="$t('label.search')"
            class="w-full xl:max-w-md xl:mx-5 block border-transparent focus:outline-none text-sm bg-gray-darker font-base tracking-wide px-3 py-2.5 text-white rounded-md placeholder-gray-dark ring-red focus:ring-1 "
          />

          <button
            class="px-3 py-3 ml-2 text-sm font-medium text-white rounded-md lg:mx-5 lg:my-0 xl:px-9 bg-red hover:bg-red-dark focus:outline-none"
            @click="$router.push('/groups/create')"
            ><svg class="inline h-6 text-white align-middle xl:transform xl:scale-125 xl:h-4 xl:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg
            ><span class="hidden xl:inline">{{ $t('groups.add') }}</span></button
          >
        </div>
        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:gap-6">
        <Group class="max-w-sm xl:mx-4 xl:hover:border-red" v-for="item in searchedGroups" :key="item._id" v-bind:group="item" @click="$router.push('/groups/' + item._id)" />
      </div>
    </div>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';

  import Group from '@/components/app/Group.vue';

  const FlexSearch = require('flexsearch');

  export default {
    name: 'Groups',
    components: {
      HorizontalLayout,
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
            this.searchedGroups = this.groups;
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
