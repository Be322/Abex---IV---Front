// https://nuxt.com/docs/api/configuration/nuxt-config

const temaCustomizado = {
  dark: false,
  colors: {
    background: '#660000',
    vish: '#7f181d',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
};

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module", '@nuxt/eslint'],
  plugins: ['~/plugins/axios.js'],

  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          temaCustomizado,
        },
      },
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true || false,
      useIconCDN: false,

      /* vite-plugin-vuetify options */
      autoImport: true || false,
      useVuetifyLabs: false,
    },
  },

  compatibilityDate: '2024-11-10',
})