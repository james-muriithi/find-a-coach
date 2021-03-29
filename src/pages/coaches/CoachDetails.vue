<template>
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
</template>

<script>
export default {
    props: ['id'],
    computed: {
        contactLink(){
            return {
                name: 'coachDetails',
                params: {
                    id: this.id
                }
            }
        },
        fullName(){
            return `${this.coach.firstName} ${this.coach.lastName}`
        },
        coachExists(){
            return this.coach && this.coach.length > 0
        },
    },
    data(){
        return {
            coach: null,
        }
    },
    created(){
        this.coach = this.$store.getters.coaches.find(c => c.id == this.id)
    }
}
</script>