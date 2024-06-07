<template>
    <div class="profile__container container" v-if="user">
      <div class="profile__alert alert alert-danger" v-if="!user.isAuthenticated" role="alert">
        You need to sign in to get access to profile page!
      </div>
      <table class="profile__table table table-primary" v-if="user.isAuthenticated">
        <tbody>
          <tr>
            <th>Nickname</th>
            <td>{{ user.nickname }}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{{ user.email }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ user.phone }}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{{ user.gender }}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{{ user.status }}</td>
          </tr>
          <tr>
            <th>Amount of contacts</th>
            <td>{{ user.amountOfContacts }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '@/axios'; // Use the configured Axios instance
  
  export default {
    name: "ProfilePage",
    data() {
      return {
        user: null
      };
    },
    created() {
      this.fetchUserProfile();
    },
    methods: {
      fetchUserProfile() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.user = { isAuthenticated: false };
          return;
        }
  
        axios.get('/api/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
          this.user = response.data;
          this.user.isAuthenticated = true;
        })
        .catch(error => {
          console.error("There was an error fetching the profile data!", error);
          this.user = { isAuthenticated: false };
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .profile__container {
    padding: 40px 15px;
  }
  
  .profile__alert {
    margin-bottom: 20px;
  }
  
  .profile__table {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  