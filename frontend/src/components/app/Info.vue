<template>
  <div class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg xl:px-6 xl:py-4 border-gray-darker">
    <p class="my-1 text-sm truncate text-primary">{{ title }}</p>
    <p class="my-1 text-xs truncate xl:text-sm text-gray"><slot></slot> </p>
  </div>
</template>

<script>
  export default {
    name: 'Info',
    props: {
      title: String,
    },
  };
</script>
