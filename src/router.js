import { createRouter, createWebHistory } from 'vue-router';

import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegister from './pages/coaches/CoachRegister.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      name: 'coachDetails',
      children: [
        { path: '/contact', component: ContactCoach, name: 'coachContact' }
      ]
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: null }
  ]
});

export default router;
