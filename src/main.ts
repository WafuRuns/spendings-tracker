import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { Quasar } from 'quasar';
import piniaPersist from 'pinia-plugin-persist';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.use(pinia);
app.use(Quasar);
app.mount('#app');
