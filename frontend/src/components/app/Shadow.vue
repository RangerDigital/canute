<template>
  <div
    class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 "
    :class="{ 'border-red': isActive, 'border-gray-darker': !isActive }"
  >
    <h2 class="py-2 text-white ">{{ shadow.name }}</h2>
    <p class="my-1 text-sm capitalize text-red">{{ shadow.class }}</p>
    <p class="my-1 text-sm truncate text-gray-dark">{{ shadow.topic }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Shadow',
    props: {
      shadow: Object,
      isActive: Boolean,
    },
  };
</script>
