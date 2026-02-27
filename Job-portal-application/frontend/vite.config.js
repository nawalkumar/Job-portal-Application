import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // All /api requests go to your EC2 backend
      "/api": {
        target: "http://13.233.244.117:5011",
        changeOrigin: true,
        secure: false,
        // Optional: rewrite if needed (not required in your case)
        // rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})