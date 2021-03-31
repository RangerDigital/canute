<template>
  <router-view class="bg-black" />
</template>

<script>
  export default {
    mounted() {
      if (localStorage.locale) {
        this.$i18n.locale = localStorage.locale;
      }

      // Get user information.
      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

        this.axios.get('/api/users/me').then((payload) => {
          localStorage.email = payload.data.email;
        });
      }

      // Get active organisation.
      if (localStorage.organisation) {
        this.axios.get('/api/orgs/' + localStorage.organisation).then((payload) => {
          localStorage.organisationName = payload.data.name;
          localStorage.organisationAddress = payload.data.address;
        });
      }
    },
  };
</script>
