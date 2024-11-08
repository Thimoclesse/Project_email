<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <!-- Titre de la page -->
    <h1 class="text-4xl font-extrabold bg-gradient-to-r from-orange-300 via-pink-300 to-blue-300 text-transparent bg-clip-text mb-4">
      Welcome to MailKeeper
    </h1>

    <!-- Titres h2 avec effet de frappe -->
    <h2 ref="typingElement1" class="text-2xl font-semibold text-gray-400 mb-8"></h2>
    <h2 ref="typingElement2" class="text-2xl font-semibold text-gray-300 mb-8"></h2>

    <!-- Si l'utilisateur est connecté, afficher les informations -->
    <div v-if="user" class="card w-full max-w-lg bg-white shadow-xl p-6 mb-8 mt-20">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">User Information</h2>
      <p class="text-md text-gray-700"><strong>User Name:</strong> {{ user.name }}</p>
      <p class="text-md text-gray-700"><strong>Email:</strong> {{ user.email }}</p>
      <p class="text-md text-gray-700"><strong>Provider:</strong> {{ user.provider }}</p>
      <p class="text-md text-gray-700"><strong>ID:</strong> {{ user.id }}</p>
      <button @click="logout" class="btn btn-error w-full mt-6">Logout</button>
    </div>

    <!-- Si l'utilisateur n'est pas connecté, afficher les boutons de connexion -->
    <div v-else class="w-full max-w-md p-4">
      <div class="card bg-white shadow-xl p-6 rounded-lg">
        <h2 class="text-xl font-semibold text-center mb-6 text-gray-900">Please Sign In</h2>

        <!-- Conteneur des boutons de connexion -->
        <div class="space-y-4 flex flex-col items-center">
          <!-- Google Sign In Button -->
          <g-sign-in-button class=" max-w-xs"></g-sign-in-button>

          <!-- Microsoft Sign In Button -->
          <sign-in-button class=" max-w-xs"></sign-in-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInButton from '../components/SignInButton.vue';
import GSignInButton from "@/components/GSignInButton.vue";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SignInButton,
    GSignInButton,
  },
  data() {
    return {
      showTypingEffect: false,
      h2Titles: [
        "Retrieve and manage emails from Gmail and Outlook",
        "Streamline your workflow and stay organized",
      ]
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;  // Récupère l'utilisateur depuis le store
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async logout() {
      this.setUser(null); // Déconnexion de l'utilisateur
      await this.$store.dispatch('resetUserData'); // Réinitialise l'état de l'utilisateur
      console.log('Utilisateur déconnecté et état réinitialisé.');
    },
    startTypingEffect() {
      const h2Texts = [
        "Retrieve and manage emails from Gmail and Outlook",
        "Streamline your workflow and stay organized"
      ];

      // Lancer l'effet de frappe pour chaque titre
      h2Texts.forEach((text, index) => {
        const formattedText = text.replace(/ /g, '\u00A0');  // Remplacer les espaces par une entité Unicode

        this.$nextTick(() => {
          const element = this.$refs[`typingElement${index + 1}`]; // Référence correcte pour chaque h2
          let charIndex = 0;  // Déclare `charIndex` pour chaque élément

          if (element) {
            const typingInterval = setInterval(() => {
              if (charIndex < formattedText.length) {
                element.innerHTML += formattedText[charIndex];  // Ajoute un caractère à la fois
                charIndex++;  // Incrémente `charIndex` pour suivre le texte
              } else {
                clearInterval(typingInterval);  // Arrête l'intervalle une fois le texte ajouté
              }
            }, Math.random() * 10 + 20);  // Temps entre chaque caractère (random)
          }
        });
      });
    }
  },
  watch: {
    showTypingEffect(newValue) {
      if (newValue) {
        this.startTypingEffect();  // Démarre l'effet de frappe
      }
    }
  },
  mounted() {
    // Délai d'initialisation de l'effet de frappe après le montage du composant
    setTimeout(() => {
      this.showTypingEffect = true;  // Déclenche l'animation après un délai
    }, 1000); // Attente de 1 seconde
  }
};
</script>

<style scoped>
/* Animation de frappe (typewriter effect) */
.typing-effect {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #3b82f6;
  width: 0;
  animation: typing 1s 1s forwards, blink 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>