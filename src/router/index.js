import HomePage from '../components/HomePage.vue';
import ConversationsIndexPage from '../components/ConversationsIndexPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store'; // Import the Vuex store

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
    },
    {
        path: '/conversations',
        name: 'Conversations',
        component: ConversationsIndexPage,
        beforeEnter: (to, from, next) => {
            const isAuthenticated = !!store.getters.currentUser;
            if (!isAuthenticated) {
                next({ name: 'Home' });
                console.log("Please authetificate before")

            } else {
                next();
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
