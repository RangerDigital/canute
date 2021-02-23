<template>
  <header>
    <div class="flex flex-row items-center justify-between p-4 md:p-5 border-b">
      <img src="../assets/LogoFull.svg" class="h-9 mx-2 md:h-11 md:mx-8 cursor-pointer" @click="$router.push('/').catch((err) => {})" />

      <nav class="hidden md:flex items-center justify-center ml-auto mr-auto">
        <router-link class="mr-8 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">{{ $t('nav.services') }}</router-link>
        <router-link class="mr-8 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">{{ $t('nav.contact') }}</router-link>
        <router-link class="mr-8 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">FAQ</router-link>
      </nav>

      <section class="hidden md:block">
        <button class=" mr-20 text-sm font-semibold text-gray-600 hover:text-gray-800 focus:outline-none " @click="toggleLanguage()">
          <svg class="inline h-6 mx-0.5 align-middle " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ $t('nav.language') }}
        </button>

        <button class=" px-8 py-2 mr-8 font-semibold text-white bg-primary rounded-3xl focus:ring focus:outline-none" @click="$router.push('auth')">{{ $t('nav.signin') }} </button>
      </section>

      <router-link class="md:hidden mr-1 border p-1 rounded-lg" to="/auth">
        <svg class="h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </router-link>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Navigation',
    methods: {
      toggleLanguage() {
        if (this.$i18n.locale == 'pl') {
          this.$i18n.locale = 'en';
        } else {
          this.$i18n.locale = 'pl';
        }
      },
    },
  };
</script>
