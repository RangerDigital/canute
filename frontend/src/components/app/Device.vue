<template>
  <div class="w-full px-4 py-2 my-3 xl:px-6 xl:py-4 border rounded-lg border-gray-darker flex flex-col justify-between cursor-pointer hover:border-red">
    <h2 class="py-2  text-white ">{{ device.name }}</h2>
    <p class="my-1 text-sm  text-red">{{ device.shadows.length }} Shadows</p>
    <p class="my-1 text-sm truncate text-gray-dark">Online </p>
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
