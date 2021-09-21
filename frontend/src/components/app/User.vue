<template>
  <div class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 border-gray-darker hover:border-primary">
    <h2 class="py-2 text-white truncate font-heading">{{ user.email }}</h2>
    <p class="my-1 text-sm truncate text-primary ">{{ user.annotation }}</p>
    <p class="my-1 text-xs truncate xl:text-sm text-gray-dark">
      <span class="mr-3 xl:mr-4" v-if="user.isAdmin">Admin</span>
      <span class="mr-3 xl:mr-4" v-for="item in user.roles" :key="item._id">{{ item.name }}</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'User',
    props: {
      user: Object,
    },
  };
</script>
