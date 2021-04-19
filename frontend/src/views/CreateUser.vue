<template>
  <HorizontalLayout v-bind:loading="isLoading">
    <VerticalContainer>
      <nav class="flex flex-col justify-between w-full xl:flex-row xl:items-center">
        <div class="mb-5 xl:mb-0">
          <h1 class="my-2 font-medium text-md xl:text-lg 2xl:mx-5 text-primary">{{ $t('users.title') }}</h1>
          <p class="my-2 text-sm 2xl:mx-5 2xl:font-medium text-gray">{{ $t('users.create.subheading') }}</p>
        </div>

        <div class="flex flex-row">
          <Button ghost @click="$router.go(-1)">{{ $t('btn.cancel') }}</Button>
          <Button solid @click="upsertUser()" :disabled="!user.email.length">{{ $t('btn.save') }}</Button>
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
                <p class="my-2 text-sm text-gray-dark">{{ $t('users.form.basic.description') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full">
              <div class="my-3.5">
                <p class="my-2 text-sm text-gray-dark">{{ $t('label.email') }}</p>
                <TextField v-bind:readonly="editMode" v-model="user.email" placeholder="... @gmail.com" />
              </div>

              <div class="my-3.5">
                <p class="my-2 text-sm text-gray-dark">{{ $t('label.annotation') }}</p>
                <TextField v-model="user.annotation" placeholder="3C 24/03" />
              </div>

              <div class="flex flex-row items-center my-5 ">
                <Checkbox v-model="user.isAdmin" class="flex-shrink-0" />
                <p class="mx-3 my-2 text-sm text-gray-dark"> {{ $t('users.form.basic.isadmin') }}</p>
              </div>
            </div>
          </section>

          <!-- User Deletion -->
          <section v-if="editMode" class="flex flex-row w-full my-10 ">
            <!-- Description Section -->
            <div class="flex-grow-0 hidden 2xl:flex 2xl:ml-5 2xl:w-10/12 3xl:w-4/6">
              <div class="w-2/7">
                <h1 class="my-2 text-md xl:text-lg text-primary">{{ $t('users.form.manage.header') }}</h1>
                <p class="my-2 text-sm text-gray-dark">{{ $t('users.form.manage.subheader') }}</p>
              </div>
            </div>

            <!-- Vertical Divider -->
            <div class="hidden w-px h-full mx-5 my-5 rounded-full 2xl:flex bg-gray-darker"></div>

            <!-- Form Section -->
            <div class="flex flex-col justify-start w-full 3xl:flex-row 3xl:items-center">
              <p class="3xl:mx-3.5 my-2 text-sm text-gray-dark">{{ $t('users.form.basic.destription') }}</p>

              <div class="my-3.5 3xl:order-first">
                <Button ghost @click="deleteUser()"
                  ><span class="font-normal text-primary">{{ $t('btn.deactivate') }}</span></Button
                >
              </div>
            </div>
          </section>
        </div>

        <!-- Vertical Divider -->
        <div class="w-px h-full mx-5 my-5 rounded-full bg-gray-darker"></div>

        <!-- Groups List -->
        <div class="w-full ">
          <h1 class="py-2 font-sans text-sm xl:mx-5 text-gray-dark">{{ $t('groups.title') }}</h1>
          <div class="grid w-full grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 lg:gap-6">
            <Group
              class="max-w-sm xl:mx-4 xl:hover:border-primary"
              v-for="item in organisationGroups"
              :key="item._id"
              v-bind:group="item"
              v-bind:isActive="modifiedGroups.includes(item._id)"
              @click="selectGroup(item._id)"
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

  import Group from '@/components/app/Group.vue';
  import Checkbox from '@/components/inputs/Checkbox.vue';
  import Button from '@/components/inputs/Button.vue';
  import TextField from '@/components/inputs/TextField.vue';

  export default {
    name: 'ViewUser',
    components: {
      HorizontalLayout,
      VerticalContainer,
      Group,
      Checkbox,
      Button,
      TextField,
    },
    data() {
      return {
        organisation: null,
        organisationGroups: [],
        user: { email: '' },
        isLoading: true,

        activeGroups: [],
        modifiedGroups: [],
      };
    },
    props: {
      editMode: Boolean,
    },
    methods: {
      // Hangle toggling modified groups.
      selectGroup(groupId) {
        if (this.modifiedGroups.includes(groupId)) {
          this.modifiedGroups = this.modifiedGroups.filter((x) => String(x) !== String(groupId));
        } else {
          this.modifiedGroups.push(groupId);
        }
      },

      getGroups() {
        this.axios.get('/api/orgs/' + this.organisation + '/roles').then((payload) => {
          this.organisationGroups = payload.data;

          this.isLoading = false;
        });
      },

      // When editing existing user.
      getUser(id) {
        this.axios.get('/api/orgs/' + this.organisation + '/users/' + id).then((payload) => {
          this.user = payload.data;

          for (let role of payload.data.roles) {
            this.activeGroups.push(role._id);
          }

          this.modifiedGroups = this.modifiedGroups.concat(this.activeGroups);
        });
      },

      deleteUser() {
        this.axios.delete('/api/orgs/' + this.organisation + '/users/' + this.user._id).then(() => {
          this.$router.go(-1);
        });
      },

      upsertUser() {
        if (this.editMode) {
          this.axios.patch('/api/orgs/' + this.organisation + '/users/' + this.user._id, this.user).then(() => {
            this.synchronizeGroups();
          });
        }

        if (!this.editMode) {
          this.axios.post('/api/orgs/' + this.organisation + '/users', this.user).then((payload) => {
            this.user._id = payload.data._id;

            this.synchronizeGroups();
          });
        }
      },

      synchronizeGroups() {
        let requests = [];

        for (let group of this.organisationGroups) {
          // Create all groups that were selected as new by user.
          if (!this.activeGroups.some((x) => x == group._id) && this.modifiedGroups.some((x) => x == group._id)) {
            requests.push(this.axios.post('/api/orgs/' + this.organisation + '/roles/' + group._id + '/users/' + this.user._id));
          }

          // Delete all groups that were unselected by user.
          if (this.activeGroups.some((x) => x == group._id) && !this.modifiedGroups.some((x) => x == group._id)) {
            requests.push(this.axios.delete('/api/orgs/' + this.organisation + '/roles/' + group._id + '/users/' + this.user._id));
          }
        }

        this.axios.all(requests).then(() => {
          this.$router.go(-1);
        });
      },
    },
    mounted() {
      if (!localStorage.organisation) {
        this.$router.push('/organisations');
      } else {
        this.organisation = localStorage.organisation;
      }

      if (this.editMode) {
        this.getUser(this.$route.params.userID);
      }

      this.getGroups();
    },
  };
</script>
