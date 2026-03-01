import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // This only works during 'npm run dev'
      "/api": {
        target: "https://jobportal-backend-production-a02e.up.railway.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});