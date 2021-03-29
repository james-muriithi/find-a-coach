<template>
  <section>Filter</section>
  <section>
    <div class="controls">
      <button>refresh</button>
      <router-link to="/register">Register as a coach</router-link>
    </div>
    <ul v-if="hasCoaches">
        <li v-for="coach in filteredCoaches" :key="coach.id">
            {{coach.firstName}}
        </li>
    </ul>
    <h3 v-else>No coaches found</h3>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({ filteredCoaches: 'coaches', hasCoaches: 'hasCoaches' }),
  },
};
</script>