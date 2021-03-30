<template>
  <header class="static flex flex-row items-center justify-between p-5 md:px-20 md:py-6">
    <h1 class="py-2 font-sans font-semibold text-red text-base md:text-xl cursor-pointer" @click="$router.push('/').catch((err) => {})"
      >Canute <span class="text-white">OS</span></h1
    >

    <nav v-if="!noNav" class="hidden md:flex items-center justify-center">
      <router-link class="mx-7 text-sm font-medium text-gray hover:text-gray-light" to="/auth">{{ $t('nav.services') }}</router-link>
      <router-link class="mx-7 text-sm font-medium text-gray hover:text-gray-light" to="/auth">FAQ</router-link>
      <router-link class="mx-7 text-sm font-medium text-gray hover:text-gray-light" to="/auth">{{ $t('nav.contact') }}</router-link>
    </nav>

    <!-- Language Toggler / Desktop Only -->
    <section class="hidden lg:flex flex-row">
      <button class="mx-8 text-sm font-medium text-gray hover:text-gray-light focus:outline-none " @click="toggleLanguage()">
        <svg class="inline h-6 mx-0.5 align-middle text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {{ $t('btn.locale') }}
      </button>

      <button
        v-if="!noLogin && !userEmail"
        class="font-semibold px-10 py-2 text-white bg-red hover:bg-red-dark rounded-md focus:outline-none tracking-wide"
        @click="$router.push('auth')"
        >{{ $t('btn.login') }}
      </button>

      <p v-if="userEmail" class="mx-7 text-sm font-medium text-gray">{{ $t('nav.logged') }} <span class="text-red">kuba07071999@gmail.com</span></p>
    </section>

    <!-- Hamburger Menu / Mobile Only -->
    <router-link class="text-red border border-gray-dark p-1.5 rounded-md md:hidden" to="/home-navigation">
      <svg class="h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </router-link>
  </header>
</template>
<script>
  export default {
    name: 'HomeNavigation',
    props: {
      noLogin: Boolean,
      noNav: Boolean,
      showUser: Boolean,
    },
    data() {
      return {
        userEmail: '',
      };
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
    mounted() {
      if (localStorage.email) {
        this.userEmail = localStorage.email;
      }
    },
  };
</script>
