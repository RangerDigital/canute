<template>
  <!-- Navigation -->
  <div class="flex flex-row">
    <div class="w-px mr-5 rounded-full bg-gray-darker"></div>

    <div class="flex flex-col justify-around w-full">
      <div class="flex flex-col justify-around my-5 2xl:my-12">
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/dashboard">{{
          $t('nav.dashboard')
        }}</router-link>
      </div>

      <!-- Admin Navigation -->
      <div v-if="organisationAdmin" class="flex flex-col justify-around w-full">
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/groups">{{ $t('nav.groups') }}</router-link>
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/devices">{{ $t('nav.devices') }}</router-link>
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/users">{{ $t('nav.users') }}</router-link>
      </div>

      <div class="flex flex-col justify-around my-6 2xl:my-12">
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" to="/" @click="logout()">{{ $t('nav.settings') }}</router-link>
        <router-link class="py-3.5 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/organisations">{{
          $t('nav.organisations')
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navigation',

    data() {
      return {
        organisationAdmin: false,
      };
    },
    methods: {
      logout() {
        localStorage.clear();
      },
    },
    mounted() {
      if (localStorage.organisationAdmin === 'true') {
        this.organisationAdmin = true;
      }
    },
  };
</script>
