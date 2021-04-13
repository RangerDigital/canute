<template>
  <button
    v-if="solid"
    @click="$emit('click')"
    class="font-medium w-full xl:w-auto text-sm mx-1 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none"
  >
    <slot></slot>
  </button>

  <button
    v-if="ghost"
    @click="$emit('click')"
    class="font-medium w-full xl:w-auto text-sm mx-1 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-gray border border-gray-darker rounded-md focus:outline-none"
  >
    <slot></slot>
  </button>

  <button v-if="tiny" @click="$emit('click')" class="font-medium text-sm ml-2 lg:mx-5  py-3 lg:my-0 px-3 xl:px-9 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    emits: ['click'],
    props: {
      ghost: Boolean,
      solid: Boolean,
      tiny: Boolean,
    },
  };
</script>
