import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from "@/pages/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/posts',
    name: 'posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/PostPage.vue')
  },
  {
    path: '/posts/:id',
    component: () => import('../pages/PostIdPage.vue')
  },
  {
    path: '/store',
    component: () => import('../pages/PostPageWithStore.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
