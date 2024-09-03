import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'datatables.net-bs4'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createApp(App).use(store).use(router).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).mount('#app')
