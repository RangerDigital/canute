<template>
  <section class="min-h-screen h-full flex flex-col justify-between">
    <HomeNavigation noLogin noNav />

    <!-- Horizontal Main Container -->
    <div class="self-center xl:self-auto w-full h-full flex-grow md:max-w-md xl:max-w-full flex flex-col xl:flex-row justify-start xl:justify-between xl:px-6 xl:py-6">
      <AppNavigation class="hidden xl:flex" />

      <!-- Vertical Container -->
      <div class="w-full p-4 xl:p-12  xl:mx-0 2xl:mx-20 flex flex-col justify-start">
        <div class="w-full flex flex-row justify-between items-center">
          <h1 class=" py-2 font-sans text-gray-dark text-sm">Add User</h1>

          <div>
            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-gray border border-gray-dark rounded-md focus:outline-none">Cancel</button>
            <button class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none">Save User</button>
          </div>
        </div>
        <div class="xl:block bg-gray-darker my-5 h-px w-full rounded-full"></div>

        <div class="flex flex-col xl:flex-row w-full justify-between">
          <div class="flex flex-col justify-start w-full">
            <div class="my-3">
              <label class="block my-2  text-sm font-base text-gray-dark"> E-Mail</label>
              <input
                type="email"
                v-model="userEmail"
                placeholder="... @gmail.com"
                class="w-full lg:max-w-lg block border-transparent focus:outline-none bg-gray-darker font-base text-sm tracking-wide px-3 py-3 text-white rounded-md placeholder-gray-dark ring-red focus:ring-1 "
                autofocus
                autocomplete
              />
            </div>

            <div class="my-3">
              <label class="block my-2  text-sm font-base text-gray-dark"> Annotation</label>
              <input
                v-model="userEmail"
                placeholder="3C 24/03"
                class="w-full lg:max-w-lg block border-transparent focus:outline-none bg-gray-darker font-base text-sm tracking-wide px-3 py-3 text-white rounded-md placeholder-gray-dark ring-red focus:ring-1 "
                autofocus
                autocomplete
              />
            </div>

            <div class="my-3 flex flex-row items-center ">
              <Checkbox v-model="isAdmin" class="mr-5" />

              <label class="block my-2 text-sm font-base text-gray"> Is Admin?</label>
            </div>
          </div>

          <!-- Divider -->
          <div class="bg-gray-darker my-5 mx-5 w-px h-full rounded-full"></div>

          <!-- Groups -->
          <div class="w-full">
            <h1 class="xl:mx-5 py-2 font-sans text-gray-dark text-sm">User Groups</h1>
            <div class=" w-full xl:grid-cols-2 2xl:grid-cols-3 lg:gap-6">
              <Group class="max-w-sm xl:mx-4" v-for="item in groups" :key="item._id" v-bind:group="item" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <HomeFooter />
  </section>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';
  import AppNavigation from '@/components/AppNavigation.vue';
  import HomeFooter from '@/components/HomeFooter.vue';

  import Group from '@/components/app/Group.vue';
  import Checkbox from '@/components/inputs/Checkbox.vue';

  export default {
    name: 'ViewUser',
    components: {
      HomeNavigation,
      HomeFooter,
      AppNavigation,
      Group,
      Checkbox,
    },
    data() {
      return {
        groups: [],
        organisation: null,
        isAdmin: true,
      };
    },
    methods: {
      getGroups() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/roles')
          .then((payload) => {
            this.groups = payload.data;
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
  };
</script>
