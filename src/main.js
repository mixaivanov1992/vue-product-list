import { createApp } from 'vue';
import { stateSymbol, createState } from './store';
import App from './App.vue';

const app = createApp(App);
app.provide(stateSymbol, createState());
app.mount('#app');