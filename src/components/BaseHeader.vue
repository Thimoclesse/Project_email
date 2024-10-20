<template>
  <header>
    <nav class="nav-links">
      <router-link to="/" class="mail-link">Home</router-link>
      <div v-if="user">
        <router-link to="/mail" class="mail-link">Show your email</router-link>
        <router-link to="/create" class="mail-link">Create email</router-link>
      </div>
      <span>User: {{ user ? user.name : 'Not logged in' }}</span>

    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'; // Importation de mapGetters


export default {
  name: 'BaseHeader',
  computed: {
    ...mapGetters(['currentUser']), // Récupérer l'utilisateur depuis Vuex
    user() {
      return this.currentUser; // Alias pour l'utilisateur courant
    }
  }
};
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}

.nav-links {
  display: flex; /* Utilisation de flexbox pour aligner les éléments horizontalement */
  justify-content: center; /* Centrer les éléments */
  align-items: center; /* Aligner les éléments verticalement */
}


.mail-link {
  display: inline-block;
  margin: 1rem;
  color: white;
  background-color: orange;
  padding: 0.7rem;
  border-radius: 0.5rem;
  text-decoration: none;
}
</style>
