import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  /*server: {
    allowedHosts: [
      "d44d-45-160-89-106.ngrok-free.app", // coloque seu host atual do ngrok aqui
    ],
  },*/
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "frontend",
        short_name: "frontend",
        description: "descrição",
        theme_color: "#2da1c4",
        icons: [
          {
            src: "icon_144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icon_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
