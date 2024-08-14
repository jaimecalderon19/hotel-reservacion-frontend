
import { AuthenticationStore } from '../stores/Authentication'
import { BaseUrl } from '../config'
import { defineNuxtPlugin, navigateTo } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = AuthenticationStore()

  nuxtApp.hook('app:created', () => {
    const defaultOptions = {
      baseURL: BaseUrl + '/api',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }

    nuxtApp.$fetch = $fetch.create(defaultOptions)

    const apiFetch = async (url, options = {}) => {
      const token = authStore.token

      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }

      try {
        return await nuxtApp.$fetch(url, options)
      } catch (error) {
        if (error.response?.status === 401) {
          await navigateTo('/login')
          authStore.logout()
        }
        throw error
      }
    }

    nuxtApp.provide('api', {
      get: (url, params) => apiFetch(url, { method: 'GET', params }),
      post: (url, body) => apiFetch(url, { method: 'POST', body }),
      put: (url, body) => apiFetch(url, { method: 'PUT', body }),
      patch: (url, body) => apiFetch(url, { method: 'PATCH', body }),
      delete: (url) => apiFetch(url, { method: 'DELETE' }),
    })
  })
})