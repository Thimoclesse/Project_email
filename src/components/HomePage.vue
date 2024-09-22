<template>
  <div>
    <h1>Welcome to the Home Page!</h1>
    <async-button @click="handleAsyncClick" color="primary">Click Me, I'm Async</async-button>
    <base-button @click="handleClick" color="warn">Warning Button</base-button>
    <base-button @click="handleClick" color="danger">Danger Button</base-button>
    <base-button :disabled="true">Disabled Button</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import AsyncButton from './AsyncButton.vue';

export default {
  name: 'HomePage',
  components: {
    BaseButton,
    AsyncButton,
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
    handleAsyncClick() {
      return new Promise((resolve) => {
        setTimeout(() => {
          alert('Async button clicked!');
          resolve();
        }, 2000);
      });
    },
  },
};
</script>

<style scoped>

</style>
