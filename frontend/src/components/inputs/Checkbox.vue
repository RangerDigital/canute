<template>
  <div class="rounded-md cursor-pointer w-7 h-7 border-gray-darker bg-gray-darker" :class="{ border: !modelValue }" @click="toggle()">
    <div v-if="modelValue" class="flex items-center justify-center w-full h-full rounded-md bg-red">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
