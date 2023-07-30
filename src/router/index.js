import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProSchedule from '../components/ProSchedule.vue';
import CreateSchedule from '../components/CreateSchedule.vue';

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
    {
      path: '/createschedule',
      name: 'CreateSchedule',
      component: CreateSchedule,
    }
  ],
});

export default router;
