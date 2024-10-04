<template>
  <div>
    <h1>Welcome to the Home Page!</h1>
    <!-- AsyncButton sans spinner -->
    <async-button
        :isDisabled="isPending"
        @click="handleAsyncClick"
        color="primary"
    >
      Click Me
    </async-button>

    <!-- Autres boutons de base pour démonstration -->
    <base-button @click="handleClick" color="warn">Warning Button</base-button>
    <base-button @click="handleClick" color="danger">Danger Button</base-button>
    <base-button :disabled="true">Disabled Button</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import AsyncButton from './AsyncButton.vue';

export default {
  name: 'HomePage',
  components: {
    BaseButton,
    AsyncButton,
  },
  data() {
    return {
      isPending: false, // Etat pour gérer le loading
      duration: 0,
    };
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
    async handleAsyncClick() {
      // Quand on clique, le bouton devient pending (désactivé)

      this.isPending = true;
      this.duration += 2
      // Simuler une opération asynchrone (par exemple une requête réseau)
      await new Promise((resolve) => {
        setTimeout(() => {
          alert('Async button clicked!');
          resolve();
        }, this.duration*1000); // 2 secondes d'attente
      });

      // Réactiver le bouton une fois l'opération terminée
      this.isPending = false;
    },
  },
};
</script>

<style scoped>
/* Tu peux ajouter du style ici si nécessaire */
</style>
