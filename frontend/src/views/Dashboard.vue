<template>
  <HorizontalLayout>
    <VerticalContainer>
      <OrganisationPreview class="mb-7 xl:hidden" />

      <div class="hidden xl:block">
        <h1 class="my-2 font-medium text-md xl:text-lg xl:mx-5 text-red">{{ $t('dashboard.title') }}</h1>
        <p class="my-2 text-sm font-medium mb-7 xl:mx-5 text-gray">{{ $t('dashboard.subheading') }}</p>

        <!-- Organisation Stats -->
        <div v-if="organisationAdmin" class="flex-row items-center justify-start hidden w-full my-5 2xl:flex xl:px-5">
          <div class="w-2/12 max-w-xs p-4 mr-5 cursor-pointer" @click="$router.push('/users')">
            <p class="text-2xl text-white">{{ organisationObject.users.length }}</p>
            <p class="mt-1.5 text-sm text-red">{{ $t('users.title') }}</p>
          </div>

          <div class="w-2/12 max-w-xs p-4 mr-5 cursor-pointer" @click="$router.push('/devices')">
            <p class="text-2xl text-white">{{ devices.length }}</p>
            <p class=" mt-1.5 text-sm text-red">{{ $t('devices.title') }}</p>
          </div>

          <div class="w-2/12 max-w-xs p-4 mr-5 cursor-pointer" @click="$router.push('/groups')">
            <p class="text-2xl text-white">{{ organisationObject.roles.length }}</p>
            <p class=" mt-1.5 text-sm text-red">{{ $t('groups.title') }}</p>
          </div>
        </div>

        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 xl:mx-5 justify-items-center xl:grid-cols-2 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-7">
        <!-- Locks List -->
        <div v-if="locks.length" class="w-full md:max-w-sm">
          <p class="my-2 text-sm text-gray-dark ">{{ $t('label.locks') }}</p>
          <div class="h-px rounded-full bg-gray-darker"></div>

          <div class="flex flex-col xl:justify-center">
            <Lock v-for="item in locks" :key="item._id" v-bind:lock="item" />
          </div>
        </div>
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import OrganisationPreview from '@/components/OrganisationPreview.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Lock from '@/components/app/Lock.vue';

  export default {
    name: 'Dashboard',
    components: {
      HorizontalLayout,
      VerticalContainer,
      OrganisationPreview,
      Lock,
    },
    data() {
      return {
        locks: [],
        organisation: null,
        organisationAdmin: false,
        organisationObject: { roles: [], users: [] },
        devices: [],
      };
    },
    methods: {
      getLocks() {
        this.axios.get('/api/orgs/' + this.organisation + '/locks').then((payload) => {
          this.locks = payload.data;
        });
      },

      getOrganisation() {
        this.axios.get('/api/orgs/' + this.organisation).then((payload) => {
          this.organisationObject = payload.data;
        });
      },

      getDevices() {
        this.axios.get('/api/orgs/' + this.organisation + '/devices').then((payload) => {
          this.devices = payload.data;
        });
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations/autoSelect');
      } else {
        this.organisation = localStorage.organisation;
      }

      if (localStorage.organisationAdmin === 'true') {
        this.organisationAdmin = true;
      }

      this.getLocks();

      if (this.organisationAdmin) {
        this.getDevices();
        this.getOrganisation();
      }
    },
  };
</script>
