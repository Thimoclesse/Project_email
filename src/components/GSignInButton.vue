<template>
  <div v-if="loggedIn">
    <h2 v-if="user && user.name">Bienvenue, {{ user.name }}!</h2>
    <button @click="logout" class="btn bg-red-500 text-white hover:bg-red-600">Se déconnecter</button>
  </div>
  <div v-else>
    <button @click="handleSignIn" class="btn-google flex items-center gap-2 p-2 border rounded-full shadow-md hover:shadow-lg">
      <!-- Icône Google (SVG) -->
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-6 h-6">
      <span class="text-gray-700 font-medium">Se connecter avec Google</span>
    </button>
  </div>
</template>

<script>
import {fetchGmailEmails, getMessageById, getUserProfile, signIn, signOut} from '@/lib/GmailService'; // Assurez-vous que ces fonctions existent
import {mapMutations} from 'vuex';
import {gapi} from "gapi-script";

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
          try {
            const emailResponse = await getMessageById(emailId.id); // Utilisation de l'ID de l'email
            const email = emailResponse.result; // Assurez-vous que le format est correct

            // Normaliser l'email
            const headers = email.payload.headers; // Récupérer les en-têtes de l'email
            const fromHeader = headers.find(header => header.name === 'From')?.value || 'Pas d\'expéditeur';
            console.log("Valeur du champ 'From' :", fromHeader); // Ajout d'un log pour inspecter le champ 'From'


            const subjectHeader = headers.find(header => header.name === 'Subject')?.value || 'Pas de sujet';

            // Conversion de l'heure en format lisible
            const receivedDateTime = new Date(parseInt(email.internalDate)).toLocaleString();

            // Extraire le contenu de l'email, gérer les multiples parties
            let emailContent = '';
            if (email.payload.parts) {
              const htmlPart = email.payload.parts.find(part => part.mimeType === 'text/html');
              if (htmlPart) {
                emailContent = htmlPart.body.data;
              } else {
                emailContent = email.payload.body.data; // Pour les emails avec une seule partie
              }
            } else if (email.payload.body.data) {
              emailContent = email.payload.body.data; // Pour les emails avec une seule partie
            }

            // Affichage du contenu brut avant décodage

            // Décodage du contenu en base64
            if (emailContent) {
              emailContent = atob(emailContent.replace(/-/g, '+').replace(/_/g, '/'));
            }

            console.log("Contenu brut de l'email après décodage :", emailContent);

            const normalizedEmail = {
              id: email.id,
              object: subjectHeader, // Utilisation de subjectHeader pour l'objet
              destinataire: fromHeader, // Utilisation de fromHeader pour le destinataire
              content: emailContent, // Contenu décodé
              receivedDateTime: receivedDateTime, // Utilisation de la date convertie
              webLink: `https://mail.google.com/mail/u/0/#inbox/${email.id}`, // URL de l'email
              userId: this.user.id // ID de l'utilisateur pour l'association
            };
            // Appeler la mutation addEmail pour ajouter l'email normalisé
            this.addEmail(normalizedEmail);
          } catch (emailError) {
            console.error(`Erreur lors de la récupération de l'email avec l'ID ${emailId.id} :`, emailError);
          }
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
