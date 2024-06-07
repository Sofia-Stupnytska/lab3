<template>
    <div class="modal" @click.self="close">
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <ContactForm :contact="contact" @save="saveContact" />
      </div>
    </div>
  </template>
  
  <script>
  import ContactForm from './ContactForm.vue';
  
  export default {
    components: { ContactForm },
    props: ['contact'],
    methods: {
      close() {
        this.$emit('close');
      },
      saveContact(contact) {
        this.$emit('save', contact);
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 40%;
  }
  
  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    justify-content: flex-end;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  