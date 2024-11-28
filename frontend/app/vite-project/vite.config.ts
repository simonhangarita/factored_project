import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/system", "@mui/icons-material"],
  },
  build: {
    target: "esnext", // Ensures modern syntax
    chunkSizeWarningLimit: 1000, // Adjust chunk warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate large libraries into chunks
          mui: ["@mui/material", "@mui/system", "@mui/icons-material"],
        },
      },
    },
  },
});
