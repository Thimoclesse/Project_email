<template>
  <div>
    <h1>Créer un nouvel email</h1>
    <form @submit.prevent="addEmail">
      <label>Destinataire:</label>
      <input v-model="email.destinataire" required />

      <label>Objet:</label>
      <input v-model="email.objet" required />

      <label>Contenu:</label>
      <textarea v-model="email.content" required></textarea>

      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import { sendEmail, fetchUserEmails } from '@/lib/microsoftGraph'; // Assurez-vous que le chemin est correct

export default {
  name: 'MailCreatePage',
  data() {
    return {
      email: {
        destinataire: '',
        objet: '',
        content: ''
      }
    };
  },
  methods: {
    async addEmail() {
      const now = new Date();
      const formattedDate = now.toISOString().split('T')[0]; // Date actuelle formatée YYYY-MM-DD
      const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5); // Heure actuelle formatée HH:MM

      const currentUser = this.$store.getters.currentUser;  // Récupérer l'utilisateur connecté

      if (!currentUser) {
        console.log('Vous devez être connecté pour créer un email.');
        return;
      }

      const newEmail = {
        to: this.email.destinataire, // Destinataire
        subject: this.email.objet,    // Objet
        body: this.email.content,      // Contenu
        date: formattedDate,
        heure: formattedTime,
        userId: currentUser.id,       // Associer l'email à l'utilisateur connecté
        id: Date.now()
      };

      try {
        // Récupérer le token d'accès
        const accessToken = this.$store.getters.getaccessToken;

        // Envoyer l'email
        await sendEmail(accessToken, newEmail);
        console.log('Email envoyé avec succès');

        // Récupérer les emails mis à jour
        const userEmails = await fetchUserEmails(accessToken);
        console.log("Emails récupérés :", userEmails);

        // Ajouter l'email au store
        this.$store.dispatch('addEmail', newEmail);

        // Rediriger vers la liste des mails
        this.$router.push({ name: 'MailIndex' });

      } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

label {
  margin: 0.5rem 0;
}

input, textarea {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

button {
  padding: 0.5rem;
  background-color: orange;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
