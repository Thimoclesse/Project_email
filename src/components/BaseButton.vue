<template>
  <button
      :class="['base-button', { 'is-disabled': disabled }]"
      :style="buttonStyle"
      :role="role"
      :disabled="disabled"
      @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    role: { type: String, default: 'button' },
    buttonStyle: { type: Object, default: () => ({}) },
    disabled: { type: Boolean, default: false },
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault(); // Empêche l'action si désactivé
      } else {
        this.$emit('click');
      }
    },
  },
};
</script>

<style scoped>
.base-button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.2s;
  margin-left: 10px;
  margin-right: 10px;
}

.base-button:hover {
  transform: scale(1.05);
}

.base-button.is-disabled {
  background-color: #ccc;
  cursor: not-allowed; /* Panneau interdit */
}
</style>
