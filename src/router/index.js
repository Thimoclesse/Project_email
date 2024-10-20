import HomePage from '../pages/HomePage.vue';
import MailIndexPage from '../pages/MailIndexPage.vue';
import MailShowPages from '../pages/MailShowPage.vue';
import MailCreatePage from '../pages/MailCreatePage.vue';  // Importation de la page de création d'email
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/mail',
        name: 'MailIndex',
        component: MailIndexPage,
        meta: { requiresAuth: true },  // Protection par authentification
    },
    {
        path: '/mail/:id',
        name: 'MailShow',
        component: MailShowPages,
        meta: { requiresAuth: true },  // Protection par authentification
    },
    {
        path: '/create',  // Route pour la création d'un nouvel email
        name: 'MailCreate',
        component: MailCreatePage,
        meta: { requiresAuth: true },  // Protection par authentification
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!store.getters.currentUser;  // Vérifie si l'utilisateur est authentifié
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Si la route nécessite une authentification et que l'utilisateur n'est pas authentifié
        if (!isAuthenticated) {
            console.log("Please authenticate before accessing this page");
            next({ name: 'Home' });  // Redirection vers la page d'accueil
        } else {
            next();  // Continue vers la route
        }
    } else {
        next();  // Si aucune authentification n'est requise, continuer
    }
});

export default router;
