<template>
  <div v-if="email">
    <h1>Détails de l'email</h1>
    <p><strong>Destinataire:</strong> {{ email.destinataire }}</p>
    <p><strong>Objet:</strong> {{ email.object }}</p>
    <p><strong>Contenu:</strong></p>
    <div v-html="email.content"></div>
    <p><strong>Date:</strong> {{ email.receivedDateTime }}</p>

    <button @click="deleteEmail(email.id)">Supprimer cet email</button>
  </div>
  <div v-else>
    <p>Email introuvable.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { deleteEmail as deleteEmailFromAPI } from './../lib/microsoftGraph.js'; // Assurez-vous d'importer la fonction de suppression

export default {
  name: 'MailShowPages',
  computed: {
    ...mapGetters(['getEmailById','getaccessToken']),
    email() {
      const id = this.$route.params.id; // Pas de conversion nécessaire
      return this.getEmailById(id);
    }
  },
  methods: {
    async deleteEmail(emailId) {
      // Récupérer le token d'accès de l'utilisateur (assurez-vous qu'il est stocké quelque part)
      const accessToken = this.getaccessToken; 
      console.log("Token d'accès :", accessToken);

      try {
        // Appel à l'API pour supprimer l'email
        await deleteEmailFromAPI(accessToken, emailId);
        this.$store.dispatch('deleteEmail', emailId); // Suppression de l'email de l'état Vuex
        this.$router.push({ name: 'MailIndex' }); // Redirection vers la liste des mails
      } catch (error) {
        console.error("Erreur lors de la suppression de l'email :", error);
        alert("Une erreur s'est produite lors de la suppression de l'email."); // Alerte en cas d'erreur
      }
    }
  }
};
</script>

<style scoped>
button {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
