<template>
  <div class="w-full px-4 py-2 my-3 xl:px-6 xl:py-4 border rounded-lg border-gray-darker flex flex-col justify-between cursor-pointer hover:border-red" @click="setOrganisation()">
    <h2 class="py-2  text-white ">{{ organisation.name }}</h2>
    <p class="my-1 text-sm  text-red">{{ organisation.address }}</p>
    <p v-if="organisation.isAdmin" class="my-1 text-sm  text-gray-dark">Admin</p>
  </div>
</template>

<script>
  export default {
    name: 'Organisation',
    props: {
      organisation: Object,
    },
    methods: {
      setOrganisation() {
        localStorage.organisation = this.organisation._id;
        localStorage.organisationName = this.organisation.name;
        localStorage.organisationAddress = this.organisation.address;
        localStorage.organisationAdmin = this.organisation.isAdmin;

        this.$router.push('/dashboard');
      },
    },
  };
</script>
