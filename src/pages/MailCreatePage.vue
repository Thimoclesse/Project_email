<template>
  <div class="min-h-screen bg-gray-100 p-6">

    <!-- Page Title -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Create a New Email</h1>
    </div>

    <!-- Email Form -->
    <form @submit.prevent="addEmail" class="bg-white p-6 rounded-lg shadow-md">

      <!-- Recipient and Subject Fields (side by side) -->
      <div class="grid grid-cols-2 gap-4 mb-4">
        <!-- Recipient Field -->
        <div class="text-left">
          <label for="recipient" class="block text-lg font-medium text-gray-700">Recipient:</label>
          <input
              type="email"
              id="recipient"
              v-model="email.destinataire"
              class="w-full text-gray-700 mt-2 border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none"
              required
              placeholder="Enter recipient's email"
          />
        </div>

        <!-- Subject Field -->
        <div class="text-left">
          <label for="subject" class="block text-lg font-medium text-gray-700">Subject:</label>
          <input
              type="text"
              id="subject"
              v-model="email.objet"
              class="w-full text-gray-700 mt-2 border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none"
              required
              placeholder="Enter the subject"
          />
        </div>
      </div>
      <!-- Content Field -->
      <div class="mb-6">
        <label for="content" class="block text-lg font-medium text-gray-700 text-left">Content:</label>
        <textarea
            id="content"
            v-model="email.content"
            @input="resizeTextarea"
            ref="contentTextarea"
            class="w-full text-gray-700 mt-2 border-b-2 border-gray-300 focus:border-teal-500 focus:outline-none resize-none"
            required
            placeholder="Write your email content here"
        ></textarea>
      </div>


      <div class="flex justify-end">
        <button
            type="submit"
            class="bg-gradient-to-r from-blue-300 to-teal-400 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-500 hover:to-teal-600 transition-all duration-300"
        >
          Send Email
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { sendEmail, fetchUserEmails } from '@/lib/microsoftGraph'; // Make sure the path is correct

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
      const formattedDate = now.toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5); // Current time in HH:MM format

      const currentUser = this.$store.getters.currentUser;  // Get the logged-in user

      if (!currentUser) {
        console.log('You must be logged in to create an email.');
        return;
      }

      const newEmail = {
        to: this.email.destinataire, // Recipient
        subject: this.email.objet,    // Subject
        body: this.email.content,      // Content
        date: formattedDate,
        heure: formattedTime,
        userId: currentUser.id,       // Associate the email with the logged-in user
        id: Date.now()
      };

      try {
        // Get the access token
        const accessToken = this.$store.getters.getaccessToken;

        // Send the email
        await sendEmail(accessToken, newEmail);
        console.log('Email sent successfully');

        // Fetch updated emails
        const userEmails = await fetchUserEmails(accessToken);
        console.log("Fetched emails:", userEmails);

        // Add the new email to the store
        this.$store.dispatch('addEmail', newEmail);

        // Redirect to the email list page
        this.$router.push({ name: 'MailIndex' });

      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    resizeTextarea() {
      const textarea = this.$refs.contentTextarea;
      textarea.style.height = 'auto'; // Réinitialiser la hauteur pour calculer la nouvelle hauteur
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajuster la hauteur en fonction du contenu
    }
  }
};
</script>

<style scoped>
/* No additional CSS needed due to Tailwind and DaisyUI */
</style>