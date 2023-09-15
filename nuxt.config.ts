// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  pages: true,

  modules: [
    '@nuxt/ui',
    // '@nuxtjs/supabase',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],

  googleFonts: {
    download: true,
    families: {
      'DM+Sans': [400, 500, 700],
    },
  },

  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL,
    },
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
});
