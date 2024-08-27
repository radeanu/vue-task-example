// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	srcDir: 'src/',
	nitro: {
		preset: 'node-server'
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
	modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/tailwindcss'],
	tailwindcss: {
		exposeConfig: true,
		viewer: true
	},
	compatibilityDate: '2024-07-09',
	routeRules: {
		'/': {
			redirect: '/catalog'
		},
		'/api/**': { cors: true },
	},
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.API_BASE_URL
		}
	}
});
