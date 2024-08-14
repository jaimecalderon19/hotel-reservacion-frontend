import { defineNuxtConfig } from "nuxt/config";
import { BaseUrl } from "./config";

export default defineNuxtConfig({
  ssr: false,
  modules: ["@nuxtjs/tailwindcss", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/test-utils/module'],
  plugins: ['~/plugins/api.ts'],
  build: {
    hotMiddleware: {
      client: {
        overlay: false
      }
    }
  },
    compatibilityDate: "2024-08-08",

})