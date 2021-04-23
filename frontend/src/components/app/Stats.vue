<template>
  <div class="flex flex-row items-center w-2/12 max-w-xs p-4 mr-5 cursor-pointer">
    <div class="flex items-center justify-center mr-5 rounded-md w-14 h-14 bg-primary">
      <slot></slot>
    </div>

    <div>
      <p class="text-2xl text-white">{{ value }}</p>
      <p class="mt-1.5 text-sm text-primary">{{ subheading }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stats',
    props: {
      value: Number,
      subheading: String,
    },
  };
</script>
