<template>
  <div class="flex flex-row justify-start max-w-xs bg-gray-darker">
    <svg class="flex-shrink-0 w-6 h-6 mr-3 animate-pulse text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    </svg>

    <div>
      <h2 class="mb-1 text-sm text-white font-heading">Update Available</h2>

      <p class="mt-1 text-xs text-gray">A new updated version is available!</p>
      <button @click="refreshCache" class="py-3 mt-1 text-xs font-semibold text-primary opacity-80 hover:opacity-95">Refresh Site</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RefreshToast',
    props: { workerInstance: Object },

    methods: {
      refreshCache() {
        if (this.workerInstance) {
          this.workerInstance.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      },
    },
  };
</script>
