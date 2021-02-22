<template>
  <section class="h-screen flex flex-col justify-between">
    <Navigation />

    <section class="flex flex-col items-center md:flex-row">
      <div class="container mx-auto">
        <div class="flex justify-center px-2 py-6 ">
          <div class="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
            <div class="relative hidden w-full h-auto bg-white bg-cover border-r rounded-l-lg lg:block lg:w-6/12">
              <div class="relative z-10 m-12 text-left ">
                <h2 class="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-black sm:text-3xl title-font">
                  Sign In
                </h2>

                <div class="w-full mt-16 mb-8 text-base leading-relaxed text-gray-900 sm:md:w-3/3 lg:text-1xl ">
                  Hello World
                </div>
              </div>
            </div>
            <div class="w-full px-8 py-24 bg-white border-gray-100 rounded-lg lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div class="relative z-10 text-left ">
                <form class="mt-6" action="#" method="POST">
                  <div class="mt-4">
                    <label class="block text-base font-medium leading-relaxed text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Your Email "
                      class="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform bg-gray-100 border-transparent rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-gray-500"
                      autofocus
                      autocomplete
                      required
                    />
                  </div>

                  <p class="text-sm font-semibold leading-relaxed text-gray-700 hover:text-black-700 focus:text-black-700"
                    >We’ll email you a magic code for a password-free sign in.</p
                  >

                  <button
                    type="submit"
                    class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                    >Log In</button
                  >
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </section>
</template>

<script>
  import Navigation from '@/components/Navigation.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'Auth',
    components: {
      Navigation,
      Footer,
    },
  };
</script>
