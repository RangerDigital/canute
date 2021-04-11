import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth/:magicToken?',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: () => import(/* webpackChunkName: "createUsers" */ '../views/CreateUser.vue'),
  },
  {
    path: '/users/:userID',
    name: 'ViewUser',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "createUsers" */ '../views/CreateUser.vue'),
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/Groups.vue'),
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import(/* webpackChunkName: "devices" */ '../views/Devices.vue'),
  },
  {
    path: '/navigation',
    name: 'MobileNavigation',
    component: () => import(/* webpackChunkName: "mobileNavigation" */ '../views/MobileNavigation.vue'),
  },
  {
    path: '/guard',
    name: 'Guard',
    component: () => import(/* webpackChunkName: "guard" */ '../views/Guard.vue'),
  },
  {
    path: '/organisations/:autoSelect?',
    name: 'Organisations',
    component: () => import(/* webpackChunkName: "organisations" */ '../views/Organisations.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
