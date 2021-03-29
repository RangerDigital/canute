<template> </template>
<script>
  export default {
    name: 'AppNavigation',
    props: {
      organisation: Object,
    },
    methods: {
      toggleLanguage() {
        if (this.$i18n.locale == 'pl') {
          this.$i18n.locale = 'en';
          localStorage.locale = 'en';
        } else {
          this.$i18n.locale = 'pl';
          localStorage.locale = 'pl';
        }
      },
    },
  };
</script>
