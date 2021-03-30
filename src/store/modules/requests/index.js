export default {
  state() {
    return {
      requests: []
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    }
  },
  actions: {
    addRequest(context, data) {
      const newRequest = {
        id: new Date().toISOString(),
        userEmail: data.email,
        message: data.message,
        coachId: data.coachId
      };

      context.commit('addRequest', newRequest);
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      return state.requests.filter(req => req.coachId == rootGetters.userId);
    },
    hasRequests(state, getters){
        return getters.requests && state.requests.length > 0;
    }
  }
};
