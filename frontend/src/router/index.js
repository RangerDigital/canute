import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import NavigationMobile from '../views/NavigationMobile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/navigation',
    name: 'NavigationMobile',
    component: NavigationMobile,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/auth/:magicToken?',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/Users.vue'),
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: () => import(/* webpackChunkName: "users" */ '../views/users/CreateUser.vue'),
  },
  {
    path: '/users/:userID',
    name: 'ViewUser',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "users" */ '../views/users/CreateUser.vue'),
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/groups/Groups.vue'),
  },
  {
    path: '/groups/create',
    name: 'CreateGroup',
    component: () => import(/* webpackChunkName: "groups" */ '../views/groups/CreateGroup.vue'),
  },
  {
    path: '/groups/:groupID',
    name: 'ViewGroup',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "groups" */ '../views/groups/CreateGroup.vue'),
  },
  {
    path: '/devices',
    name: 'Devices',
    component: () => import(/* webpackChunkName: "devices" */ '../views/devices/Devices.vue'),
  },
  {
    path: '/devices/create',
    name: 'CreateDevice',
    component: () => import(/* webpackChunkName: "devices" */ '../views/devices/CreateDevice.vue'),
  },
  {
    path: '/devices/:deviceID',
    name: 'ViewDevice',
    props: { editMode: true },
    component: () => import(/* webpackChunkName: "devices" */ '../views/devices/CreateDevice.vue'),
  },
  {
    path: '/organisations/:autoSelect?',
    name: 'Organisations',
    component: () => import(/* webpackChunkName: "organisations" */ '../views/Organisations.vue'),
  },

  {
    path: '/errors/500',
    name: 'ServerError',
    component: () => import(/* webpackChunkName: "errors" */ '../views/errors/ServerError.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    alias: '/errors/404',
    component: () => import(/* webpackChunkName: "errors" */ '../views/errors/NotFoundError.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth' };
  },
});

export default router;
