<template>
  <div v-if="email">
    <h1>Détails de l'email</h1>
    <p><strong>Destinataire:</strong> {{ email.destinataire }}</p>
    <p><strong>Objet:</strong> {{ email.objet }}</p>
    <p><strong>Contenu:</strong> {{ email.content }}</p>
    <p><strong>Date:</strong> {{ email.date }}</p>
    <p><strong>Heure:</strong> {{ email.heure }}</p>
    
    <!-- Bouton de suppression -->
    <button @click="deleteEmail(email.id)">Supprimer cet email</button>
  </div>
  <div v-else>
    <p>Email introuvable.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MailShowPages',
  computed: {
    ...mapGetters(['getEmailById']),
    email() {
      const id = parseInt(this.$route.params.id, 10);
      return this.getEmailById(id);
    }
  },
  methods: {
    deleteEmail(emailId) {
      // Appel à l'action pour supprimer l'email
      this.$store.dispatch('deleteEmail', emailId);
      this.$router.push({ name: 'MailIndex' }); // Redirection vers la liste des mails
    }
  }
};
</script>

<style scoped>
/* Add any styles you want */
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
