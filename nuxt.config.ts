// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',
    prerender: {
      routes: ['/brand_1', '/brand_2']
    }
  },
  css: ['~/assets/styles/main.scss'],
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  },
  routeRules: {
    '/**': { isr: true }
  },
  modules: ['@nuxt/eslint', '@nuxt/image'],
  compatibilityDate: '2024-07-09',
  generate: {
    routes: ['/brand_1', '/brand_2']
  }
});
