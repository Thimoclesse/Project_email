<template>
  <div v-if="loggedIn">
  </div>
  <div v-else>
    <GoogleLogin :callback="callback" prompt auto-login />
  </div>
</template>

<script>
import { decodeCredential, googleLogout } from 'vue3-google-login';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      loggedIn: false,
      user: null,
      callback: (response) => {
        console.log("logged in");
        this.loggedIn = true;

        // Décoder les informations de l'utilisateur
        this.user = decodeCredential(response.credential);
        // console.log(this.user);

        // Normaliser les données utilisateur pour le store
        const normalizedUser = {
          name: this.user.name,             // Nom de l'utilisateur
          email: this.user.email,           // Email de l'utilisateur
          id: this.user.sub || this.user.id, // ID de l'utilisateur (utilise 'sub' si disponible)
          provider: 'Google',                // Fournisseur (ici Google)
        };

        // console.log('User Info:', normalizedUser);

        // Appeler la mutation pour stocker l'utilisateur dans le store
        this.setUser(normalizedUser);
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),  // Importer la mutation setUser
    logout() {
      googleLogout();
      this.loggedIn = false;
      this.setUser(null);  // Réinitialiser l'utilisateur dans le store lors de la déconnexion
    }
  }
}
</script>

<style scoped>
</style>
