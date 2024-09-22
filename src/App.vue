<template>
  <div id="app">
    <base-header />
    <home-page />
    <base-footer />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import BaseHeader from './components/BaseHeader.vue';
import BaseFooter from './components/BaseFooter.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
