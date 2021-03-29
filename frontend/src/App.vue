<template>
  <router-view class="bg-black" />
</template>

<script>
  export default {
    mounted() {
      if (localStorage.locale) {
        this.$i18n.locale = localStorage.locale;
      }

      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
      }
    },
  };
</script>
