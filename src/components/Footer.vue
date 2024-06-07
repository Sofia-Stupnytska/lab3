<template>
    <footer class="footer">
      <div class="footer__copy">2024 Contact.me ©</div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter"
  };
  </script>
  
  <style scoped>
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background-color: var(--primary-color);
    color: var(--background-color);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
  }
  </style>
  