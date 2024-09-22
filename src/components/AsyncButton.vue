<template>
  <base-button
      :disabled="isPending"
      :color="color">
    <slot />
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
  },
  data() {
    return {
      isPending: false,
    };
  },
};
</script>

<style scoped>

</style>
