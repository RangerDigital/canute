<template>
  <HorizontalLayout>
    <VerticalContainer>
      <div class="flex flex-col justify-between w-full xl:flex-row xl:items-center">
        <h1 v-if="!editMode" class="py-2 font-sans text-sm text-gray-dark">Create User</h1>
        <h1 v-if="editMode" class="py-2 font-sans text-sm text-gray-dark">Edit User</h1>

        <div class="flex flex-row xl:block">
          <Button ghost @click="$router.go(-1)">Cancel</Button>
          <Button solid @click="createUser()">Save User</Button>
        </div>
      </div>

      <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>

      <div class="flex flex-col justify-between w-full xl:flex-row">
        <div class="flex flex-col justify-start w-full">
          <div class="my-3">
            <label class="block my-2 text-sm font-base text-gray-dark"> E-Mail</label>
            <TextField v-if="!editMode" v-model="user.email" placeholder="... @gmail.com" />

            <div v-if="editMode" class="flex flex-row">
              <div class="w-px rounded-full bg-red"></div>
              <p class="mx-3 my-3 text-sm tracking-wide text-white font-base">{{ user.email }}</p>
            </div>
          </div>

          <div class="my-3">
            <label class="block my-2 text-sm font-base text-gray-dark"> Annotation</label>
            <TextField v-model="user.annotation" placeholder="3C 24/03" />
          </div>

          <div class="flex flex-row items-center my-3 ">
            <Checkbox v-model="user.isAdmin" class="mr-5" />

            <label class="block my-2 text-sm font-base text-gray">Should be able to manage users?</label>
          </div>

          <div class="w-full h-px my-5 rounded-full xl:block bg-gray-darker"></div>

          <div class="flex flex-col items-center my-4 xl:flex-row">
            <Button ghost @click="deleteUser()">Delete User</Button>
            <label class="my-2 text-sm font-base text-red">Remove user from organisation.</label>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-px h-full mx-5 my-5 rounded-full bg-gray-darker"></div>

        <!-- Groups -->
        <div class="w-full">
          <h1 class="py-2 font-sans text-sm xl:mx-5 text-gray-dark">User Groups</h1>
          <div class="grid w-full grid-cols-1 2xl:grid-cols-2 3xl:grid-cols-3 lg:gap-6">
            <Group
              class="max-w-sm xl:mx-4 xl:hover:border-red"
              v-for="item in groups"
              :key="item._id"
              v-bind:group="item"
              v-bind:isActive="isSelected(item._id)"
              @click="toggleSelectGroup(item._id)"
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
        groups: [],
        deletedGroups: [],
        activeGroups: [],
        user: {},

        organisation: null,
      };
    },
    props: {
      editMode: Boolean,
    },
    methods: {
      getGroups() {
        this.axios
          .get('/api/orgs/' + this.organisation + '/roles')
          .then((payload) => {
            this.groups = payload.data;
          })
          .catch((err) => {
            console.log(err);
          });
      },

      deleteUser() {
        this.axios.delete('/api/orgs/' + this.organisation + '/users/' + this.user._id).then(() => {
          this.$router.go(-1);
        });
      },

      toggleSelectGroup(groupId) {
        if (this.activeGroups.includes(groupId)) {
          this.activeGroups = this.activeGroups.filter((x) => String(x) !== String(groupId));

          if (this.editMode) {
            this.deletedGroups.push(groupId);
          }
        } else {
          this.activeGroups.push(groupId);

          if (this.editMode) {
            this.deletedGroups = this.deletedGroups.filter((x) => String(x) !== String(groupId));
          }
        }
      },

      isSelected(groupId) {
        return this.activeGroups.includes(groupId);
      },

      addGroups(userId) {
        for (let [i, group] of this.activeGroups.entries()) {
          this.axios.post('/api/orgs/' + this.organisation + '/roles/' + group + '/users/' + userId).then(() => {
            if (i == this.activeGroups.length - 1) {
              this.$router.go(-1);
            }
          });
        }
      },

      createUser() {
        if (this.editMode) {
          this.axios
            .patch('/api/orgs/' + this.organisation + '/users/' + this.user._id, this.user)
            .then(() => {
              this.updateGroups();
            })
            .catch((err) => {
              console.log(err);
            });

          return;
        }

        this.axios
          .post('/api/orgs/' + this.organisation + '/users', this.user)
          .then((payload) => {
            this.addGroups(payload.data._id);
          })
          .catch((err) => {
            console.log(err);
          });
      },

      updateGroups() {
        let counter = this.activeGroups.length + this.deletedGroups.length;

        for (let group of this.activeGroups) {
          this.axios.post('/api/orgs/' + this.organisation + '/roles/' + group + '/users/' + this.user._id).then(() => {
            --counter;

            if (counter == 0) {
              this.$router.go(-1);
            }
          });
        }

        for (let group of this.deletedGroups) {
          this.axios.delete('/api/orgs/' + this.organisation + '/roles/' + group + '/users/' + this.user._id).then(() => {
            --counter;

            if (counter == 0) {
              this.$router.go(-1);
            }
          });
        }

        if (counter == 0) {
          this.$router.go(-1);
        }
      },

      getUser(userID) {
        this.axios
          .get('/api/orgs/' + this.organisation + '/users/' + userID)
          .then((payload) => {
            this.user = payload.data;

            for (let role of payload.data.roles) {
              this.activeGroups.push(role._id);
            }
          })
          .catch((err) => {
            console.log(err);
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
