<template>
  <input
    v-if="!readonly"
    v-model="value"
    v-bind:placeholder="placeholder"
    class="block w-full px-3 py-3 text-sm tracking-wide text-white border-transparent rounded-md lg:max-w-lg focus:outline-none bg-gray-darker font-base placeholder-gray-dark ring-red focus:ring-1 "
  />

  <div v-if="readonly" class="flex flex-row">
    <div class="w-px rounded-full bg-gray-darker"></div>
    <p class="mx-3 my-3 text-sm tracking-wide text-white font-base">{{ value }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: String,
      placeholder: String,
      readonly: Boolean,
    },
    data() {
      return {
        value: '',
      };
    },
    emits: ['update:modelValue'],
    watch: {
      value() {
        this.$emit('update:modelValue', this.value);
      },
      modelValue() {
        this.value = this.modelValue;
      },
    },
    mounted() {
      this.value = this.modelValue;
    },
  };
</script>
