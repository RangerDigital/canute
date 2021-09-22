<template>
  <button @click="$emit('click')" v-bind:disabled="disabled" v-bind:class="[solid ? 'btn-solid' : '', ghost ? 'btn-ghost' : '', tiny ? 'btn-tiny' : '', icon ? 'btn-icon' : '']">
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
      icon: Boolean,
      disabled: Boolean,
    },
  };
</script>

<style scoped>
  .btn-solid {
    @apply w-full px-3 py-3 mx-1 text-sm font-medium text-white rounded-md whitespace-nowrap xl:w-auto xl:px-9 bg-primary hover:bg-primary-dark focus:outline-none disabled:bg-gray-darker disabled:text-gray-dark;
  }

  .btn-ghost {
    @apply w-full px-3 py-3 mx-1 text-sm font-medium border rounded-md whitespace-nowrap xl:w-auto xl:px-9 text-gray border-gray-darker focus:outline-none;
  }

  .btn-tiny {
    @apply px-3 py-3 ml-2 text-sm font-medium text-white rounded-md whitespace-nowrap xl:px-9 bg-primary hover:bg-primary-dark focus:outline-none disabled:bg-gray-darker disabled:text-gray-dark;
  }

  .btn-icon {
    @apply px-3 py-3 ml-2 text-sm font-medium text-white rounded-md whitespace-nowrap bg-primary hover:bg-primary-dark focus:outline-none disabled:bg-gray-darker disabled:text-gray-dark;
  }
</style>
