// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'
  },

  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api'
    }
  },
  routeRules: {
    '/': { redirect: '/catalog' }
  },

  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image'],
  compatibilityDate: '2024-07-09'
});
