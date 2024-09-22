<template>
  <base-button
      :disabled="isPending"
      :color="color"
      @click="handleClick" >
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
  methods: {
    async handleClick() {
      this.isPending = true;
      await this.$emit('click');
      this.isPending = false;
    },
  },
};
</script>

<style scoped>

</style>
