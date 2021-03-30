<template
  ><!-- Left Bar-->
  <nav class="flex flex-col">
    <!-- Organisation -->
    <div class="my-2 xl:my-5 2xl:my-12 flex flex-row">
      <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

      <div class="flex flex-col justify-around">
        <h2 class="py-2 font-sans font-semibold text-white text-xl"
          >Hello! <span class="text-red">{{ name }}</span></h2
        >
        <p class="my-2 text-sm font-medium text-gray">{{ address }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="hidden my-2 xl:my-5 2xl:my-12 xl:flex flex-row">
      <div class="bg-gray-dark w-px mr-5 rounded-full"></div>

      <div class="flex flex-col justify-around">
        <div class="my-5 2xl:my-12 flex flex-col justify-around">
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Things</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Dashboard</router-link>
        </div>
        <div class="my-5 2xl:my-12 flex flex-col justify-around">
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Profile</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Settings</router-link>
          <router-link class="my-2 text-sm font-medium text-gray hover:text-gray-light" to="/auth">Organisations</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'AppNavigation',
    props: {
      organisation: String,
    },
    data() {
      return {
        name: '',
        address: 'Rosłońskiego, Przemyśl',
      };
    },
    watch: {
      organisation: {
        immediate: true,
        // TO DO: Add address getter
        handler(organisation) {
          console.log('Getting name from', organisation);

          this.axios.get('/api/orgs/' + organisation).then((payload) => {
            this.name = payload.data.name;
          });
        },
      },
    },
  };
</script>
