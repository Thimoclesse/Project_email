<template>
  <div>
    <h1>Welcome to the Home Page!</h1>

    <div v-if="user">
      <p>User Name : {{ user.name }}</p>
      <p>Email : {{ user.username }}</p>
    </div>
    <div v-else>
      <p>Please sign in.</p>
    </div>
    <sign-in-button>Sign in</sign-in-button>
  </div>
</template>

<script>
import SignInButton from '../components/SignInButton.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    SignInButton
  },
  computed: {
    ...mapGetters(['currentUser']),
    user() {
      return this.currentUser;
    }
  },
};
</script>

<style scoped>

</style>
