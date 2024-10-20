<template>
  <div>
    <h1>Vos Emails</h1>
    
    <!-- Barre de recherche -->
    <div class="search-bar">
      <label for="search">Rechercher des emails :</label>
      <input type="text" v-model="searchTerm" placeholder="Par expéditeur ou mot-clé" class="search-input"/>
      <label for="date">Date :</label>
      <input type="date" v-model="searchDate" class="date-input"/>
    </div>
    
    <!-- Sélecteur de nombre d'emails à afficher -->
    <div class="limit-selector">
      <label for="limit">Nombre d'emails à afficher :</label>
      <select v-model="emailLimit" class="limit-select">
        <option v-for="limit in limits" :key="limit" :value="limit">{{ limit }}</option>
      </select>
    </div>

    <!-- En-tête des colonnes -->
    <div class="email-header">
      <div class="header-item">Destinataire</div>
      <div class="header-item">Objet</div>
      <div class="header-item">Aperçu</div>
      <div class="header-item">Date - Heure</div>
    </div>

    <!-- Vérification si des emails sont trouvés -->
    <div v-if="limitedEmails.length === 0" class="no-emails">
      Aucun email trouvé.
    </div>

    <div v-for="email in limitedEmails" :key="email.id">
      <EmailItem :email="email" @delete-email="handleDeleteEmail" />
    </div>
  </div>
</template>

<script>
import EmailItem from './../components/EmailItem.vue'; // Assurez-vous d'importer le composant

export default {
  name: 'MailIndexPage',
  components: {
    EmailItem
  },
  data() {
    return {
      searchTerm: '',  // Mot-clé de recherche
      searchDate: '',  // Date de recherche
      emailLimit: 5,   // Limite par défaut d'emails à afficher
      limits: [5, 10, 15, 20] // Options pour le nombre d'emails à afficher
    };
  },
  computed: {
    userEmails() {
      return this.$store.getters.userEmails;  // Récupérer les emails de l'utilisateur connecté
    },
    filteredEmails() {
      // Filtrer les emails selon le terme de recherche et la date
      const filtered = this.userEmails.filter(email => {
        const matchesTerm = this.searchTerm ? 
          email.objet.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
          email.destinataire.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;

        const matchesDate = this.searchDate ? email.date === this.searchDate : true;

        return matchesTerm && matchesDate; // Retourner vrai si les deux conditions sont satisfaites
      });

      // Trier les emails du plus récent au plus ancien
      return filtered.sort((a, b) => new Date(b.date + 'T' + b.heure) - new Date(a.date + 'T' + a.heure));
    },
    limitedEmails() {
      // Limiter le nombre d'emails affichés
      return this.filteredEmails.slice(0, this.emailLimit);
    }
  },
  methods: {
    handleDeleteEmail(emailId) {
      // Ici, vous pouvez appeler une action Vuex pour supprimer l'email, ou le supprimer directement
      this.$store.dispatch('deleteEmail', emailId); // Assurez-vous que cette action existe
    }
  }
};
</script>

<style scoped>
/* Style de la barre de recherche */
.search-bar {
  margin-bottom: 1rem; /* Marge inférieure pour l'espacement */
}

.search-bar label {
  margin-right: 0.5rem; /* Espacement entre l'étiquette et l'input */
}

.search-input, .date-input {
  padding: 0.5rem; /* Espacement intérieur */
  margin-right: 1rem; /* Espacement entre les champs */
  border-radius: 0.5rem; /* Coins arrondis */
  border: 1px solid #ccc; /* Bordure légère */
  width: 200px; /* Largeur fixe */
}

.search-input:focus, .date-input:focus {
  border-color: orange; /* Changer la couleur de la bordure au focus */
}

/* Style du sélecteur de nombre d'emails */
.limit-selector {
  margin-bottom: 1rem; /* Marge inférieure pour l'espacement */
}

.limit-select {
  padding: 0.5rem; /* Espacement intérieur */
  border-radius: 0.5rem; /* Coins arrondis */
  border: 1px solid #ccc; /* Bordure légère */
  margin-left: 0.5rem; /* Espacement entre le label et le select */
}

.limit-select:focus {
  border-color: orange; /* Changer la couleur de la bordure au focus */
}

/* Style des éléments d'email */
.email-item {
  display: block;  /* Permet à chaque mail d'être sur une nouvelle ligne */
  margin: 1rem 0; /* Marge verticale pour l'espacement entre les emails */
  color: white;
  background-color: orange;
  padding: 0.7rem;
  border-radius: 0.5rem;
  text-decoration: none;
}

/* Style de l'en-tête des emails */
.email-header {
  display: flex; /* Utilisation de flexbox pour l'alignement */
  justify-content: space-between; /* Espace entre les éléments */
  font-weight: bold; /* Mettre les en-têtes en gras */
  color: white; /* Couleur du texte */
  background-color: orange; /* Couleur d'arrière-plan des en-têtes */
  padding: 0.5rem; /* Ajout de padding pour un meilleur espacement */
  border-radius: 0.5rem; /* Coins arrondis pour les en-têtes */
  margin-bottom: 1rem; /* Espacement en bas */
}

.header-item {
  flex: 1; /* Prendre une largeur égale pour chaque en-tête */
  text-align: center; /* Centrer le texte */
}

/* Style du message lorsqu'aucun email n'est trouvé */
.no-emails {
  color: red; /* Couleur du texte */
  background-color: orange; /* Couleur d'arrière-plan */
  padding: 0.5rem; /* Espacement intérieur */
  border-radius: 0.5rem; /* Coins arrondis */
  text-align: center; /* Centrer le texte */
  margin: 1rem 0; /* Marge pour l'espacement */
}
</style>
