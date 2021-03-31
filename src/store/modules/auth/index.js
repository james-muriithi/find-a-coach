export default {
  state() {
    return {
      token: null,
      userId: null,
      tokenExpiration: null
    };
  },
  mutations: {
    setUser(state, payload) {
      (state.token = payload.token),
        (state.userId = payload.userId),
        (state.tokenExpiration = payload.tokenExpiration);
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.tokenExpiration = null;
    }
  },
  actions: {
    async login(context, payload) {
      const key = 'AIzaSyD3FCV4Oly1ztwv6OaVDiBWB0Phh2pC_sw';
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
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
        throw new Error(responseData.message || 'An error signing in');
      }

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    },
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

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
      });
    },
    logout(context) {
      context.commit('logout');
    }
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    }
  }
};
