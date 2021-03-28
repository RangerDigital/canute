<template>
  <router-view class="bg-black" />
</template>

<script>
  export default {
    mounted() {
      if (localStorage.locale) {
        this.$i18n.locale = localStorage.locale;
      }
    },
  };
</script>
