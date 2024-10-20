import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // Initialize user as null by default
    emails: [],  // List of normalized emails
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addEmail(state, email) {
      // Normalize the email
      const normalizedEmail = {
        id: email.id,             // ID of the email
        subject: email.subject,   // Subject of the email
        body: email.body,         // Body of the email
        userId: state.user?.id,   // ID of the user owning the email
      };
      state.emails.push(normalizedEmail);  // Add the new normalized email
    },
    deleteEmail(state, emailId) {
      // Remove the email
      state.emails = state.emails.filter(email => email.id !== emailId);
    }
  },
  actions: {
    addEmail({ commit }, email) {
      commit('addEmail', email);  // Call the mutation to add the email
    },
    deleteEmail({ commit }, emailId) {
      commit('deleteEmail', emailId);  // Call the mutation to delete the email
    }
  },
  getters: {
    currentUser: state => state.user,  // Get the current user

    userEmails: (state) => {
      return state.emails.filter(email => email.userId === state.user?.id);
    },

    getEmailById: (state) => (id) => {
      return state.emails.find(email => email.id === id && email.userId === state.user?.id);
    }
  }
});