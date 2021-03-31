export default {
  state() {
    return {};
  },
  mutations: {
    setUser(state, payload) {
      (state.token = payload.token),
        (state.userId = payload.userId),
        (state.tokenExpiration = payload.tokenExpiration);
    }
  },
  actions: {
    login() {},
    async signup(context, payload) {
      const key = 'AIzaSyD3FCV4Oly1ztwv6OaVDiBWB0Phh2pC_sw';
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          })
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'An error signing up');
      }

      console.log(responseData);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    }
  },
  getters: {}
};
