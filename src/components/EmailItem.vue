<template>
  <div class="email-item">
    <router-link :to="{ name: 'MailShow', params: { id: email.id } }" class="email-link">
      <div class="email-details">
        <div class="email-recipient">{{ email.destinataire }}</div>
        <div class="email-subject">{{ email.object }}</div>
        <div class="email-preview">{{ getEmailPreview(email.content) }}...</div>
        <div class="email-timestamp">{{ formatDate(email.receivedDateTime) }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import DOMPurify from 'dompurify';
export default {
  name: 'EmailItem',
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteEmail() {
      this.$emit('delete-email', this.email.id); // Émet un événement pour supprimer l'email
    },
    getEmailPreview(content) {
        // Nettoyer le contenu HTML
        const cleanHTML = DOMPurify.sanitize(content);

        // Créer un élément temporaire pour analyser le contenu
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cleanHTML;

        // Fonction pour extraire le texte en ignorant les commentaires
        const extractTextIgnoringComments = (element) => {
            let text = '';

            // Parcourir tous les nœuds de l'élément
            for (const node of element.childNodes) {
                // Ignorer les commentaires
                if (node.nodeType === Node.TEXT_NODE) {
                    text += node.textContent; // Ajouter le texte
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Ignorer les balises <style> et <script>
                    if (node.tagName !== 'STYLE' && node.tagName !== 'SCRIPT') {
                        text += extractTextIgnoringComments(node); // Appel récursif
                    }
                } else if (node.nodeType === Node.COMMENT_NODE) {
                    // Ne rien faire pour les commentaires
                    continue;
                }
            }

            return text;
        };

        // Extraire le texte
        let emailPreview = extractTextIgnoringComments(tempDiv);

        emailPreview = emailPreview.replace(/\n/g, ' ');

        return emailPreview.trim().substring(0,30); // Supprimer les espaces inutiles en début et fin
    },
    formatDate(dateString) {
        const date = new Date(dateString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
            hour12: false
        };

        return date.toLocaleDateString('fr-FR', options);
    }
  }
};
</script>



<style scoped>
.email-item {
  display: grid; /* Utilisation de grid pour la disposition */
  grid-template-columns: repeat(5, 1fr); /* 5 colonnes de largeur égale */
  align-items: center; /* Centrer verticalement les éléments */
  margin: 1rem 0; /* Marge verticale pour l'espacement entre les emails */
  color: white;
  background-color: orange;
  padding: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
}

.email-link {
  grid-column: span 4; /* Prend les 4 premières colonnes pour le lien */
  text-decoration: none; /* Enlève le soulignement du lien */
  color: inherit; /* Récupère la couleur du texte parent */
}

.email-details {
  display: grid; /* Utilisation de grid pour les détails de l'email */
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes pour les détails */
  width: 100%; /* Prend toute la largeur */
}


.delete-button {
  background-color: red; /* Couleur du bouton supprimer */
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer; /* Curseur pointer pour indiquer que c'est cliquable */
  transition: background-color 0.2s; /* Transition pour l'effet au survol */
}

.delete-button:hover {
  background-color: darkred; /* Couleur au survol du bouton supprimer */
}
</style>
