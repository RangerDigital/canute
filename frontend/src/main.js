import { createApp } from 'vue';
import { createI18n } from 'vue-i18n/index';

import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import anime from 'animejs';

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import './registerServiceWorker';
import './index.css';

import en from '../src/locales/en.json';
import pl from '../src/locales/pl.json';

const messages = {
  en,
  pl,
};
const i18n = createI18n({ locale: 'en', messages: messages });

const app = createApp(App)
  .use(router)
  .use(i18n)
  .use(VueAxios, axios)
  .use(Toast, { maxToasts: 3 });

app.config.globalProperties.$anime = anime;
app.mount('#app');
