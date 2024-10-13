<template>
  <div>
    <h1>This is the Conversations Page!</h1>
    <p>Conversations will be displayed here.</p>
    <ul>
      <li><router-link :to="{ name: 'ConversationShow', params: { id: 1 } }">Conversation 1</router-link></li>
      <li><router-link :to="{ name: 'ConversationShow', params: { id: 2 } }">Conversation 2</router-link></li>
      <li><router-link :to="{ name: 'ConversationShow', params: { id: 3 } }">Conversation 3</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ConversationsIndexPage',
};
</script>

<style scoped>
li {
  display: inline-block;
  margin: 1rem;
  color: white;
  background-color: orange;
  padding: 0.7rem;
  border-radius: 0.5rem;
  text-decoration: none;
}
</style>
