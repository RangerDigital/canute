<template
  ><!-- Left Bar-->
  <nav class="flex flex-col w-60">
    <!-- Organisation -->
    <div class="my-2 xl:my-5 2xl:my-12 flex flex-row">
      <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

      <div class="flex flex-col justify-around">
        <h2 class="py-2 font-sans font-semibold text-red text-xl">{{ name }}</h2>
        <p class="my-2 text-sm font-medium text-gray">{{ address }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="hidden my-2 xl:my-5 2xl:my-12 xl:flex flex-row">
      <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

      <div class="flex flex-col justify-around">
        <div class="my-5 2xl:my-12 flex flex-col justify-around">
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/things">Things</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/dashboard">Dashboard</router-link>
        </div>
        <div class="my-5 2xl:my-12 flex flex-col justify-around">
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/profile">Profile</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/settings">Settings</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/organisations">Organisations</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'AppNavigation',
    data() {
      return {
        name: '',
        address: 'Rosłońskiego, Przemyśl',
        organisation: '',
      };
    },
    mounted() {
      this.organisation = localStorage.organisation;

      this.axios.get('/api/orgs/' + this.organisation).then((payload) => {
        this.name = payload.data.name;
      });
    },
  };
</script>
