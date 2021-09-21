<template>
  <HorizontalLayout>
    <VerticalContainer>
      <OrganisationPreview class="mb-7 xl:hidden" />

      <div class="hidden xl:block">
        <h1 class="my-2 font-medium font-heading text-md xl:text-lg xl:mx-5 text-primary">{{ $t('dashboard.title') }}</h1>
        <p class="my-2 text-sm mb-7 xl:mx-5 text-gray">{{ $t('dashboard.subheading') }}</p>

        <!-- Organisation Stats -->
        <div v-if="organisationAdmin" class="flex-row items-center justify-start hidden w-full my-5 2xl:flex xl:px-1">
          <Stats v-bind:subheading="$t('users.title')" v-bind:value="(organisationObject.members || []).length" @click="$router.push('/users')"
            ><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg
          ></Stats>

          <Stats v-bind:subheading="$t('devices.title')" v-bind:value="(devices || []).length" @click="$router.push('/devices')">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              /></svg
          ></Stats>

          <Stats v-bind:subheading="$t('groups.title')" v-bind:value="(organisationObject.roles || []).length || 0" @click="$router.push('/groups')">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              /></svg
          ></Stats>
        </div>

        <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>
      </div>

      <div class="grid grid-cols-1 justify-items-center xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 lg:gap-2 xl:gap-3 2xl:gap-4">
        <!-- Locks List -->
        <div v-if="locks.length" class="w-full md:max-w-sm">
          <p class="my-2 text-xs text-gray-dark ">{{ $t('label.locks') }}</p>
          <div class="h-px rounded-full bg-gray-darker"></div>

          <div class="flex flex-col xl:justify-center">
            <Lock v-for="item in locks" :key="item._id" v-bind:lock="item" />
          </div>
        </div>

        <!-- Info List -->
        <div v-if="!locks.length" class="w-full md:max-w-sm">
          <p class="my-2 text-xs text-gray-dark ">{{ $t('label.informations') }}</p>
          <div class="h-px rounded-full bg-gray-darker"></div>

          <Info v-bind:title="$t('label.nothinghere')">{{ $t('dashboard.empty') }}</Info>
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
  import Stats from '@/components/app/Stats.vue';
  import Info from '@/components/app/Info.vue';

  export default {
    name: 'Dashboard',
    components: {
      HorizontalLayout,
      VerticalContainer,
      OrganisationPreview,
      Lock,
      Stats,
      Info,
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
