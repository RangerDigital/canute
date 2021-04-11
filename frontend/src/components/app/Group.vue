<template>
  <div
    class="w-full px-4 py-2 my-3 xl:px-6 xl:py-4 border rounded-lg flex flex-col justify-between cursor-pointer "
    :class="{ 'border-red': isActive, 'border-gray-darker': !isActive }"
  >
    <h2 class="py-2  text-white ">{{ group.name }}</h2>
    <p class="my-1 text-sm  text-red">{{ group.users.length }} Users / {{ group.permissions.length }} Permissions</p>
  </div>
</template>

<script>
  export default {
    name: 'Group',
    props: {
      group: Object,
      isActive: Boolean,
    },
  };
</script>
