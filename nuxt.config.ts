export default defineNuxtConfig({
  ssr: true,
   app: {
      head: {
          charset: 'utf-8',
          htmlAttrs: {
              lang: "en"
          },
          titleTemplate: '%s',
          link: [
              { rel: 'icon',  type: "image/x-icon", href: '/favicon.ico' },
              { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
              { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
          ],
          meta: [
              { name: 'viewport', content: 'width=device-width, initial-scale=1' },
              { name: 'theme-color', content: '#0e2338' },
              { name: 'format-detection', content: 'telephone=yes' },
              { property: 'og:site_name', content: 'Airport Bansko Transfer' },
              { property: 'og:locale', content: 'en_GB' },
          ],
      }
  },
  telemetry: { enabled: false },
  // Pre-render every public page to static HTML so search engines and AI
  // crawlers (most of which do not run JavaScript) see the full content.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/transfers/sofia-airport-to-bansko',
        '/transfers/plovdiv-airport-to-bansko',
        '/transfers/thessaloniki-airport-to-bansko',
        '/transfers/kavala-airport-to-bansko',
      ],
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-12-05',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiBase: 'https://airportbanskotransfer.com/api/',
      appUrl: 'https://airportbanskotransfer.com'
    }
  },
  // CSS configuration
  css: [
    '@mdi/font/css/materialdesignicons.min.css', // Keep MDI CSS
    '~/assets/css/theme.css'
  ],
  
  modules: [
    'nuxt-vuetify',
    'nuxt-gtag'
  ],

  gtag: {
    id: 'G-Z1E1YM774X',
    enabled: true
  },

  vuetify: {
    labsComponents: true,
    theme: {
      light: true,
      themes: {
        light: {
          colors: {
            /*
            background: '#f8f9fa',
            surface: '#ffffff',
            primary: '#37b6ff',
            'primary-darken-1': '#2a5cb0',
            secondary: '#6c757d',
            'secondary-darken-1': '#5a6268',
            accent: '#17a2b8',
            error: '#dc3545',
            info: '#17a2b8',
            success: '#28a745',
            warning: '#ff9800',
            'card-bg': '#ffffff',
            'text-primary': '#212529',
            'text-secondary': '#6c757d',
            'light-blue': '#e8f4fd',
            'light-green': '#eaf7ed',
            'light-gray': '#f8f9fa'
            */
          }
        }
      }
    }
  },
})