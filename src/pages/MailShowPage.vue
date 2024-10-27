<template>
  <div v-if="email">
    <h1>Détails de l'email</h1>
    <div class="email-content"> <!-- Ajout d'une classe pour le style -->
      <p><strong>Destinataire:</strong> {{ email.destinataire }}</p>
      <p><strong>Objet:</strong> {{ email.object }}</p>
      <p><strong>Contenu:</strong></p>
      <div v-html="cleanedContent"></div>
      <p><strong>Date:</strong> {{ email.receivedDateTime }}</p>

      <button @click="deleteEmail(email.id)">Supprimer cet email</button>
    </div>
  </div>
  <div v-else>
    <p>Email introuvable.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLinkPreview } from 'link-preview-js';
import { deleteEmail as deleteEmailFromAPI } from './../lib/microsoftGraph.js'; // Assurez-vous d'importer la fonction de suppression

export default {
  name: 'MailShowPages',
  data() {
    return {
      linkPreviews: {} // Stocker les prévisualisations des liens
    };
  },
  computed: {
    ...mapGetters(['getEmailById', 'getaccessToken']),
    email() {
      const id = this.$route.params.id; // Pas de conversion nécessaire
      return this.getEmailById(id);
    },
    cleanedContent() {
      const content = this.cleanEmailContent(this.email.content);
      this.extractLinks(content); // Extraire les liens pour les prévisualisations
      return content;
    }
  },
  methods: {
    async deleteEmail(emailId) {
      // Récupérer le token d'accès de l'utilisateur
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
    },
    cleanEmailContent(content) {
      // Remplacer les caractères mal encodés et décoder les entités HTML
      return content
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'") // Correction pour remplacer par une apostrophe
          .replace(/Ã©/g, 'é')
          .replace(/Ã¨/g, 'è')
          .replace(/Ã/g, 'à')
          .replace(/Â/g, 'â') // Conserve les caractères accentués
          .replace(/â€œ/g, '“')
          .replace(/â€/g, '”')
          .replace(/â€“/g, '–')
          .replace(/â/g, "'")
          .replace(/( {2,})/g, ' ') // Remplacer les espaces multiples par un seul espace
          .replace(/lâ/g, 'l') // Corriger les 'l' mal interprétés
          .replace(/câ/g, 'c') // Corriger les 'c' mal interprétés
          .replace(/tâ/g, 't') // Corriger les 't' mal interprétés
          .replace(/’/g, '’') // Corriger les apostrophes typographiques
          .replace(/ç/g, 'ç') // S'assurer que 'ç' soit correct
          .replace(/([.,!?;])\s+/g, '$1 ') // Éliminer les espaces après la ponctuation
          .replace(/à»/g, 'û')

          .replace(/ +/g, ' ') // Enlever les espaces multiples
          .trim(); // Enlever les espaces au début et à la fin
    },
    async extractLinks(content) {
      const urlRegex = /(https?:\/\/[^\s]+)/g; // Regex pour trouver les URLs
      const links = content.match(urlRegex);
      if (links) {
        for (const link of links) {
          if (!this.linkPreviews[link]) {
            // Vérifiez si nous avons déjà une prévisualisation pour ce lien
            try {
              const preview = await getLinkPreview(link);
              this.$set(this.linkPreviews, link, preview); // Ajoutez la prévisualisation au state
            } catch (error) {
              console.error("Erreur lors de l'extraction de la prévisualisation :", error);
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.email-content {  /* Nouvelle classe pour le contenu de l'email */
  width: 50%;      /* Largeur de 50% */
  margin: 0 auto;  /* Centre le conteneur horizontalement */
  text-align: left; /* Aligne le texte à gauche */
  font-size: 1rem;
  white-space: nowrap; /* Évite les sauts de ligne */
  overflow: hidden; /* Cache le texte qui déborde */
  text-overflow: ellipsis; /* Ajoute des points de suspension si le texte est trop long */
}


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
