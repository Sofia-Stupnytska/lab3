import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import AboutPage from '../views/AboutPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import SignInPage from '../views/SignInPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/profile', component: ProfilePage },
    { path: '/about', component: AboutPage },
    { path: '/signup', component: SignUpPage },
    { path: '/signin', component: SignInPage }
  ]
});
