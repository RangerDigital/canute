<template>
  <div class="h-8 w-8 border-gray-dark bg-gray-darker rounded-lg cursor-pointer" :class="{ border: !modelValue }" @click="toggle()">
    <div v-if="modelValue" class="w-full h-full flex items-center  justify-center bg-red rounded-lg">
      <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    methods: {
      toggle() {
        if (this.modelValue == true) {
          this.$emit('update:modelValue', false);
        } else {
          this.$emit('update:modelValue', true);
        }
      },
    },
  };
</script>
