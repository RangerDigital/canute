<template>
  <div>
    <section v-if="showLogin" class="flex flex-col justify-between min-h-screen">
      <HomeNavigation noLogin />

      <div class="self-center text-center ">
        <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('auth.login.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold md:my-5 text-primary md:text-4xl 2xl:text-5xl ">{{ $t('auth.login.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('auth.login.about') }}</p>
      </div>

      <div class="self-center mx-4">
        <div class="flex flex-col justify-between lg:flex-row items:center lg:items-end">
          <div>
            <label class="block my-2 text-sm font-base text-gray"> {{ $t('label.email') }}</label>
            <input
              type="email"
              v-model="userEmail"
              v-on:keyup.enter="requestsMagicEmail()"
              placeholder="... @gmail.com"
              class="block w-full px-3 py-3 text-sm tracking-wide text-white border-transparent rounded-md lg:w-80 focus:outline-none bg-gray-darker font-base placeholder-gray-dark ring-red focus:ring-1 "
              autofocus
              autocomplete
            />
          </div>

          <button
            class="px-8 py-3 mx-5 my-6 text-sm font-medium text-white rounded-md lg:my-0 bg-primary hover:bg-primary-dark disabled:bg-gray-darker disabled:text-gray focus:outline-none"
            @click="requestsMagicEmail()"
            :disabled="!userEmail.length"
            >{{ $t('btn.continue') }}</button
          >
        </div>

        <p class="text-sm text-center md:my-7 font-base text-gray">{{ $t('auth.login.description') }}</p>
      </div>

      <div class="h-16 2xl:h-48"></div>
    </section>

    <section v-if="showSuccess" class="flex flex-col justify-between min-h-screen">
      <HomeNavigation noLogin />

      <div class="self-center text-center ">
        <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('auth.success.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold md:my-5 text-primary md:text-4xl 2xl:text-5xl ">{{ $t('auth.success.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('auth.success.about') }}</p>
      </div>

      <div class="h-16 lg:h-48"></div>
    </section>

    <section v-if="showFailure" class="flex flex-col justify-between min-h-screen">
      <HomeNavigation noLogin />

      <div class="self-center text-center ">
        <h1 class="my-1 text-2xl font-semibold text-white md:my-5 md:text-4xl 2xl:text-5xl">{{ $t('auth.failure.heading') }}</h1>
        <h2 class="my-1 text-2xl font-semibold md:my-5 text-primary md:text-4xl 2xl:text-5xl ">{{ $t('auth.failure.subheading') }}</h2>

        <p class="my-5 text-sm md:my-8 md:text-base text-gray">{{ $t('auth.failure.about') }}</p>
      </div>

      <div class="h-16 lg:h-48"></div>
    </section>
  </div>
</template>

<script>
  import HomeNavigation from '@/components/HomeNavigation.vue';

  export default {
    name: 'Auth',
    components: {
      HomeNavigation,
    },
    data() {
      return {
        showLogin: true,
        showSuccess: false,
        showFailure: false,

        userEmail: '',
        magicToken: null,
      };
    },

    methods: {
      requestsMagicEmail() {
        if (!this.userEmail) {
          return;
        }

        this.axios
          .post('/api/auth/magic', { email: this.userEmail, locale: this.$i18n.locale })
          .then(() => {
            this.showLogin = false;
            this.showSuccess = true;
          })
          .catch(() => {
            this.showLogin = false;
            this.showFailure = true;
          });
      },

      login() {
        if (this.magicToken) {
          this.axios
            .post('/api/auth/magic/' + this.magicToken)
            .then((payload) => {
              localStorage.token = payload.data.authToken;
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.data.authToken;

              this.axios
                .get('/api/users/me', {
                  headers: {
                    Authorization: 'Bearer ' + payload.data.authToken,
                  },
                })
                .then((payload) => {
                  localStorage.email = payload.data.email;

                  this.$router.push('/dashboard');
                });
            })
            .catch(() => {
              this.showLogin = false;
              this.showFailure = true;
            });
        }
      },
    },
    mounted() {
      this.magicToken = this.$route.params.magicToken;
      this.login();
    },
    watch: {
      $route() {
        this.magicToken = this.$route.params.magicToken;
        this.login();
      },
    },
  };
</script>
