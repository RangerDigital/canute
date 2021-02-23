import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
  },
  {
    path: '/auth/wait',
    name: 'AuthWait',
    component: () => import(/* webpackChunkName: "authWait" */ '../views/AuthWait.vue'),
  },
  {
    path: '/auth/magic/:magicToken',
    name: 'AuthMagic',
    component: () => import(/* webpackChunkName: "authMagic" */ '../views/AuthMagic.vue'),
  },
  {
    path: '/orgs',
    name: 'OrgsSelect',
    component: () => import(/* webpackChunkName: "orgsSelect" */ '../views/OrgsSelect.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
