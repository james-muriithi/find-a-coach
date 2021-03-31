<template>
  <section>
    <base-card>
      <h2>Register as a coach</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  data(){
    return {
      error: null
    }
  },
  components: {
    CoachForm,
  },
  methods: {
    async saveData(data) {
      try {
        await this.$store.dispatch('addCoach', data);
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.$router.replace('/coaches');
    },
  },
};
</script>