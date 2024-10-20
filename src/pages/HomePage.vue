<template>
  <div>
    <h1>Welcome to the Home Page!</h1>

    <div v-if="user">
      <p>User Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Provider: {{ user.provider }}</p> <!-- Affichage du fournisseur -->
      <p>ID: {{ user.id }}</p> <!-- Affichage de l'ID -->
    </div>
    <div v-else>
      <p>Please sign in.</p>
    </div>
    <div class="connexion-buttons">
      <sign-in-button>Sign in</sign-in-button>
      <g-sign-in-button>Google Sign in</g-sign-in-button>
    </div>
  </div>
</template>

<script>
import SignInButton from '../components/SignInButton.vue';
import GSignInButton from "@/components/GSignInButton.vue";
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SignInButton,
    GSignInButton
  },
  computed: {
    ...mapGetters(['currentUser', 'userEmails']),  // Ajout de userEmails ici
    user() {
      // Affiche directement les informations de l'utilisateur
      return this.currentUser;  // Retourne l'utilisateur courant
    }
  },
};
</script>

<style scoped>
.connexion-buttons{
  display: flex;
  align-items: center;
  flex-direction: column;

}
</style>
