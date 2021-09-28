<template
  ><section class="hidden my-8 md:block md:my-14 3xl:mt-36">
    <div id="anime-item" class="flex flex-col justify-center w-full md:flex-row ">
      <p class="text-xs xl:text-sm text-gray-dark">Canute OS składa się z modułów, które rozwiązują określone problemy mieszkańców.</p>
    </div>

    <div class="flex flex-col justify-center w-full md:flex-row ">
      <div
        id="anime-item"
        class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52 "
        @click="$router.push('/dashboard')"
      >
        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>

        <p class="my-3 mt-2 text-sm text-white font-heading">Canute Access</p>

        <p class="text-xs text-gray">Kontrola Dostępu</p>
      </div>

      <div
        id="anime-item"
        class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52 "
        @click="$router.push('/')"
      >
        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>

        <p class="my-3 mt-2 text-sm text-white font-heading">Canute Control</p>

        <p class="text-xs text-gray">Monitorowanie Budynku</p>
      </div>

      <div
        id="anime-item"
        class="flex flex-col items-center p-4 m-3 border rounded shadow-sm cursor-pointer border-gray-darker hover:border-primary md:w-52"
        @click="$router.push('/auth')"
      >
        <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
        <p class="my-3 mt-2 text-sm text-white font-heading">Canute Management</p>

        <p class="text-xs text-gray">Zarządzanie Mieszkańcami</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ModulesGrid',
  };
</script>
