// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/supabase', '@pinia/nuxt'],

  ui: {
      theme: {
        colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
      }
    },

  css: ['~/assets/css/main.css'],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      cookieRedirect: true,
      exclude: ['/*']
    },
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-02-10',
})