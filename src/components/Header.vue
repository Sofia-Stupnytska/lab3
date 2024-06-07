<template>
    <header class="header">
      <div class="header__container container">
        <nav class="header__nav navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <a class="header__logo navbar-brand" href="#"><img class="logo" src="../assets/contactme.png" alt="Лого"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/" class="nav-link" aria-current="page">Main</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/profile" class="nav-link">Profile</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/about" class="nav-link">About</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/signup" class="nav-link" id="signUp">Sign up</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/signin" class="nav-link" id="signIn">Sign in</router-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "AppHeader"
  };
  </script>
  
  <style scoped>
  .header {
    background-color: var(--primary-color);
  }
  .header__container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    color: var(--background-color);
    border-radius: var(--border-radius);
  }
  .header__logo .logo {
    width: 50px;
  }
  .navbar-nav {
    display: flex;
    gap: 30px;
  }
  </style>
  