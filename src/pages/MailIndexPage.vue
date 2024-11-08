<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- Conteneur avec Flexbox pour aligner les éléments sur la même ligne -->
    <div class="flex justify-between items-center mb-6">
      <!-- Page Title -->
      <h1 class="text-4xl font-extrabold bg-gradient-to-r from-orange-300 via-pink-300 to-blue-300 text-transparent bg-clip-text mb-4">Your Emails</h1>


      <!-- Refresh Button -->
      <button @click="refreshEmails" class="bg-gradient-to-r from-blue-300 to-teal-400 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-500 hover:to-teal-600 transition-all duration-300">Refresh</button>
    </div>

    <!-- Search Bar -->
    <div class="flex gap-4 mb-6">
      <div class="flex items-center space-x-2">
        <label for="search" class="text-lg font-medium text-gray-700">Search:</label>
        <input
            type="text"
            v-model="searchTerm"
            placeholder="By sender or keyword"
            class="input input-bordered w-64 text-gray-700"
        />
      </div>
      <div class="flex items-center space-x-2">
        <label for="date" class="text-lg font-medium text-gray-700">Date:</label>
        <input
            type="date"
            v-model="searchDate"
            class="input input-bordered text-gray-700"
        />
      </div>
    </div>

    <!-- Email Display Limit Selector -->
    <div class="mb-6">
      <label for="limit" class="text-lg font-medium text-gray-700">Number of emails to display:</label>
      <select v-model="emailLimit" class="select select-bordered text-gray-700">
        <option v-for="limit in limits" :key="limit" :value="limit">{{ limit }}</option>
      </select>
    </div>

    <!-- Column Headers -->
    <div class="grid grid-cols-3 w-full text-sm font-semibold text-gray-600 bg-gray-200 p-3 rounded-lg mb-4">
      <!-- Recipient aligned left -->
      <div class="justify-start text-left ml-4">Recipient</div>

      <!-- Subject aligned center -->
      <div class="justify-center text-center">Subject</div>

      <!-- Date-Time aligned right -->
      <div class="justify-end text-right mr-4">Date - Time</div>
    </div>

    <!-- Check if no emails are found -->
    <div v-if="limitedEmails.length === 0" class="text-center text-red-600 mb-6">
      No emails found.
    </div>

    <!-- List of Emails -->
    <div v-for="email in limitedEmails" :key="email.id">
      <EmailItem :email="email" @delete-email="handleDeleteEmail" />
    </div>
  </div>
</template>

<script>
import EmailItem from './../components/EmailItem.vue'; // Import EmailItem component
import { fetchUserEmails } from '@/lib/microsoftGraph'; // Import email fetching function

export default {
  name: 'MailIndexPage',
  components: {
    EmailItem
  },
  data() {
    return {
      searchTerm: '',  // Search term
      searchDate: '',  // Search date
      emailLimit: 5,   // Default limit of emails to show
      limits: [5, 10, 15, 20] // Options for number of emails to show
    };
  },
  computed: {
    userEmails() {
      return this.$store.getters.userEmails;  // Get logged-in user's emails from store
    },
    filteredEmails() {
      // Filter emails based on search term and date
      const filtered = this.userEmails.filter(email => {
        const normalizedEmail = {
          id: email.id,
          subject: email.object, // Using subject instead of object
          destinataire: email.destinataire,
          content: email.content,
          receivedDateTime: email.receivedDateTime,
          webLink: email.webLink,
          userId: email.userId,
        };

        const matchesTerm = this.searchTerm ?
            normalizedEmail.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            normalizedEmail.destinataire.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;

        const matchesDate = this.searchDate ? normalizedEmail.receivedDateTime.startsWith(this.searchDate) : true;

        return matchesTerm && matchesDate; // Return true if both conditions are met
      });

      // Sort emails from most recent to oldest
      return filtered.sort((a, b) => new Date(b.receivedDateTime) - new Date(a.receivedDateTime));
    },
    limitedEmails() {
      // Limit the number of emails shown
      return this.filteredEmails.slice(0, this.emailLimit);
    }
  },
  methods: {
    handleDeleteEmail(emailId) {
      // Here, you can call a Vuex action to delete the email, or delete it directly
      this.$store.dispatch('deleteEmail', emailId); // Make sure this action exists
    },
    async refreshEmails() {
      const accessToken = this.$store.getters.getaccessToken; // Get access token
      await fetchUserEmails(accessToken); // Call function to fetch emails
      console.log('Emails refreshed successfully');
    },
    logEmailsToConsole() {
      console.log('Emails in store:', this.userEmails);
    }
  },
  mounted() {
    // Log emails to console when the component mounts
    this.logEmailsToConsole();
  }
};
</script>

<style scoped>
/* No additional CSS needed thanks to Tailwind and DaisyUI */
</style>