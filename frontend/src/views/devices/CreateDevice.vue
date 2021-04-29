<template>
  <HorizontalLayout v-bind:loading="isLoading">
    <VerticalContainer>
      <nav class="flex flex-col justify-between w-full xl:flex-row xl:items-center">
        <div class="mb-5 xl:mb-0">
          <h1 class="my-2 font-medium text-md xl:text-lg 2xl:mx-5 text-primary">{{ $t('devices.title') }}</h1>
          <p class="my-2 text-sm 2xl:mx-5 text-gray">{{ $t('devices.create.subheading') }}</p>
        </div>

        <div class="flex flex-row">
          <Button ghost @click="$router.go(-1)">{{ $t('btn.cancel') }}</Button>
          <Button solid @click="upsertDevice()" :disabled="!device.name.length">{{ $t('btn.save') }}</Button>
        </div>
      </nav>
      <!-- Dashboard Horizontal Divider -->
      <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>

      <!-- Horizontal Container Forms/Groups -->
      <div class="flex flex-col justify-between w-full xl:flex-row">
        <!-- Forms Vertical Container-->
        <div class="flex flex-col w-full">
          <!-- Basic Information -->
          <section class="flex flex-row w-full ">
            <!-- Description Section -->
            <div class="flex-grow-0 hidden 2xl:w-10/12 2xl:flex 2xl:ml-5 3xl:w-4/6">
              <div class="w-2/7">
                <h1 class="my-2 font-heading text-md xl:text-lg text-primary">{{ $t('devices.form.basic.header') }}</h1>
                <p class="my-2 text-sm text-gray">{{ $t('devices.form.basic.description') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full">
              <div class="my-3.5">
                <p class="my-2 text-sm text-gray">{{ $t('label.name') }}</p>
                <TextField v-model="device.name" placeholder="Canute X-1" />
              </div>
            </div>
          </section>

          <!-- Devices Deletion -->
          <section v-if="editMode" class="flex flex-row w-full my-10 ">
            <!-- Description Section -->
            <div class="flex-grow-0 hidden 2xl:flex 2xl:ml-5 2xl:w-10/12 3xl:w-4/6">
              <div class="w-2/7">
                <h1 class="my-2 font-heading text-md xl:text-lg text-primary">{{ $t('forms.actions.title') }}</h1>
                <p class="my-2 text-sm text-gray">{{ $t('forms.actions.subheader') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full 3xl:flex-row 3xl:items-center">
              <Button ghost @click="deleteDevice()"
                ><span class="font-normal text-primary">{{ $t('btn.delete') }} {{ $t('devices.device') }}</span></Button
              >
            </div>
          </section>
        </div>

        <!-- Vertical Divider -->
        <div class="w-px h-full mx-5 my-5 rounded-full bg-gray-darker"></div>

        <!-- Shadows List -->
        <div class="w-full ">
          <h1 class="py-2 font-sans text-sm xl:mx-5 text-gray">{{ $t('label.shadows') }} ({{ $t('label.preview') }})</h1>
          <div class="grid w-full grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 lg:gap-6">
            <Shadow class="max-w-sm xl:mx-4 xl:hover:border-primary" v-for="item in device.shadows" :key="item._id" v-bind:shadow="item" />

            <div v-if="!device.shadows.length" class="flex flex-col items-center justify-center h-full 2xl:col-span-2 3xl:col-span-3">
              <p class="my-12 text-sm text-center 2xl:mx-5 text-gray">{{ $t('devices.create.shadows') }}</p>
            </div>
          </div>
        </div>
      </div>
    </VerticalContainer>

    <Modal v-if="showAuthModal" v-on:hide="this.$router.go(-1)">
      <h1 class="my-1 text-3xl font-semibold font-heading text-primary ">{{ $t('devices.success.heading') }}</h1>
      <h2 class="my-2 text-sm text-gray">{{ $t('devices.success.subheading') }}</h2>

      <div class="my-10">
        <p class="my-2 text-sm text-gray">Client</p>
        <p class="my-2 text-white">{{ device._id }}</p>
      </div>

      <div class="my-10">
        <p class="my-2 text-sm text-gray">Username</p>
        <p class="my-2 text-white">{{ device.auth.username }}</p>
      </div>

      <div class="my-10">
        <p class="my-2 text-sm text-gray">Password</p>
        <p class="my-2 text-white">{{ device.auth.password }}</p>
      </div>

      <Button solid @click="this.$router.go(-1)">{{ $t('btn.done') }}</Button>
    </Modal>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Shadow from '@/components/app/Shadow.vue';
  import Button from '@/components/inputs/Button.vue';
  import Modal from '@/components/app/Modal.vue';
  import TextField from '@/components/inputs/TextField.vue';

  export default {
    name: 'CreateDevice',
    components: {
      HorizontalLayout,
      VerticalContainer,
      Shadow,
      Modal,
      Button,
      TextField,
    },
    data() {
      return {
        organisation: null,
        organisationShadows: [],
        device: { name: '', shadows: [] },
        isLoading: true,
        showAuthModal: false,
      };
    },
    props: {
      editMode: Boolean,
    },
    methods: {
      // When editing existing user.
      getDevice(id) {
        this.axios.get('/api/orgs/' + this.organisation + '/devices/' + id).then((payload) => {
          this.device = payload.data;
          this.isLoading = false;
        });
      },

      deleteDevice() {
        this.axios.delete('/api/orgs/' + this.organisation + '/devices/' + this.device._id).then(() => {
          this.$router.go(-1);
        });
      },

      upsertDevice() {
        if (this.editMode) {
          this.axios.patch('/api/orgs/' + this.organisation + '/devices/' + this.device._id, this.device).then(() => {
            this.$router.go(-1);
          });
        }

        if (!this.editMode) {
          this.axios.post('/api/orgs/' + this.organisation + '/devices', this.device).then((payload) => {
            this.device = payload.data;

            this.showAuthModal = true;
          });
        }
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      } else {
        this.organisation = localStorage.organisation;
      }

      if (this.editMode) {
        this.getDevice(this.$route.params.deviceID);
      }

      this.isLoading = false;
    },
  };
</script>
