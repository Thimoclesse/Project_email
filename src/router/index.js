import { createRouter, createWebHistory } from 'vue-router';

// Import your components or views
import HomePage from '../components/HomePage.vue';
import ConversationsIndexPage from '../components/ConversationsIndexPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/conversations',
        name: 'Conversations',
        component: ConversationsIndexPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
