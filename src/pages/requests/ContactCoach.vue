<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your Email</label>
      <input type="email" id="email" v-model.trim="email.val" />
      <p v-if="!email.isValid">Plaese provide a valid email</p>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message" :class="{ invalid: !message.isValid }"
        >Message</label
      >
      <textarea id="message" rows="4" v-model="message.val"></textarea>
      <p v-if="!message.isValid">Message cannot be empty</p>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
    };
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email.val == '' || !this.email.val.includes('@')) {
        this.email.isValid = this.formIsValid = false;
      }
      if (this.message.val == '') {
        this.message.isValid = this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.$store.dispatch('addRequest', {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });

      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 7px;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
.invalid p {
  color: red;
}

.invalid p {
  font-size: 12px;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>