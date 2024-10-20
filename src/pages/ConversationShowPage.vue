<template>
  <div>
    <h1>Conversation Details</h1>
    <p>Conversation ID: {{ conversationId }}</p>
    <p>You can chat here !</p>
  </div>
</template>

<script>
export default {
  name: 'ConversationShowPage',
  computed: {
    conversationId() {
      return this.$route.params.id;
    }
  }
};
</script>

<style scoped>

</style>
