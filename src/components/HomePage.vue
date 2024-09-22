<template>
  <div>
    <h1>Welcome to the Home Page!</h1>
    <base-button @click="handleClick" color="primary">Primary Button</base-button>
    <base-button @click="handleClick" color="warn">Warning Button</base-button>
    <base-button @click="handleClick" color="danger">Danger Button</base-button>
    <base-button :disabled="true">Disabled Button</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'HomePage',
  components: {
    BaseButton,
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
  },
};
</script>

<style scoped>

</style>
