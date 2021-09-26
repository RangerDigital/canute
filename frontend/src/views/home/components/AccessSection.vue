<template>
  <section ref="access" id="anime-access" class="flex flex-col p-5 my-5 2xl:my-14 md:px-8 xl:self-center xl:w-11/12 2xl:w-9/12">
    <div class="transform -translate-x-2 md:-translate-x-3 -rotate-3">
      <h3 id="anime-access" class="my-5 md:my-10 text-1xl md:text-xl font-marker text-primary 2xl:text-3xl 3xl:text-4xl">🔐 Canute Access</h3>
    </div>

    <h2 id="anime-access" class="my-1 mb-5 text-2xl font-semibold text-white md:my-5 font-heading md:text-3xl 2xl:text-4xl 3xl:text-5xl">Kontrola Dostępu</h2>
    <p class="my-2 text-sm xl:text-base text-gray max-w-prose"
      >Moduł Canute Access oferuje użytkownikom wygodniejszy sposób otwierania przejść oraz ułatwia administratorom budynku zarządzanie dostępem.
    </p>

    <p id="anime-access" class="my-2 text-sm prose-sm prose xl:text-base text-gray"
      >Urządzenia Canute Access działają na każdych drzwiach z istniejącym elektrozaczepem, ryglem lub elektromagnesem.</p
    >
  </section>
</template>

<script>
  export default {
    name: 'AccessSection',
    data() {
      return {
        isAnimationDone: false,
      };
    },

    mounted() {
      const animation = this.$anime({
        targets: '#anime-access',
        opacity: ['0%', '100%'],

        translateY: ['-10%', '0%'],
        delay: 500,
        easing: 'easeOutQuad',
        autoplay: false,
      });

      // Reveal Animations
      const observer = new IntersectionObserver(
        (entry) => {
          if (entry[0].intersectionRatio > 0.8 && !this.isAnimationEnded) {
            animation.play();
            this.isAnimationEnded = true;
          }
        },
        { threshold: 0.8 }
      );

      observer.observe(this.$refs.access);
    },
  };
</script>
