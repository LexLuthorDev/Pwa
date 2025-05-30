import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        importScripts: ["custom-sw-push-handler.js"],
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
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
