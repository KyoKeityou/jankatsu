import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProSchedule from '../components/ProSchedule.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/proschedule',
      name: 'ProSchedule',
      component: ProSchedule,
    },
    // 他のルート設定
  ],
});

export default router;
