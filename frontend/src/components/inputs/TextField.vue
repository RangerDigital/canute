<template>
  <input
    v-model="value"
    v-bind:placeholder="placeholder"
    class="w-full lg:max-w-lg block border-transparent focus:outline-none bg-gray-darker font-base text-sm tracking-wide px-3 py-3 text-white rounded-md placeholder-gray-dark ring-red focus:ring-1 "
  />
</template>

<script>
  export default {
    props: {
      modelValue: String,
      placeholder: String,
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
