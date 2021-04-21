<template>
  <teleport to="#modals">
    <div
      class="absolute flex flex-col items-center justify-center w-screen h-screen p-2 overflow-hidden backdrop-saturate-150 backdrop-filter backdrop-blur-sm"
      @click.self="$emit('hide')"
    >
      <section class="w-full p-3 rounded-md shadow-lg xl:p-9 backdrop-filter backdrop-blur-lg md:max-w-lg lg:max-w-xl xl:max-w-3xl bg-gray-darker">
        <slot></slot>
      </section>
    </div>
  </teleport>
</template>
