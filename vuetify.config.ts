import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

export default defineVuetifyConfiguration({
  // your Vuetify options here
  theme: {
    defaultTheme: "customTheme",
    themes: {
      customTheme: {
        dark: true,
        colors: {
          background: "#201C1D",
          primary: "#7D67C1",
          secondary: "#C6EF90",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
});
