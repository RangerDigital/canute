<template>
  <div>
    <section v-if="showLogin" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation noLogin />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Create account. Or Sign in. </h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">It’s the same!</h2>

        <p class="my-5 md:my-8 text-sm md:text-base font-medium text-gray">No more passwords to remember!</p>
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
              Your Email</label
            >
            <input
              type="email"
              v-model="userEmail"
              placeholder="hello@gmail.com"
              class="w-full lg:w-80 block border-transparent focus:outline-none bg-gray-dark font-base tracking-wide px-3 py-3 text-gray rounded-md placeholder-gray ring-red focus:ring-1 "
              autofocus
              autocomplete
            />
          </div>

          <button class="font-semibold mx-5 my-6 lg:my-0 px-12 py-3 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none" @click="requestsMagicEmail()"
            >Continue</button
          >
        </div>

        <p class="text-center md:my-7 text-sm font-base text-gray">You will receive a magic login link via Email.</p>
      </div>

      <div class=" h-16 lg:h-48"></div>
    </section>

    <section v-if="showSuccess" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation noLogin />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Success 🎉 Magic E-mail sent!</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">Check inbox to continue.</h2>

        <p class="my-5 md:my-8 text-sm md:text-base font-medium text-gray">You can safely close this page now.</p>
      </div>

      <div class=" h-16 lg:h-48"></div>
    </section>

    <section v-if="showFailure" class="min-h-screen flex flex-col justify-between">
      <HomeNavigation />

      <div class=" self-center text-center">
        <h1 class="my-1 md:my-5 font-semibold text-white text-2xl md:text-4xl 2xl:text-5xl">Sorry, Failed to sign in!</h1>
        <h2 class="my-1 md:my-5 font-semibold text-red text-2xl md:text-4xl 2xl:text-5xl ">Please try again.</h2>

        <p class="my-5 md:my-8 text-sm md:text-base font-medium text-gray">This magic link is no longer active.</p>
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
              localStorage.token = payload.data.authToken;
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.authToken;

              console.log('Logged in!');
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
