<template>
    <div class="signin__container container">
      <form class="main-signin__form" @submit.prevent="signin">
        <div class="mb-3">
          <label for="InputUsername" class="form-label">Username</label>
          <input type="text" class="form-control" id="InputUsername" v-model="form.username" required>
        </div>
        <div class="mb-3">
          <label for="InputPassword" class="form-label">Password</label>
          <input type="password" class="form-control" id="InputPassword" v-model="form.password" required>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary">Sign In</button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SignInPage',
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      signin() {
        axios.post('/api/signin', this.form)
          .then(response => {
            alert('Sign in successful!');
            // Store the token in localStorage
            localStorage.setItem('token', response.data.data.token);
            // Redirect to profile page
            this.$router.push('/profile');
          })
          .catch(error => {
            console.error(error);
            alert('Sign in failed: ' + (error.response.data.error || error.message));
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .signin__container {
    padding: 40px 15px;
  }
  
  .main-signin__form {
    max-width: 600px;
    margin: auto;
  }
  </style>
  