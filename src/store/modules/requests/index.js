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
  getters: {}
};
