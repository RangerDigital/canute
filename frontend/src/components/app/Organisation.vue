<template>
  <div
    class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 border-gray-darker hover:border-primary"
    @click="setOrganisation()"
  >
    <h2 class="py-2 text-white ">{{ organisation.name }}</h2>
    <p class="my-1 text-sm text-primary">{{ organisation.address }}</p>
    <p v-if="organisation.isAdmin" class="my-1 text-xs text-gray-dark">Admin</p>
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
