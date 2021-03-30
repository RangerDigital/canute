<template>
  <div class="w-full px-4 py-2 my-3 xl:px-6 xl:py-4 border rounded-lg border-gray-dark flex flex-col justify-between cursor-pointer hover:border-red">
    <h2 class="py-2  text-white ">{{ lock.name }}</h2>
    <p class="my-1 text-sm  text-red">Engage</p>
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
      };
    },
    methods: {
      engageLock() {},
    },
  };
</script>
