<template>
  <button
      :class="['base-button', colorClass, { 'is-disabled': disabled }]"
      :style="buttonStyle"
      :role="role"
      :disabled="disabled"
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
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'warn', 'danger'].includes(value),
    },
  },
  computed: {
    colorClass() {
      return `button-${this.color}`;
    },
  },
};
</script>

<style scoped>
.base-button {
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.2s;
  margin-right: 1rem;
  margin-left: 1rem;
}

.button-primary {
  background-color: #42b983;
}

.button-warn {
  background-color: #ff5722;
}

.button-danger {
  background-color: #e53935;
}

.base-button:hover:not(.is-disabled) {
  transform: scale(1.05);
}

.base-button:focus {
  outline: 2px solid;
}

.is-disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>