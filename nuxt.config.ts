export default defineNuxtConfig({
  ssr: true,
   app: {
      head: {
          charset: 'utf-8',
          htmlAttrs: {
              lang: "en"
          },
          link: [
              { rel: 'icon',  type: "image/ico", href: '/favicon.ico' },
          ],
      }
  },
  telemetry: { enabled: false },
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