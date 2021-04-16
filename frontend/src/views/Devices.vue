<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div>
        <h1 class="my-2 text-md xl:text-lg xl:mx-5 text-red">{{ $t('devices.title') }}</h1>
        <p class="my-2 text-sm mb-7 xl:mx-5 text-gray">{{ $t('devices.subheading') }}</p>

        <div class="flex flex-row items-center justify-between w-full xl:px-5">
          <TextField class="w-full xl:mx-5" v-model="search" v-bind:placeholder="$t('label.search')" />

          <Button tiny @click="$router.push('/devices/create')"
            ><svg class="inline h-6 text-white align-middle xl:transform xl:scale-125 xl:h-4 xl:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.9"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              /></svg
            ><span class="hidden xl:inline">{{ $t('devices.add') }}</span></Button
          >
        </div>
        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-2">
        <Device class="max-w-sm xl:mx-4" v-for="item in searchedDevices" :key="item._id" v-bind:device="item" @click="$router.push('/devices/' + item._id)" />
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Button from '@/components/inputs/Button.vue';
  import TextField from '@/components/inputs/TextField.vue';

  import Device from '@/components/app/Device.vue';

  export default {
    name: 'Devices',
    components: {
      Device,
      HorizontalLayout,
      Button,
      TextField,
      VerticalContainer,
    },
    data() {
      return {
        devices: [],
        organisation: null,

        search: '',
        searchIndex: null,
        searchedDevices: [],
      };
    },
    methods: {
      getDevices() {
        this.axios.get('/api/orgs/' + this.organisation + '/devices').then((payload) => {
          this.devices = payload.data;
          this.searchedDevices = payload.data;
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

      this.getDevices();
      this.createIndex();
    },
    watch: {
      search: {
        immediate: true,
        handler(query) {
          if (query.length == 0) {
            return (this.searchedDevices = this.devices);
          }

          this.searchIndex.add(this.devices);
          this.searchedDevices = this.searchIndex.search(query);
        },
      },
    },
  };
</script>
