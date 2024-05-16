// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server'
  },
  vite: {
    vue: {
      customElement: true,
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('swiper-')
        }
      }
    },
    vueJsx: {
      mergeProps: true
    }
  },
  runtimeConfig: {
    apiSecret: '123',
    public: {
      apiBase: '/api'
    }
  },
  css: ['~/assets/styles/main.scss'],
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image']
});
