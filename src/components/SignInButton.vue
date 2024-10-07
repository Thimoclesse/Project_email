<template>
  <button @click="handleClick"><slot></slot></button>
</template>

<script>
import { signInAndGetUser } from '@/lib/microsoftGraph'

export default {
  name: 'BaseButton',
  methods: {
    async handleClick() {
      try {
        const user = await signInAndGetUser();
        console.log('User Info:', user);
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
    }
  }
}
</script>

<style scoped>
button {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.2s;
  margin-right: 1rem;
  margin-left: 1rem;
}
button:hover {
  transform: scale(1.05);
}
</style>