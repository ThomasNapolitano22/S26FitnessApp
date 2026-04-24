import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import LandingPageView from '../views/LandingPageView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ActivityView from '../views/DashboardViews/ActivityView.vue'
import FriendsActivity from '../views/DashboardViews/FriendsActivityView.vue'
import SearchUsersView from '../views/DashboardViews/SearchUsersView.vue'
import StatisticsView from '../views/DashboardViews/StatisticsView.vue'
import ManageUsersView from '../views/AdminViews/ManageUsersView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: LandingPageView },
        { path: '/login', name: 'login', component: LoginView },
        { path: '/signup', name: 'signup', component: SignupView },
        {
            path: '/activity',
            name: 'activity',
            component: ActivityView,
            meta: { requiresAuth: true },
        },
        {
            path: '/FriendsActivity',
            name: 'FriendsActivity',
            component: FriendsActivity,
            meta: { requiresAuth: true },
        },
        {
            path: '/SearchUsers',
            name: 'SearchUsers',
            component: SearchUsersView,
            meta: { requiresAuth: true },
        },
        {
            path: '/Statistics',
            name: 'Statistics',
            component: StatisticsView,
            meta: { requiresAuth: true },
        },
        {
            path: '/ManageUsers',
            name: 'ManageUsers',
            component: ManageUsersView,
            meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
})

router.beforeEach((to) => {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isLoggedIn) {
        return { path: '/login' }
    }
    if (to.meta.requiresAdmin && !auth.isAdmin) {
        return { path: '/' }
    }
    return true
})

export default router
