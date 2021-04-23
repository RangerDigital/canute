<template>
  <div class="flex flex-row w-full my-2 cursor-pointer xl:my-5 2xl:my-12" @click="$router.push('/organisations')">
    <div class="w-px mr-5 rounded-full xl:mx-0 xl:mr-5 bg-gray-darker"></div>

    <div class="flex flex-col justify-around">
      <h2 class="py-2 text-base font-medium text-white font-heading">{{ organisationName }}</h2>
      <p class="my-1 text-sm text-primary">{{ organisationAddress }}</p>
      <p v-if="organisationAdmin" class="my-2 text-sm text-gray-dark">Admin</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        organisationName: '',
        organisationAddress: '',
        organisationAdmin: false,
      };
    },
    mounted() {
      this.organisationName = localStorage.organisationName;
      this.organisationAddress = localStorage.organisationAddress;

      if (localStorage.organisationAdmin === 'true') {
        this.organisationAdmin = true;
      }
    },
  };
</script>
