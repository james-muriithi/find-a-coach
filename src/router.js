import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegister from './pages/coaches/CoachRegister.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store';

const CoachDetails = () => import('./pages/coaches/CoachDetails.vue');
const ContactCoach = () => import('./pages/coaches/CoachRegister.vue');
const CoachRegister = () => import('./pages/requests/ContactCoach.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      props: true,
      component: CoachDetails,
      name: 'coachDetails',
      children: [
        { path: 'contact', component: ContactCoach, name: 'coachContact' }
      ]
    },
    {
      path: '/register',
      component: CoachRegister,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    const path = to.path.replace('/', '');
    next(`/auth?redirect=${path}`);
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next(`/`);
  } else {
    next();
  }
});

export default router;
