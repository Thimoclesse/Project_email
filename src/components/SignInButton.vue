<template>
  <div>
    <button @click="handleClick" class="sign-in-button">
      <img src="../assets/microsoft-icon.png" alt="Microsoft Logo" class="icon" />
      <span>Se connecter avec Microsoft</span>
    </button>

    <!-- Afficher le token d'accès pour vérification -->
    <div v-if="accessToken">
      <p>Token d'accès : {{ accessToken }}</p>
    </div>

    <div v-if="userEmails && userEmails.length">
      <h3>Vos Emails :</h3>
      <ul>
        <li v-for="email in userEmails" :key="email.id">
          <a :href="email.webLink" target="_blank">{{ email.object }}</a>
          <p>De: {{ email.destinataire }}</p>
          <p>Date: {{ new Date(email.receivedDateTime).toLocaleString() }}</p>
          <button @click="deleteEmail(email.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { signInAndGetUser } from '@/lib/microsoftGraph';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'SignInButton',
  computed: {
    ...mapGetters(['userEmails']), // Mapper les getters pour accéder aux emails et au token
  },
  methods: {
    ...mapMutations(['setUser', 'addEmail', 'deleteEmail', 'setAccessToken']), // Mapper les mutations

    async handleClick() {
      try {
        const { account, emails, accessToken } = await signInAndGetUser();
        console.log("Token récupéré : " + accessToken);
        
        this.setAccessToken(accessToken); // Appeler l'action pour sauvegarder le token
        console.log("Token sauvegardé");

        // Normalisation des données
        const normalizedUser = {
          name: account.name,
          email: account.username,
          id: account.tenantId,
          provider: 'Microsoft',
          emails: this.normalizeEmails(emails) // Normaliser les emails
        };

        // Mise à jour du store avec l'utilisateur normalisé
        this.setUser(normalizedUser);

        // Ajouter les emails au store
        normalizedUser.emails.forEach(email => {
          this.addEmail({ ...email, userId: normalizedUser.id }); // Ajouter userId pour la normalisation
        });
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }
    },

    // Fonction pour normaliser les emails
    normalizeEmails(emails) {
      return emails.map(email => ({
        id: email.id,
        object: email.subject || "Pas de sujet",
        content: email.body.content || "pas de body",
        destinataire: email.from ? email.from.emailAddress.name : "Inconnu",
        receivedDateTime: email.receivedDateTime,
        webLink: email.webLink
      }));
    }
  }
}
</script>


<style scoped>
.sign-in-button {
  background-color: white;               /* Fond blanc */
  color: #4285F4;                        /* Couleur du texte (couleur Google) */
  border: 1px solid #dcdcdc;             /* Légère bordure grise */
  border-radius: 5px;                    /* Coins arrondis */
  padding: 0.5rem 0.7rem;                /* Espacement intérieur */
  cursor: pointer;                        /* Curseur en forme de main */
  transition: transform 0.2s, box-shadow 0.2s; /* Transition pour l'effet d'ombre */
  display: flex;                         /* Pour aligner l'icône et le texte */
  align-items: center;                   /* Centrer verticalement le contenu */
  margin: 1rem;
}

.sign-in-button:hover {
  transform: scale(1.02);                /* Légère augmentation à l'hover */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Ajout d'une ombre légère au survol */
}

.icon {
  width: 20px;                           /* Largeur de l'icône */
  height: auto;                          /* Hauteur automatique pour conserver le ratio */
  margin-right: 10px;                    /* Espace entre l'icône et le texte */
}
</style>
