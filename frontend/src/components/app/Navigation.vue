<template>
  <!-- Navigation -->
  <div class="flex flex-row">
    <div class="w-px mr-5 rounded-full bg-gray-darker"></div>

    <div class="flex flex-col justify-around w-full">
      <div class="flex flex-col justify-around my-5 2xl:my-12">
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" active-class="text-gray-light" to="/dashboard"
          >{{ $t('nav.dashboard') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
      </div>

      <!-- Admin Navigation -->
      <div v-if="organisationAdmin" class="flex flex-col justify-around w-full">
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" active-class="text-gray-light" to="/groups"
          >{{ $t('nav.groups') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" active-class="text-gray-light" to="/devices"
          >{{ $t('nav.devices') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" active-class="text-gray-light" to="/users"
          >{{ $t('nav.users') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
      </div>

      <div class="flex flex-col justify-around my-6 2xl:my-12">
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" to="/" @click="logout()"
          >{{ $t('nav.settings') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
        <router-link class="py-2.5 text-sm xl:py-2 text-gray hover:text-gray-light" active-class="text-gray-light" to="/organisations"
          >{{ $t('nav.organisations') }}
          <svg class="inline float-right w-6 h-6 mr-4 text-primary xl:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg
        ></router-link>
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
