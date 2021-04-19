<template>
  <div
    class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 "
    :class="{ 'border-primary': isActive, 'border-gray-darker': !isActive }"
  >
    <h2 class="py-2 text-white ">{{ group.name }}</h2>
    <p class="my-1 text-sm text-primary">{{ group.permissions.length }} {{ $t('groups.permissions') }} </p>
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
