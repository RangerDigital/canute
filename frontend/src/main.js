import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';

import App from './App.vue';
import router from './router';

import './registerServiceWorker';
import './index.css';

import en from '../src/locales/en.json';
import pl from '../src/locales/pl.json';

const messages = {
  en,
  pl,
};
const i18n = createI18n({ locale: 'en', messages: messages });

createApp(App)
  .use(router)
  .use(i18n)
  .mount('#app');
