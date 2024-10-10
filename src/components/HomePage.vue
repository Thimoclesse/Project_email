<template>
  <div>
    <h1>Welcome to the Home Page!</h1>

    <div v-if="currentUser">
      <p>User Name : {{ currentUser.name }}</p>
      <p>Email : {{ currentUser.username }}</p>
    </div>
    <div v-else>
      <p>Please sign in.</p>
    </div>

    <async-button
        :isDisabled="isPending"
        @click="handleAsyncClick"
        color="primary"
    >
      Click Me
    </async-button>

    <base-button @click="handleClick" color="warn">Warning Button</base-button>
    <base-button @click="handleClick" color="danger">Danger Button</base-button>
    <base-button :disabled="true">Disabled Button</base-button>
    <sign-in-button @userChanged="setUser">Sign in</sign-in-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import AsyncButton from './AsyncButton.vue';
import SignInButton from './SignInButton.vue'

export default {
  name: 'HomePage',
  components: {
    BaseButton,
    AsyncButton,
    SignInButton
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isPending: false,
      duration: 0,
      currentUser: null,
    };
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
    async handleAsyncClick() {

      this.isPending = true;
      this.duration += 2
      await new Promise((resolve) => {
        setTimeout(() => {
          alert('Async button clicked!');
          resolve();
        }, this.duration*1000);
      });

      this.isPending = false;
    },
    setUser(user){
      this.currentUser = user;
    }
  },
};
</script>

<style scoped>

</style>
