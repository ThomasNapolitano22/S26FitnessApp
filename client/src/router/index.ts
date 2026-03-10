import { createRouter, createWebHistory } from 'vue-router'
import LandingPageView from '../views/LandingPageView.vue'
import ActivityView from '../views/DashboardViews/ActivityView.vue'
import FriendsActivity from '../views/DashboardViews/FriendsActivityView.vue'
import SearchUsersView from '../views/DashboardViews/SearchUsersView.vue'
import StatisticsView from '../views/DashboardViews/StatisticsView.vue'
import ManageUsersView from '../views/AdminViews/ManageUsersView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPageView,
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView
    },
    {
      path: '/FriendsActivity',
      name: 'FriendsActivity',
      component: FriendsActivity
    },
    {
      path: '/SearchUsers',
      name: 'SearchUsers',
      component: SearchUsersView
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: StatisticsView
    },
    {
      path: '/ManageUsers',
      name: 'ManageUsers',
      component: ManageUsersView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView
    }

  ],
})

export default router
