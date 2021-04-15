<template>
  <button
    v-if="solid"
    @click="$emit('click')"
    v-bind:disabled="disabled"
    class="w-full px-3 py-3 mx-1 text-sm font-medium text-white rounded-md whitespace-nowrap xl:w-auto xl:px-9 bg-red hover:bg-red-dark focus:outline-none disabled:bg-gray-darker disabled:text-gray "
  >
    <slot></slot>
  </button>

  <button
    v-if="ghost"
    @click="$emit('click')"
    class="w-full px-3 py-3 mx-1 text-sm font-medium border rounded-md whitespace-nowrap xl:w-auto l xl:px-9 text-gray border-gray-darker focus:outline-none"
  >
    <slot></slot>
  </button>

  <button
    v-if="tiny"
    @click="$emit('click')"
    v-bind:disabled="disabled"
    class="px-3 py-3 ml-2 text-sm font-medium text-white rounded-md whitespace-nowrap xl:px-9 bg-red hover:bg-red-dark focus:outline-none disabled:bg-gray-darker disabled:text-gray "
  >
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
      disabled: Boolean,
    },
  };
</script>
