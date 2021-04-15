<template>
  <div
    class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 "
    :class="{ 'border-red': isActive, 'border-gray-darker': !isActive }"
  >
    <h2 class="py-2 text-white ">{{ group.name }}</h2>
    <div class="flex flex-row justify-between">
      <p class="my-1 text-sm text-red">{{ group.permissions.length }} {{ $t('groups.permissions') }} </p>
      <p class="my-1 text-sm text-gray-dark">---> </p>
      <p class="my-1 text-sm text-gray-dark">{{ group.users.length }} {{ $t('groups.users') }}</p>
    </div>
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
