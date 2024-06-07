<template>
    <div id="app" class="wrapper">
      <AppHeader />
      <main class="page">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from './components/Header.vue';
  import AppFooter from './components/Footer.vue';
  
  export default {
    components: {
      AppHeader,
      AppFooter
    }
  };
  </script>
  
  <style>
  @import url('./assets/style.css');
  
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  } 
  
  .page {
    flex: 1;
  }
  
  .container {
    max-width: 1200px;
    padding: 0 15px;
    margin: auto;
  }
  </style>
  