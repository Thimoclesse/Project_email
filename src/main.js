import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router'; // Import the router
import vue3GoogleLogin from 'vue3-google-login';

const CLIENT_ID = "42721855293-7h66ak5gcspj2cpvogs8or479uvbbnsk.apps.googleusercontent.com";

createApp(App)
    .use(store)
    .use(router)
    .use(vue3GoogleLogin, { clientId: CLIENT_ID }) // Ajout de vue3GoogleLogin
    .mount('#app');