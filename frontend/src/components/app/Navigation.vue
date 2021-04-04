<template>
  <!-- Navigation -->
  <div class="flex flex-row">
    <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

    <div class="w-full flex flex-col justify-around">
      <div class="my-5 2xl:my-12 flex flex-col justify-around">
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/dashboard">{{ $t('nav.dashboard') }}</router-link>
      </div>

      <!-- Admin Navigation -->
      <div v-if="organisationAdmin" class="w-full flex flex-col justify-around">
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/groups">{{ $t('nav.groups') }}</router-link>
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/users">{{ $t('nav.users') }}</router-link>
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/devices">{{ $t('nav.devices') }}</router-link>
      </div>

      <div class="my-6 2xl:my-12 flex flex-col justify-around">
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/guard">{{ $t('nav.settings') }}</router-link>
        <router-link class="py-4 xl:py-2 text-sm font-medium text-gray hover:text-gray-light" active-class="text-gray-light" to="/organisations">{{
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
    mounted() {
      if (localStorage.organisationAdmin === 'true') {
        this.organisationAdmin = true;
      }
    },
  };
</script>
