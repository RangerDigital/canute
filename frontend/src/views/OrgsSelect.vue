<template>
  <div class="flex ">
    <SideNavigation />
    <section class="ml-64 min-h-screen flex flex-grow flex-col justify-between"
      ><AppNavigation />

      <section class="p-5 flex flex-col flex-1 justify-between items-center">
        <div
          v-for="item in orgs"
          v-bind:key="item._id"
          class="widget w-full max-w-sm p-4 rounded-lg cursor-pointer bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
        >
          <h2 class="text-gray-700 text-lg title-font">{{ item.name }}</h2>
        </div>
      </section>

      <Footer />
    </section>
  </div>
</template>

<script>
  import AppNavigation from '@/components/AppNavigation.vue';
  import SideNavigation from '@/components/SideNavigation.vue';
  import Footer from '@/components/HomeFooter.vue';

  export default {
    name: 'OrgsSelect',
    components: {
      AppNavigation,
      SideNavigation,
      Footer,
    },
    data() {
      return {
        orgs: [],
      };
    },
    methods: {
      getOrgs() {
        this.axios.get('/api/orgs').then((payload) => {
          this.orgs = payload.data;
        });
      },
    },
    created() {
      this.getOrgs();
    },
  };
</script>

<style></style>
