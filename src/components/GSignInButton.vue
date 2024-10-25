<template>
  <div v-if="loggedIn">
    <h2 v-if="user && user.name">Bienvenue, {{ user.name }}!</h2>
    <button @click="logout">Se déconnecter</button>
  </div>
  <div v-else>
    <button @click="handleSignIn">Se connecter avec Google</button>
  </div>
</template>

<script>
import { signIn, getUserProfile, signOut, fetchGmailEmails,getMessageById } from '@/lib/GmailService'; // Assurez-vous que ces fonctions existent
import { mapMutations } from 'vuex';
import { gapi } from "gapi-script";

export default {
  data() {
    return {
      loggedIn: false,
      user: null,
    };
  },
  methods: {
    ...mapMutations(['setUser', 'setAccessToken', 'addEmail']), // Importer les mutations nécessaires

    async handleSignIn() {
      try {
        await signIn();
        this.loggedIn = true;

        const profile = await getUserProfile();
        console.log("Profil utilisateur récupéré :", profile);
        this.user = profile;

        const normalizedUser = {
          name: this.user.name || 'Nom inconnu',
          email: this.user.email,
          id: this.user.id,
          provider: 'Google',
        };

        console.log("Utilisateur normalisé :", normalizedUser);
        this.setUser(normalizedUser);

        const accessToken = gapi.auth.getToken().access_token;
        this.setAccessToken(accessToken);

        // Récupérer les IDs des emails Gmail
        const emailIds = await fetchGmailEmails(accessToken);

        // Pour chaque ID, récupérer les détails de l'email et les normaliser
        for (const emailId of emailIds) {

          const emailResponse = await getMessageById(emailId.id);
          console.log(emailResponse)
          const email = emailResponse.result; // Assurez-vous que le format est correct

          // Normaliser l'email
          const normalizedEmail = {
            id: email.id,
            object: email.payload.subject, // Utilisez le champ approprié ici
            destinataire: email.payload.headers.find(header => header.name === 'To')?.value || 'Pas de destinataire',
            content: email.snippet || 'Pas de contenu', // Utilisez le champ approprié ici
            receivedDateTime: email.internalDate, // Assurez-vous que ce champ est présent
            webLink: `https://mail.google.com/mail/u/0/#inbox/${email.id}`, // URL de l'email
            userId: this.user.id // ID de l'utilisateur pour l'association
          };

          // Appeler la mutation addEmail pour ajouter l'email normalisé
          this.addEmail(normalizedEmail);
        }

      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
      }
    },



    logout() {
      signOut();
      this.loggedIn = false;
      this.user = null;
      this.setUser(null);
      this.setEmails([]);
    }
  }
}
</script>

<style scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
