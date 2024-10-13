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
</script>

<style>

</style>
