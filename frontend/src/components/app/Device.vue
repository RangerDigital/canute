<template>
  <div class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 border-gray-darker hover:border-primary">
    <h2 class="py-2 text-white truncate font-heading">{{ device.name }}</h2>
    <p class="my-1 text-sm truncate text-primary">{{ device.online ? 'Online' : 'Offline' }}</p>
    <p class="my-1 text-xs truncate xl:text-sm text-gray-dark">{{ device.shadows.length }} Shadows</p>
  </div>
</template>

<script>
  export default {
    name: 'Device',
    props: {
      device: Object,
    },
  };
</script>
