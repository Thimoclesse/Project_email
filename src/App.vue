<template>
  <base-layout>
    <router-view :user="user" @userChanged="handleUserChange"/>
  </base-layout>
</template>

<script>
import BaseLayout from './components/BaseLayout.vue';

export default {
  name: 'App',
  components: {
    BaseLayout,
  },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    handleUserChange(newUser) {
      this.user = newUser;
    }
  }
};
// main.js ou App.vue
document.documentElement.setAttribute('data-theme', 'light');
</script>

<style>
/* Définir des couleurs pour le mode clair */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #ffffff;
    color: #000000;
  }
}
</style>
