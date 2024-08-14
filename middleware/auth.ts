import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import { useAuthStore } from '../stores/useAuthStore'

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if (!auth.user?.name) {
    return navigateTo('/login');
  }
})

