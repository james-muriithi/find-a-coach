export default {
  state() {
    return [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30
      }
    ];
  },
  mutations: {
    addCoach(state, payload) {
      state.push(payload);
    }
  },
  actions: {
    async addCoach(context, data) {
      const userId = context.rootGetters.userId;

      const coachData = {
        firstName: data.first,
        lastName: data.last,
        hourlyRate: data.rate,
        description: data.desc,
        areas: data.areas
      };

      const response = await fetch(`https://find-a-coach-69-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
        method: 'PUT',
        body: JSON.stringify(coachData)
      });

      // const responseData = await response.json()

      if(!response.ok)

      context.commit('addCoach', {
        ...coachData,
        id: userId
      });
    }
  },
  getters: {
    coaches: state => state,
    hasCoaches: state => state && state.length > 0,
    isCoach: (_, getters, _2, rootGetters) => {
      const coaches = getters.coaches,
        userId = rootGetters.userId;

      return coaches.some(coach => coach.id == userId);
    }
  }
};
