// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
    }
  },
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  alias: {
    '@root': __dirname,
  },
  generate: {
    fallback: true
  }
})

