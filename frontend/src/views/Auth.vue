<template>
  <div>
    <section v-if="showLogin" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation noLogin />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">{{ $t('auth.login.heading') }}</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ $t('auth.login.subheading') }}</h2>

        <p class="my-5 md:my-8 text-sm md:text-base  text-gray">{{ $t('auth.login.about') }}</p>
      </div>

      <div class="self-center">
        <div class="flex flex-col lg:flex-row justify-between items:center lg:items-end">
          <div>
            <label class="block my-2 text-sm font-base text-gray"
              ><svg class="inline h-6 mx-0.5 align-middle text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.2"
                  d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                />
              </svg>
              {{ $t('label.email') }}</label
            >
            <input
              type="email"
              v-model="userEmail"
              placeholder="... @gmail.com"
              class="w-full lg:w-80 block border-transparent focus:outline-none bg-gray-dark font-base text-sm tracking-wide px-3 py-3 text-white rounded-md placeholder-gray ring-red focus:ring-1 "
              autofocus
              autocomplete
            />
          </div>

          <button
            class="font-medium text-sm mx-5 my-6 lg:my-0 px-8 py-3 text-white bg-red hover:bg-red-dark rounded-md disabled:bg-gray-dark disabled:text-gray focus:outline-none"
            @click="requestsMagicEmail()"
            :disabled="!userEmail.length"
            >{{ $t('btn.continue') }}</button
          >
        </div>

        <p class="text-center md:my-7 text-sm font-base text-gray">{{ $t('auth.login.description') }}</p>
      </div>

      <div class=" h-16 2xl:h-48"></div>
    </section>

    <section v-if="showSuccess" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation noLogin />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">{{ $t('auth.success.heading') }}</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ $t('auth.success.subheading') }}</h2>

        <p class="my-5 md:my-8 text-sm md:text-base text-gray">{{ $t('auth.success.about') }}</p>
      </div>

      <div class=" h-16 lg:h-48"></div>
    </section>

    <section v-if="showFailure" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation noLogin />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">{{ $t('auth.failure.heading') }}</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">{{ $t('auth.failure.subheading') }}</h2>

        <p class="my-5 md:my-8 text-sm md:text-base text-gray">{{ $t('auth.failure.about') }}</p>
      </div>

      <div class=" h-16 lg:h-48"></div>
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
          .post('/api/auth/magic', { email: this.userEmail })
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
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken;
              localStorage.token = payload.data.authToken;

              this.axios
                .get('/api/users/me', {
                  headers: {
                    Authorization: 'Bearer ' + payload.data.authToken,
                  },
                })
                .then((payload) => {
                  localStorage.email = payload.data.email;
                })
                .then(() => {
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
