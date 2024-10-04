<template>
  <base-button
      :disabled="isDisabled"
      :color="color" >
    <template v-if="isPending">
      <!-- Affiche la roue de chargement pendant l'attente -->
      <span class="spinner"></span> Loading...
    </template>
    <template v-else>
      <!-- Contenu du bouton quand non en attente -->
      <slot />
    </template>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'AsyncButton',
  components: { BaseButton },
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isPending: {
      type: Boolean,
      default: false,
    },
  },
  methods: {

  },
};
</script>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #2c3e50;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
  margin-right: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>