<template>
  <header>
    <div class="hidden md:flex flex-row items-center p-4 mx-auto border-b">
      <a class="pr-2 lg:pr-8 lg:px-6 focus:outline-none cursor-pointer">
        <h2 class="font-semibold tracking-tighter text-gray-600 md:text-xl md:ml-8" @click="$router.push('/').catch((err) => {})">
          Canute Access
        </h2>
      </a>

      <nav class="flex items-center justify-center text-base md:ml-auto md:mr-auto">
        <router-link class="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">{{ $t('nav.about') }}</router-link>
        <router-link class="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">{{ $t('nav.contact') }}</router-link>
        <router-link class="mr-5 text-sm font-semibold text-gray-600 hover:text-gray-800" to="/auth">FAQ</router-link>
      </nav>

      <div>
        <button class="mr-20 text-sm font-semibold text-gray-600 hover:text-gray-800 focus:outline-none " @click="toggleLanguage()">
          <svg class="inline h-6 mx-0.5 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ $t('nav.language') }}
        </button>

        <button
          class="items-center px-8 py-2 ml-auto mr-8 font-semibold text-white transition duration-500 ease-in-out transform bg-black rounded-lg hover:bg-blueGray-900 focus:ring focus:outline-none"
          @click="$router.push('auth')"
          >{{ $t('nav.signin') }}
        </button>
      </div>
    </div>

    <div class="flex md:hidden items-center justify-between p-4 mx-auto border-b">
      <a href="./" class="pr-2 lg:pr-8 lg:px-6 focus:outline-none">
        <h2 class="font-semibold tracking-tighter text-gray-600 md:text-xl md:ml-8">
          Canute Access
        </h2>
      </a>

      <router-link to="/auth"
        ><svg class="text-gray-600 inline h-6 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg
      ></router-link>
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
