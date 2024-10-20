<template>
  <button @click="handleClick" class="sign-in-button">
    <img src="../assets/microsoft-icon.png" alt="Microsoft Logo" class="icon" />
    <span>Se connecter avec Microsoft</span>
  </button>
</template>

<script>
import { signInAndGetUser } from '@/lib/microsoftGraph';
import { mapMutations } from 'vuex';

export default {
  name: 'SignInButton',
  methods: {
    ...mapMutations(['setUser']),

    async handleClick() {
      try {
        const user = await signInAndGetUser();

        // Normalisation des données
        const normalizedUser = {
          name: user.name,             // Nom de l'utilisateur
          email: user.username,        // Email de l'utilisateur
          id: user.tenantId,           // ID de l'utilisateur
          provider: 'Microsoft',        // Fournisseur (ici Microsoft)
        };

        console.log('User Info:', normalizedUser);

        // Mise à jour du store avec l'utilisateur normalisé
        this.setUser(normalizedUser);
      } catch (error) {
        console.error('Error during sign-in:', error);
      }
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
  padding: 0.5rem 0.7rem;                    /* Espacement intérieur */
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
