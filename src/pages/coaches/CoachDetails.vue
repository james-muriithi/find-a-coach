<template>
  <div>
    <div v-if="coachExists">
      <section>
        <base-card>
          <h2>{{ fullName }}</h2>
          <h3>$ {{ rate }}/hour</h3>
        </base-card>
      </section>
      <section>
        <base-card>
          <header>
            <h2>Interested? Reach out now!</h2>
            <base-button :link="true" :to="contactLink">Contact</base-button>
          </header>
          <router-view></router-view>
        </base-card>
      </section>
      <section>
        <base-card>
          <base-badge
            v-for="area in areas"
            :key="area"
            :title="area"
            :type="area"
          ></base-badge>
          <p>{{ description }}</p>
        </base-card>
      </section>
    </div>
    <base-card v-else><h3>Coach id does not exist!</h3></base-card>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    contactLink() {
      return {
        name: 'coachContact',
        params: {
          id: this.id
        }
      };
    },
    fullName() {
      return `${this.coach.firstName} ${this.coach.lastName}`;
    },
    rate() {
      return this.coach.hourlyRate;
    },
    areas() {
      return this.coach.areas;
    },
    description() {
      return this.coach.description;
    }
  },
  data() {
    return {
      coach: null,
      coachExists: false
    };
  },
  created() {
    this.coach = this.$store.getters.coaches.find(c => {
      if (c.id == this.id) {
        this.coachExists = true;
      }
      return c.id == this.id;
    });
  }
};
</script>
