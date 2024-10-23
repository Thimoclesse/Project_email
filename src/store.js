import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // Initialize user as null by default
    emails: [],  // List of normalized emails
    accessToken: null, // Assurez-vous que accessToken est dans l'état
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken; // Mutation pour définir le token d'accès
    },
    addEmail(state, email) {
      // Normalize the email
      const normalizedEmail = {
        id: email.id,
        object: email.object,
        destinataire : email.destinataire,  
        content  : email.content,
        receivedDateTime: email.receivedDateTime,
        webLink: email.webLink,
        userId: email.userId,
      };
      state.emails.push(normalizedEmail);  // Add the new normalized email
    },
    deleteEmail(state, emailId) {
      // Remove the email
      state.emails = state.emails.filter(email => email.id !== emailId);
    },
    resetState(state) {
      // Reset user and emails to their initial state
      state.user = null;
      state.emails = [];
      state.accessToken = null; // Réinitialiser le token d'accès également
    }
  },
  actions: {
    setAccessToken({ commit }, accessToken) {
      commit('setAccessToken', accessToken); // Appelle la mutation pour définir le token d'accès
    },
    addEmail({ commit }, email) {
      commit('addEmail', email);  // Call the mutation to add the email
    },
    deleteEmail({ commit }, emailId) {
      commit('deleteEmail', emailId);  // Call the mutation to delete the email
    },
    resetUserData({ commit }) {
      commit('resetState'); // Appelle la mutation pour réinitialiser l'état
    }
  },
  getters: {
    currentUser: state => state.user,
    getaccessToken: state => state.accessToken,

    userEmails: (state) => {
      return state.emails.filter(email => email.userId === state.user?.id);
    },

    getEmailById: (state) => (id) => {
      return state.emails.find(email => email.id === id && email.userId === state.user?.id);
    }
  }
});
