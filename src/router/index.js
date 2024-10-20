import HomePage from '../pages/HomePage.vue';
import ConversationsIndexPage from '../pages/ConversationsIndexPage.vue';
import ConversationShowPage from '../pages/ConversationShowPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

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
    {
        path: '/conversations/:id',
        name: 'ConversationShow',
        component: ConversationShowPage,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
