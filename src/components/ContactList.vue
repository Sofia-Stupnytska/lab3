<template>
    <div class="full-width-container">
      <div class="contact-list-container">
        <table class="table table-main">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(contact, index) in contacts"
              :key="contact.id"
              :class="{ 'table-active': selectedContact && selectedContact.id === contact.id }"
              @click="selectContact(contact)"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.number }}</td>
            </tr>
          </tbody>
        </table>
        <div class="main__manage manage-main">
          <div class="manage-main__buttons">
            <button @click="openModal" class="manage-main__button button-add btn btn-success">Add Contact</button>
            <button @click="editContact" class="manage-main__button button-edit btn btn-primary" :disabled="!selectedContact">Edit Contact</button>
            <button @click="deleteContact" class="manage-main__button button-delete btn btn-danger" :disabled="!selectedContact">Delete Contact</button>
            <button @click="sortContacts" class="manage-main__button button-sort btn btn-secondary">Sort Contacts</button>
          </div>
        </div>
        <ContactModal v-if="isModalOpen" @close="closeModal" :contact="selectedContact" @save="saveContact" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/axios'; // Use the configured Axios instance
  import ContactModal from './ContactModal.vue';
  
  export default {
    components: { ContactModal },
    data() {
      return {
        contacts: [],
        isModalOpen: false,
        selectedContact: null
      };
    },
    created() {
      this.fetchContacts();
    },
    methods: {
      fetchContacts() {
        axios.get('/api/contacts').then(response => {
          this.contacts = response.data.data;
          if (this.contacts.length > 0) {
            this.selectedContact = this.contacts[0]; // Select the first contact initially
          }
        });
      },
      openModal() {
        this.selectedContact = null;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      saveContact(contact) {
        if (contact.id) {
          axios.put(`/api/contacts/${contact.id}`, contact).then(() => {
            this.fetchContacts();
            this.closeModal();
          });
        } else {
          axios.post('/api/contacts', contact).then(() => {
            this.fetchContacts();
            this.closeModal();
          });
        }
      },
      selectContact(contact) {
        this.selectedContact = contact;
      },
      deleteContact() {
        if (this.selectedContact) {
          axios.delete(`/api/contacts/${this.selectedContact.id}`).then(() => {
            this.fetchContacts();
            this.selectedContact = this.contacts.length > 0 ? this.contacts[0] : null; // Select the first contact or null if no contacts left
          });
        }
      },
      editContact() {
        if (this.selectedContact) {
          this.isModalOpen = true;
        }
      },
      sortContacts() {
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
      }
    }
  };
  </script>
  
  <style scoped>
  .full-width-height-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    padding: 20px 0;
  }
  
  .contact-list-container {
    width: 100%;
    max-width: 800px; /* Adjust the max-width as needed */
    margin: 0 auto;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .table-main {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .table-active {
    background-color: #add8e6 !important;
  }
  
  .manage-main__buttons {
    display: flex;
    gap: 20px;
    justify-content: center; /* Center buttons */
  }
  
  .main__manage {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  
  .manage-main__button,
  button {
    background-color: var(--secondary-color);
    color: var(--text-color);
    padding: 10px;
    border-radius: var(--border-radius);
    border: none;
    transition: transform 0.2s ease;
  }
  
  .manage-main__button:hover,
  button:hover {
    transform: translateY(-2px);
  }
  
  .manage-main__button:disabled,
  button:disabled {
    background-color: #c0c0c0; /* Dimmed color for disabled buttons */
    color: #7a7a7a; /* Dimmed text color for disabled buttons */
    cursor: not-allowed; /* Change cursor to not-allowed */
    transform: none; /* Disable hover effect */
  }
  </style>
  