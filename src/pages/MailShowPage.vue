<template>
  <div v-if="email" class="bg-white p-6 rounded-lg shadow-lg w-2/5 mx-auto">
    <!-- Header Section (Titres) -->
    <div class="text-left mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">{{ email.object }}</h1>
      <p class="text-sm text-gray-500 mt-2"><strong>From:</strong> {{ email.destinataire }}</p>
      <p class="text-sm text-gray-500"><strong>Date:</strong> {{ email.receivedDateTime }}</p>
    </div>

    <!-- Content Section -->
    <div class="text-left mb-6">
      <p class="font-medium text-gray-700">Content:</p>
      <!-- Utilisation de v-html pour afficher le contenu HTML de l'email -->
      <div v-html="cleanedContent" class="text-gray-700 mt-2 whitespace-pre-wrap break-words text-left max-w-full">
      </div>
    </div>

    <!-- Button to Delete Email -->
    <div class="mt-6">
      <button @click="deleteEmail(email.id)" class="btn btn-error w-full">Delete Email</button>
    </div>
  </div>

  <div v-else>
    <p>Email not found.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLinkPreview } from 'link-preview-js';
import { deleteEmail as deleteEmailFromAPI } from './../lib/microsoftGraph.js';

export default {
  name: 'MailShowPages',
  data() {
    return {
      linkPreviews: {}
    };
  },
  computed: {
    ...mapGetters(['getEmailById', 'getaccessToken']),
    email() {
      const id = this.$route.params.id;
      return this.getEmailById(id);
    },
    cleanedContent() {
      const content = this.cleanEmailContent(this.email.content);
      this.extractLinks(content); // Extraction des liens pour prévisualisation
      return content;
    }
  },
  methods: {
    async deleteEmail(emailId) {
      const accessToken = this.getaccessToken;
      try {
        await deleteEmailFromAPI(accessToken, emailId);
        this.$store.dispatch('deleteEmail', emailId);
        this.$router.push({ name: 'MailIndex' });
      } catch (error) {
        console.error("Error while deleting email:", error);
        alert("An error occurred while deleting the email.");
      }
    },
    cleanEmailContent(content) {
      return content
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&apos;/g, "'")
          .replace(/Ã©/g, 'é')
          .replace(/Ã¨/g, 'è')
          .replace(/Ã/g, 'à')
          .replace(/Â/g, 'â')
          .replace(/â€œ/g, '“')
          .replace(/â€/g, '”')
          .replace(/â€“/g, '–')
          .replace(/â/g, "'")
          .replace(/( {2,})/g, ' ')
          .replace(/lâ/g, 'l')
          .replace(/câ/g, 'c')
          .replace(/tâ/g, 't')
          .replace(/’/g, '’')
          .replace(/ç/g, 'ç')
          .replace(/([.,!?;])\s+/g, '$1 ')
          .replace(/à»/g, 'û')
          .replace(/ +/g, ' ')
          .trim();
    },
    async extractLinks(content) {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const links = content.match(urlRegex);
      if (links) {
        for (const link of links) {
          if (!this.linkPreviews[link]) {
            try {
              const preview = await getLinkPreview(link);
              this.$set(this.linkPreviews, link, preview);
            } catch (error) {
              console.error("Error extracting link preview:", error);
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped>
/* Pas besoin de styles personnalisés, tout est géré par Tailwind et DaisyUI */
</style>