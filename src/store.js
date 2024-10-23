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
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken; // Mutation pour définir le token d'accès
    },
    addEmail(state, email) {
      // Normalize the email
      const normalizedEmail = {
        id: email.id,
        object: email.object, // Changer destinataire en subject
        destinataire : email.destinataire ,  
        content  : email.content,   // Changer content en from
        receivedDateTime: email.receivedDateTime, // Changer date
        webLink: email.webLink,
        userId: email.userId,   // Garder le userId pour le filtrage
      };
      state.emails.push(normalizedEmail);  // Add the new normalized email
    },
    deleteEmail(state, emailId) {
      // Remove the email
      state.emails = state.emails.filter(email => email.id !== emailId);
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
    }
  },
  getters: {
    currentUser: state => state.user,  // Get the current user
    getaccessToken: state => state.accessToken, // Récupère le token d'accès

    userEmails: (state) => {
      return state.emails.filter(email => email.userId === state.user?.id);
    },

    getEmailById: (state) => (id) => {
      return state.emails.find(email => email.id === id && email.userId === state.user?.id);
    }
  }
});
