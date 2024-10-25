import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import vue3GoogleLogin from 'vue3-google-login';
import { initGmailApi } from '@/lib/GmailService'; // Assurez-vous que c'est le bon nom de fonction

const CLIENT_ID = "880522436612-6q98chguavsdr75pafkhog9do0ck3ssi.apps.googleusercontent.com";

createApp(App)
    .use(store)
    .use(router)
    .use(vue3GoogleLogin, { clientId: CLIENT_ID })
    .mount('#app');

// Initialisation de l'API Gmail
initGmailApi().then(() => {
    console.log("API Gmail initialisée");
}).catch(error => {
    console.error("Erreur lors de l'initialisation de l'API Gmail :", error);
});
