<template>
  <div class="flex flex-row justify-start max-w-xs bg-gray-darker">
    <svg class="flex-shrink-0 w-6 h-6 mr-3 animate-pulse text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.6"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>

    <div>
      <h2 class="mb-1 text-sm text-white font-heading">Hey!?</h2>

      <p class="mt-1 text-xs text-gray">An new updated verion is available</p>
      <button @click="refreshCache" class="mt-1 text-xs font-semibold text-gray">Refresh Site</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RefreshToast',
    props: { workerInstance: Object },

    mounted() {
      console.log('Refresh toast shown!');
    },

    methods: {
      refreshCache() {
        if (!this.workerInstance || !this.workerInstance.waiting) return;
        this.workerInstance.waiting.postMessage({ type: 'SKIP_WAITING' });

        console.log('Refreshed!');
      },
    },
  };
</script>
