<template>
  <div class="w-full px-4 py-2 my-3 xl:px-6 xl:py-4 border rounded-lg border-gray-darker flex flex-col justify-between cursor-pointer hover:border-red" @click="viewUser()">
    <h2 class="py-2  text-white ">{{ user.user.email }}</h2>
    <p class="my-1 text-sm  text-red">{{ user.annotation }}</p>
    <p class="my-1 text-sm truncate text-gray-dark">
      <span class="mr-4" v-if="user.isAdmin">Admin</span>
      <span class="mr-4" v-for="item in user.roles" :key="item._id">{{ item.name }}</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'User',
    props: {
      user: Object,
    },
    methods: {
      viewUser() {
        this.$router.push('/users/' + this.user._id);
      },
    },
  };
</script>
