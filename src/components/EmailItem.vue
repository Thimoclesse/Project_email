<template>
    <div class="email-item">
      <router-link :to="{ name: 'MailShow', params: { id: email.id } }" class="email-link">
        <div class="email-details">
          <div class="email-subject">{{ email.objet }}</div>
          <div class="email-recipient">{{ email.destinataire }}</div>
          <div class="email-preview">{{ email.content.substring(0, 30) }}...</div> <!-- Affiche les 30 premiers caractères -->
          <div class="email-timestamp">{{ email.date }} - {{ email.heure }}</div>
        </div>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmailItem',
    props: {
      email: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteEmail() {
        this.$emit('delete-email', this.email.id); // Émet un événement pour supprimer l'email
      }
    }
  };
  </script>
  
  <style scoped>
  .email-item {
    display: grid; /* Utilisation de grid pour la disposition */
    grid-template-columns: repeat(5, 1fr); /* 5 colonnes de largeur égale */
    align-items: center; /* Centrer verticalement les éléments */
    margin: 1rem 0; /* Marge verticale pour l'espacement entre les emails */
    color: white;
    background-color: orange;
    padding: 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
  }
  
  .email-link {
    grid-column: span 4; /* Prend les 4 premières colonnes pour le lien */
    text-decoration: none; /* Enlève le soulignement du lien */
    color: inherit; /* Récupère la couleur du texte parent */
  }
  
  .email-details {
    display: grid; /* Utilisation de grid pour les détails de l'email */
    grid-template-columns: repeat(4, 1fr); /* 4 colonnes pour les détails */
    width: 100%; /* Prend toute la largeur */
  }
  
  
  .delete-button {
    background-color: red; /* Couleur du bouton supprimer */
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer; /* Curseur pointer pour indiquer que c'est cliquable */
    transition: background-color 0.2s; /* Transition pour l'effet au survol */
  }
  
  .delete-button:hover {
    background-color: darkred; /* Couleur au survol du bouton supprimer */
  }
  </style>
  