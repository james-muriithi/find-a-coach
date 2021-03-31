export default {
  state() {
    return {
      requests: []
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    }
  },
  actions: {
    async addRequest(context, data) {
      const newRequest = {
        id: new Date().toISOString(),
        userEmail: data.email,
        message: data.message,
        coachId: data.coachId
      };

      await fetch(
        `https://find-a-coach-69-default-rtdb.firebaseio.com/requests/${data.coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest)
        }
      );

      context.commit('addRequest', newRequest);
    },
    async loadRequests(context) {
      const userId = context.rootGetters.userId;
      const token = context.rootGetters.token;
      const response = await fetch(
          `https://find-a-coach-69-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`
        ),
        responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to fetch requests');
      }

      const requests = [];
      for (const key in responseData) {
        requests.push(responseData[key]);
      }

      context.commit('setRequests', requests);
    }
  },
  getters: {
    requests(state, _, _2, rootGetters) {
      return state.requests.filter(req => req.coachId == rootGetters.userId);
    },
    hasRequests(state, getters) {
      return getters.requests && state.requests.length > 0;
    }
  }
};
