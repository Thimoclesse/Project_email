<template>
  <div>
    <h1>Welcome to the Home Page!</h1>

    <div v-if="user">
      <p>User Name : {{ user.name }}</p>
      <p>Email : {{ user.username }}</p>
    </div>
    <div v-else>
      <p>Please sign in.</p>
    </div>

    <async-button
        :isDisabled="isPending"
        @click="handleAsyncClick"
        color="primary"
    >
      Click Me
    </async-button>

    <base-button @click="handleClick" color="warn">Warning Button</base-button>
    <base-button @click="handleClick" color="danger">Danger Button</base-button>
    <base-button :disabled="true">Disabled Button</base-button>
    <sign-in-button>Sign in</sign-in-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import AsyncButton from './AsyncButton.vue';
import SignInButton from './SignInButton.vue';
import { mapGetters } from 'vuex'; // Importation de mapGetters pour utiliser les getters du store

export default {
  name: 'HomePage',
  components: {
    BaseButton,
    AsyncButton,
    SignInButton
  },
  computed: {
    ...mapGetters(['currentUser']), // Récupère l'utilisateur depuis Vuex
    user() {
      return this.currentUser; // Alias pour l'utilisateur courant
    }
  },
  data() {
    return {
      isPending: false,
      duration: 0,
    };
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
    async handleAsyncClick() {
      this.isPending = true;
      this.duration += 2;
      await new Promise((resolve) => {
        setTimeout(() => {
          alert('Async button clicked!');
          resolve();
        }, this.duration * 1000);
      });
      this.isPending = false;
    }
  }
};
</script>

<style scoped>
</style>
