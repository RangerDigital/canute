<template>
  <HorizontalLayout v-bind:loading="isLoading">
    <VerticalContainer>
      <nav class="flex flex-col justify-between w-full xl:flex-row xl:items-center">
        <div class="mb-5 xl:mb-0">
          <h1 class="my-2 font-medium text-md xl:text-lg 2xl:mx-5 text-primary">{{ $t('groups.title') }}</h1>
          <p class="my-2 text-sm 2xl:mx-5 2xl:font-medium text-gray">{{ $t('groups.create.subheading') }}</p>
        </div>

        <div class="flex flex-row">
          <Button ghost @click="$router.go(-1)">{{ $t('btn.cancel') }}</Button>
          <Button solid @click="upsertGroup()" :disabled="!group.name.length">{{ $t('btn.save') }}</Button>
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
                <h1 class="my-2 text-md xl:text-lg text-primary">{{ $t('users.form.basic.header') }}</h1>
                <p class="my-2 text-sm text-gray-dark">{{ $t('groups.form.basic.description') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full">
              <div class="my-3.5">
                <p class="my-2 text-sm text-gray-dark">{{ $t('label.name') }}</p>
                <TextField v-model="group.name" placeholder="Group A-B" />
              </div>
            </div>
          </section>

          <!-- Group Deletion -->
          <section v-if="editMode" class="flex flex-row w-full my-10 ">
            <!-- Description Section -->
            <div class="flex-grow-0 hidden 2xl:flex 2xl:ml-5 2xl:w-10/12 3xl:w-4/6">
              <div class="w-2/7">
                <h1 class="my-2 text-md xl:text-lg text-primary">{{ $t('groups.form.manage.header') }}</h1>
                <p class="my-2 text-sm text-gray-dark">{{ $t('groups.form.manage.subheader') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full 3xl:flex-row 3xl:items-center">
              <p class="3xl:mx-3.5 my-2 text-sm text-gray-dark">{{ $t('groups.form.basic.destription') }}</p>

              <div class="my-3.5 3xl:order-first">
                <Button ghost @click="deleteGroup()"
                  ><span class="font-normal text-primary">{{ $t('btn.deactivate') }}</span></Button
                >
              </div>
            </div>
          </section>
        </div>

        <!-- Vertical Divider -->
        <div class="w-px h-full mx-5 my-5 rounded-full bg-gray-darker"></div>

        <!-- Shadows List -->
        <div class="w-full ">
          <h1 class="py-2 font-sans text-sm xl:mx-5 text-gray-dark">{{ $t('label.permissions') }}</h1>
          <div class="grid w-full grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 lg:gap-6">
            <Shadow
              class="max-w-sm xl:mx-4 xl:hover:border-primary"
              v-bind:isActive="group.permissions.includes(item._id)"
              v-for="item in organisationShadows"
              :key="item._id"
              v-bind:shadow="item"
              @click="selectShadow(item._id)"
            />
          </div>
        </div>
      </div>
    </VerticalContainer>
  </HorizontalLayout>
</template>

<script>
  import HorizontalLayout from '@/components/layouts/HorizontalLayout.vue';
  import VerticalContainer from '@/components/layouts/VerticalContainer.vue';

  import Shadow from '@/components/app/Shadow.vue';
  import Button from '@/components/inputs/Button.vue';
  import TextField from '@/components/inputs/TextField.vue';

  export default {
    name: 'CreateGroup',
    components: {
      HorizontalLayout,
      VerticalContainer,
      Shadow,
      Button,
      TextField,
    },
    data() {
      return {
        organisation: null,
        organisationShadows: [],
        group: { name: '', permissions: [] },
        isLoading: true,
      };
    },
    props: {
      editMode: Boolean,
    },
    methods: {
      selectShadow(shadowId) {
        if (this.group.permissions.includes(shadowId)) {
          this.group.permissions = this.group.permissions.filter((x) => String(x) !== String(shadowId));
        } else {
          this.group.permissions.push(shadowId);
        }
      },

      deleteGroup() {
        this.axios.delete('/api/orgs/' + this.organisation + '/roles/' + this.group._id).then(() => {
          this.$router.go(-1);
        });
      },

      getShadows() {
        this.axios.get('/api/orgs/' + this.organisation + '/shadows').then((payload) => {
          this.organisationShadows = payload.data;
          this.isLoading = false;
        });
      },

      // When editing existing group.
      getGroup(id) {
        this.axios.get('/api/orgs/' + this.organisation + '/roles/' + id).then((payload) => {
          this.group = payload.data;
        });
      },

      upsertGroup() {
        if (this.editMode) {
          this.axios.patch('/api/orgs/' + this.organisation + '/roles/' + this.group._id, this.group).then(() => {
            this.$router.go(-1);
          });
        }

        if (!this.editMode) {
          this.axios.post('/api/orgs/' + this.organisation + '/roles', this.group).then(() => {
            this.$router.go(-1);
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
        this.getGroup(this.$route.params.groupID);
      }

      this.getShadows();
    },
  };
</script>
