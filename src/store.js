import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // Utilisateur connecté
    emails: [],  // Liste des emails normalisés
  },
  mutations: {
    setUser(state, user) {
      // Normaliser les données de l'utilisateur
      state.user = {
        id: user.id,               // ID de l'utilisateur
        name: user.name,           // Nom de l'utilisateur
        email: user.email,         // Email de l'utilisateur
        provider: user.provider || 'Microsoft',  // Moyen de connexion
      };
    },
    addEmail(state, email) {
      // Normaliser l'email
      const normalizedEmail = {
        id: email.id,             // ID de l'email
        subject: email.subject,   // Sujet de l'email
        body: email.body,         // Corps de l'email
        userId: state.user?.id,   // ID de l'utilisateur auquel appartient l'email
      };
      state.emails.push(normalizedEmail);  // Ajouter le nouvel email normalisé
    },
    deleteEmail(state, emailId) {
      // Suppression de l'email
      state.emails = state.emails.filter(email => email.id !== emailId);
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
    currentUser: state => state.user,  // Récupérer l'utilisateur actuel

    userEmails: (state) => {
      return state.emails.filter(email => email.userId === state.user?.id);
    },

    getEmailById: (state) => (id) => {
      return state.emails.find(email => email.id === id && email.userId === state.user?.id);
    }
  }
});
