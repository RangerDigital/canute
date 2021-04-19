<template>
  <header class="static flex flex-row items-center justify-between p-5 md:px-20 md:py-6">
    <h1 class="py-2 font-sans text-base font-semibold cursor-pointer text-primary md:text-xl" @click="$router.push('/').catch((err) => {})"
      >Canute <span class="text-white">OS</span></h1
    >

    <nav v-if="!noNav" class="items-center justify-center hidden xl:flex">
      <router-link class="text-sm mx-7 text-gray hover:text-gray-light" to="/auth">{{ $t('nav.services') }}</router-link>
      <router-link class="text-sm mx-7 text-gray hover:text-gray-light" to="/auth">FAQ</router-link>
      <router-link class="text-sm mx-7 text-gray hover:text-gray-light" to="/auth">{{ $t('nav.contact') }}</router-link>
    </nav>

    <!-- Language Toggler / Desktop Only -->
    <section class="flex-row hidden lg:flex">
      <button class="mx-8 text-sm text-gray hover:text-gray-light focus:outline-none " @click="toggleLanguage()">
        <svg class="inline h-6 mx-0.5 align-middle text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        class=" text-sm px-8 py-2.5 text-white bg-primary hover:bg-primary-dark rounded-md focus:outline-none tracking-wide"
        @click="$router.push('auth')"
        >{{ $t('btn.login') }}
      </button>

      <p v-if="userEmail" class="text-sm cursor-pointer mx-7 text-gray" @click="$router.push('/dashboard').catch((err) => {})"
        >{{ $t('nav.logged') }} <span class="text-primary">{{ userEmail }}</span></p
      >
    </section>

    <!-- Hamburger Menu / Mobile Only -->
    <router-link v-if="userEmail && !showBackHamburger" class="text-primary p-1.5  xl:hidden" to="/navigation">
      <svg class="h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </router-link>

    <a v-if="userEmail && showBackHamburger" class="text-primary p-1.5  xl:hidden" @click="$router.go(-1)">
      <svg class="h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </a>

    <router-link v-if="!userEmail" class="text-primary p-1.5  xl:hidden" to="/auth">
      <svg class="h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M9 5l7 7-7 7" />
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
      showBackHamburger: Boolean,
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
