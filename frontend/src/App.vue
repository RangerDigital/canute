<template>
  <router-view class="bg-black" />
</template>

<script>
  export default {
    mounted() {
      // Set active user locale.
      if (localStorage.locale) {
        this.$i18n.locale = localStorage.locale;
      } else {
        this.$i18n.locale = navigator.language.split('-')[0];
      }

      // Get user information.
      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

        this.axios
          .get('/api/users/me')
          .then((payload) => {
            localStorage.email = payload.data.email;
          })
          .catch(() => {
            localStorage.clear();
          });
      }

      // Get active organisation.
      if (localStorage.organisation) {
        this.axios
          .get('/api/orgs/' + localStorage.organisation)
          .then((payload) => {
            localStorage.organisationName = payload.data.name;
            localStorage.organisationAddress = payload.data.address;
          })
          .catch(() => {
            localStorage.removeItem('organisation');
            localStorage.removeItem('organisationName');
            localStorage.removeItem('organisationAddress');
          });
      }
    },
  };
</script>
