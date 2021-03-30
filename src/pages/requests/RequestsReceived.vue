<template>
  <section>
    <base-card>
      <div v-if="hasRequests">
        <header><h2>Requests Received</h2></header>
        <ul>
          <request-item
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
      </div>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  components: {
    RequestItem,
  },
  computed: {
    ...mapGetters({ receivedRequests: 'requests', hasRequests: 'hasRequests' }),
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>