import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // Utilisateur connecté
    emails: [],  // Liste des emails
  },
  mutations: {
    setUser(state, user) {
      state.user = user;  // Mettre à jour l'utilisateur connecté
    },
    addEmail(state, email) {
      state.emails.push(email);  // Ajouter un nouvel email
    },
    deleteEmail(state, emailId) {
        state.emails = state.emails.filter(email => email.id !== emailId);  // Suppression de l'email
    }
  },
  actions: {
    addEmail({ commit }, email) {
      commit('addEmail', email);  // Appeler la mutation pour ajouter l'email
    },
    deleteEmail({ commit }, emailId) {
        commit('deleteEmail', emailId);
    }
  },
  getters: {
    currentUser: state => state.user,  // Récupérer l'utilisateur actuel,
    
    userEmails: (state) => {
      return state.emails.filter(email => email.userId === state.user?.tenantId);
    },
    
    getEmailById: (state) => (id) => {
      return state.emails.find(email => email.id === id && email.userId === state.user?.tenantId);
    }
  }
});
