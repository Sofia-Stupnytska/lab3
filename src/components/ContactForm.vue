<template>
    <div class="form-container">
      <h2 class="add-name">{{ contact ? 'Edit Contact' : 'Add Contact' }}</h2>
      <form @submit.prevent="submit" class="contact-form">
        <input v-model="form.name" placeholder="Name" required class="input-modal-add" />
        <input v-model="form.number" placeholder="Number" required class="input-modal-add" />
        <button type="submit" class="add-btn">{{ contact ? 'Save' : 'Add' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['contact'],
    data() {
      return {
        form: {
          name: '',
          number: ''
        }
      };
    },
    watch: {
      contact: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.form = { ...newVal };
          }
        }
      }
    },
    methods: {
      submit() {
        this.$emit('save', this.form);
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .input-modal-add {
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    font-size: 20px;
    padding: 2px 10px;
    width: 100%; /* Full width of the form container */
    max-width: 300px; /* Optional: max width for the input fields */
  }
  
  .add-name {
    color: black;
    font-size: 20px;
    font-style: italic;
    margin-bottom: 20px; /* Space between the heading and the form */
  }
  
  .add-btn {
    font-size: 17px;
    font-weight: 500;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .add-btn:hover {
    background-color: #0056b3;
  }
  </style>
  