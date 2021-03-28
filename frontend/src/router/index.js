import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
