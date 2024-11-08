<template>
  <div v-if="email" class="bg-white p-6 rounded-lg shadow-lg w-fit mx-auto">
    <!-- Header Section (Titres) -->
    <div class="text-left mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">{{ email.object }}</h1>
      <p class="text-sm text-gray-500 mt-2"><strong>From:</strong> {{ email.from }}</p>
      <p class="text-sm text-gray-500"><strong>Date:</strong> {{ email.receivedDateTime }}</p>
    </div>

    <!-- Content Section -->
    <div v-if="email && email.content" class="text-left mb-6">
      <!-- Affichage brut du contenu HTML -->
      <div v-html="email.content" class="text-gray-700 mt-2 max-w-full">
      </div>
      <LinkPreview v-for="(preview, link) in linkPreviews" :key="link" :url="link" :preview="preview" />
    </div>
    <div v-else>
      <p>No content available.</p>
    </div>

    <!-- Button to Delete Email -->
    <div class="mt-6">
      <button @click="deleteEmail(email.id)" class="btn btn-error w-full max-w-[10rem]">Delete Email</button>    </div>
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
    }
  },

  mounted() {
    this.extractLinks(this.email.content);
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
    },

    formatSize(bytes) {
      const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 B';
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      if (i === 0) return bytes + ' ' + sizes[i];
      return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }
  }
};
</script>
<style scoped>
/* Pas besoin de styles personnalisés, tout est géré par Tailwind et DaisyUI */
</style>