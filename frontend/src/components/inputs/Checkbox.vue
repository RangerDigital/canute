<template>
  <div class="w-8 h-8 rounded-lg cursor-pointer border-red bg-gray-darker" :class="{ border: !modelValue }" @click="toggle()">
    <div v-if="modelValue" class="flex items-center justify-center w-full h-full rounded-lg bg-red">
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
