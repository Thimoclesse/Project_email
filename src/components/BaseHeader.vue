<template>
  <header class="bg-gray-100 shadow-lg p-6 rounded-xl m-4">
    <nav class="nav-links flex items-center justify-between">
      <!-- Lien vers la page d'accueil (Home) -->
      <router-link to="/" class="text-lg font-semibold text-black hover:text-gray-400 transition-all duration-300">
        Home
      </router-link>

      <!-- Conteneur pour les boutons à gauche -->
      <div v-if="user" class="flex gap-6 ml-8">
        <!-- Bouton "Show your email" avec dégradé bleu et vert océan -->
        <button class="bg-gradient-to-r from-blue-300 to-teal-400 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-500 hover:to-teal-600 transition-all duration-300">
          <router-link to="/mail" class="mail-link">Show your email</router-link>
        </button>

        <!-- Bouton "Create email" avec dégradé orange et rose -->
        <button class="bg-gradient-to-r from-orange-300 to-pink-300 text-white font-semibold py-2 px-6 rounded-lg hover:from-orange-500 hover:to-pink-500 transition-all duration-300">
          <router-link to="/create" class="mail-link">Create email</router-link>
        </button>
      </div>

      <!-- Texte d'information sur l'utilisateur, aligné à droite -->
      <span class="text-gray-700 text-md font-medium ml-auto">
        User: {{ user ? user.name : 'Not logged in' }}
      </span>
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
</style>