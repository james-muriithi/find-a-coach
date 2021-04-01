let timer;

export default {
  state() {
    return {
      token: null,
      userId: null
    };
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('authenticate', {
        ...payload,
        mode: 'login'
      });
    },
    async signup(context, payload) {
      return context.dispatch('authenticate', {
        ...payload,
        mode: 'signup'
      });
    },
    async authenticate(context, payload) {
      const key = 'AIzaSyD3FCV4Oly1ztwv6OaVDiBWB0Phh2pC_sw';
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

      if (payload.mode == 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'An error signing in');
      }

      const expiresIn = parseInt(responseData.expiresIn) * 1000,
        expirationDate = new Date().getTime() + expiresIn;

      //save to local storage
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);

      timer = setTimeout(function() {
        context.dispatch('logout');
      }, expiresIn);

      context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        context.dispatch('logout');
      }, expiresIn);

      if (token && userId) {
        context.commit('setUser', {
          token: token,
          userId: userId
        });
      }
    },
    logout(context) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');

      clearTimeout(timer);

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
