import { createStore } from 'vuex';
import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';
import authModule from './modules/auth';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    // userId(state) {
    //   return state.userId;
    // }
  }
});

export default store;
