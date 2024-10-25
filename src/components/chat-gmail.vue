<template>
  <div>
    <button @click="handleSignIn">Se connecter avec Google</button>
    <button @click="fetchEmails" v-if="isSignedIn">Récupérer mes emails</button>

    <ul v-if="emails.length">
      <li v-for="email in emails" :key="email.id">
        <p><strong>De :</strong> {{ email.from }}</p>
        <p><strong>Sujet :</strong> {{ email.subject }}</p>
        <p><strong>Extrait :</strong> {{ email.snippet }}</p>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import {getMessageById, initClient, listMessages, signIn} from '@/GmailService';

export default {
  data() {
    return {
      isSignedIn: false,
      emails: []
    };
  },
  async created() {
    try {
      const gapi = await initClient();
      this.isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    } catch (error) {
      console.error("Erreur d'initialisation de gapi:", error);
    }
  },
  methods: {
    async handleSignIn() {
      try {
        await signIn();
        this.isSignedIn = true;
      } catch (error) {
        console.error("Erreur de connexion:", error);
      }
    },
    async fetchEmails() {
      try {
        const response = await listMessages();
        const messages = response.result.messages;

        // On récupère les détails de chaque email
        this.emails = await Promise.all(messages.map(async (msg) => {
          const email = await getMessageById(msg.id);
          const headers = email.result.payload.headers;

          // Extraction du sujet et de l'expéditeur
          const subject = headers.find(header => header.name === "Subject")?.value || "Sans sujet";
          const from = headers.find(header => header.name === "From")?.value || "Inconnu";
          const snippet = email.result.snippet;

          return {id: msg.id, subject, from, snippet};
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des emails:", error);
      }
    }
  }
};
</script>
