<template>
  <div id="base-layout">
    <base-header />
    <slot /> <!-- This is where child components will be rendered -->
    <base-footer />
  </div>
</template>

<script>
import BaseHeader from './BaseHeader.vue';
import BaseFooter from './BaseFooter.vue';

export default {
  name: 'BaseLayout',
  components: {
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style scoped>
#base-layout {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
