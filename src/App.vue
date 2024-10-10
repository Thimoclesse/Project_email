<template>
  <base-layout>
    <home-page :user="user" @userChanged="handleUserChange"/>
  </base-layout>
</template>

<script>
import HomePage from './components/HomePage.vue';
import BaseLayout from './components/BaseLayout.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    BaseLayout,
  },
  data(){
    return {
      user: null,
    };
  },
  methods: {
    handleUserChange(newUser){
      this.user = newUser;
    }
  }
};
</script>

<style>

</style>
