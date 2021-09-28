<template>
  <div id="modals" class="absolute "></div>
  <router-view class="bg-black" />
</template>

<script>
  import ToastService from '@/modules/ToastService.js';

  export default {
    data() {
      return {
        refreshing: false,
      };
    },

    methods: {
      createInterceptors() {
        const that = this;

        this.axios.interceptors.response.use(
          function(response) {
            return response;
          },
          function(error) {
            if (error.response.status == 401) {
              localStorage.clear();
              that.$router.push('/auth');
            } else if (error.response.status == 403 || error.response.status == 500) {
              that.$router.push('/errors/500');
            }

            return Promise.reject(error);
          }
        );
      },

      showRefreshPrompt(workerInstance) {
        console.log('WorkerRefresh received!');

        ToastService.refresh({ timeout: 10000 }, workerInstance);
      },
    },

    mounted() {
      // Set active user locale.
      if (localStorage.locale) {
        this.$i18n.locale = localStorage.locale;
      } else {
        this.$i18n.locale = navigator.language.split('-')[0];
      }

      this.createInterceptors();

      // Get user information.
      if (localStorage.token) {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;

        this.axios.get('/api/users/me').then((payload) => {
          localStorage.email = payload.data.email;
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

      // Listen for Service Worker events.
      document.addEventListener('WorkerRefresh', this.showRefreshPrompt, { once: true });

      // Prevent multiple refreshes.
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('Detected controllerchange!');

          if (this.refreshing) return;
          this.refreshing = true;

          window.location.reload();
        });
      }
    },
  };
</script>
