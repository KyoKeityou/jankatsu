// main.js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import HomePage from './views/HomePage.vue';
import ProSchedule from './components/ProSchedule.vue';

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/proschedule',
    component: ProSchedule
  },
  // {
  //   path: '/demo2',
  //   component: Demo2
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
