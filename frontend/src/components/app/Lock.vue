<template>
  <div class="flex flex-col justify-between w-full px-4 py-2 my-3 border rounded-lg cursor-pointer xl:px-6 xl:py-4 border-gray-darker hover:border-primary" @click="engageLock()">
    <h2 class="py-2 text-white truncate font-heading" v-bind:class="{ 'text-gray-dark': !lock.online }">{{ lock.name }}</h2>
    <p v-if="lock.online && !isEngaged" class="my-1 text-sm truncate text-primary">{{ $t('btn.open') }}</p>
    <p v-if="lock.online && isEngaged" class="my-1 text-sm truncate animate-pulse text-primary">{{ $t('btn.inprogress') }}</p>
    <p v-if="!lock.online" class="my-1 text-sm truncate animate-pulse text-primary">{{ $t('btn.offline') }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Lock',
    props: {
      lock: Object,
    },
    data() {
      return {
        isEngaged: false,
        organisation: null,
        timeout: null,
      };
    },
    methods: {
      engageLock() {
        if (!this.lock.online) {
          navigator.vibrate([50, 50, 50, 50, 50, 50]);
          return;
        }

        this.isEngaged = true;
        navigator.vibrate(50);
        clearTimeout(this.timeout);

        this.axios.post('/api/orgs/' + this.organisation + '/locks/' + this.lock._id);

        this.timeout = setTimeout(() => {
          this.isEngaged = false;
        }, 5000);
      },
    },
    mounted() {
      this.organisation = localStorage.organisation;
    },
  };
</script>
