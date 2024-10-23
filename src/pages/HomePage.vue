<template>
  <div>
    <h1>Welcome to the Home Page!</h1>

    <!-- Check if user exists before displaying user information -->
    <div v-if="user">
      <p>User Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Provider: {{ user.provider }}</p>
      <p>ID: {{ user.id }}</p>
      <button @click="logout">Logout</button>
    </div>

    <div v-else>
      <p>Please sign in.</p>
      <div class="connexion-buttons">
        <sign-in-button>Sign in</sign-in-button>
        <g-sign-in-button>Google Sign in</g-sign-in-button>
      </div>
    </div>
  </div>
</template>

<script>
import SignInButton from '../components/SignInButton.vue';
import GSignInButton from "@/components/GSignInButton.vue";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SignInButton,
    GSignInButton,
  },
  computed: {
    // Mapping getters for currentUser
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;  // Access the user from the Vuex store
    }
  },
  methods: {
    // Mapping mutations to update the user state in Vuex
    ...mapMutations(['setUser']),
    async logout() {
      // Log the user out and clear the current user from the store
      this.setUser(null);
      await this.$store.dispatch('resetUserData'); // Réinitialiser l'état
      console.log('Utilisateur déconnecté et état réinitialisé.');
    }
  }
};
</script>

<style scoped>
.connexion-buttons {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
