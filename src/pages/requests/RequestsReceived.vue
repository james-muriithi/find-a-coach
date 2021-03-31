<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <div v-if="!isLoading">
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
        </div>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  components: {
    RequestItem
  },
  computed: {
    ...mapGetters({ receivedRequests: 'requests', hasRequests: 'hasRequests' })
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadRequests();
  }
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
