<template>
    <div class="signup__container container">
      <form class="main-signup__form" @submit.prevent="signup">
        <div class="mb-3">
          <label for="InputUsername" class="form-label">Username</label>
          <input type="text" class="form-control" id="InputUsername" v-model="form.username" required>
        </div>
        <div class="mb-3">
          <label for="InputEmail" class="form-label">Email address</label>
          <input type="email" class="form-control" id="InputEmail" v-model="form.email" required>
        </div>
        <div class="mb-3">
          <label for="InputPhone" class="form-label">Phone number</label>
          <input type="tel" class="form-control" id="InputPhone" v-model="form.phone" required>
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="InputPassword" v-model="form.password" required>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Sign Up</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '@/axios'; // Use the configured Axios instance
  
  export default {
    name: 'SignUpPage',
    data() {
      return {
        form: {
          username: '',
          email: '',
          phone: '',
          password: ''
        }
      };
    },
    methods: {
      signup() {
        axios.post('/api/signup', this.form)
          .then(() => {
            alert('Sign up successful!');
            this.$router.push('/signin');
          })
          .catch(error => {
            console.error(error);
            alert('Sign up failed: ' + (error.response && error.response.data ? error.response.data.error : error.message));
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .signup__container {
    padding: 40px 15px;
  }
  
  .main-signup__form {
    max-width: 600px;
    margin: auto;
  }
  </style>
  