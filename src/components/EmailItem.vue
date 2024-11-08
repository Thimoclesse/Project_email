<template>
  <div class="email-item bg-base-100 shadow-md rounded-lg p-4 mb-4 hover:bg-gray-50 transition-all duration-300">
    <!-- Lien vers la page détaillée de l'email -->
    <router-link
        :to="{ name: 'MailShow', params: { id: email.id } }"
        class="email-link flex flex-col w-full">

      <!-- Détails principaux de l'email (Destinataire, Objet, Date) -->
      <div class="email-details flex w-full mb-2">
        <!-- Destinataire -->
        <div class="email-recipient text-sm font-medium text-gray-700 truncate w-1/3 ">{{ email.destinataire }}</div>

        <!-- Objet -->
        <div class="email-subject text-sm font-semibold text-gray-800 w-1/3 truncate ml-6 mr-6" >{{ email.object }}</div>

        <!-- Date et Heure de réception -->
        <div class="email-timestamp text-sm text-gray-500 w-1/3">{{ formatDate(email.receivedDateTime) }}</div>
      </div>

      <!-- Aperçu du contenu de l'email en bas -->
      <div class="email-preview text-sm text-gray-600 mt-2 text-left">
        {{ getEmailPreview(email.content) }}
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

      // Limiter le texte à 100 caractères et ajouter "..." si le texte est trop long
      const maxLength = 70; // Limite de caractères
      if (emailPreview.length > maxLength) {
        emailPreview = emailPreview.substring(0, maxLength) + '...'; // Ajouter des points de suspension
      }

      return emailPreview.trim(); // Retourner l'aperçu avec la limite de caractères
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
/* Le CSS est dans le fichier global mais peut être ajouté en scoped si tu veux limiter l'effet */
.email-preview {
  @apply text-sm text-gray-600 mt-2;

  /* Empêcher le texte de déborder et ajouter des points de suspension si trop long */
  overflow: hidden;  /* Masque le texte qui dépasse */
  text-overflow: ellipsis;  /* Affiche des "..." à la fin du texte si trop long */
  white-space: nowrap;  /* Empêche le texte de se mettre à la ligne */
}</style>