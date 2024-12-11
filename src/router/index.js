import { createRouter, createWebHistory } from 'vue-router'
import AddBook from '@/components/AddBook.vue'
import AppAbout from '@/components/AppAbout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout,
    },
    {
      path: '/add-book', 
      name: 'add-book',
      component: AddBook, 
    },
  ],
})

export default router
