import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://cut2short-frontend.onrender.com',
  server: {
    port: 3000,
    open:true,
    
  },
  optimizeDeps: {
    include: ["react-redux"],
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: 'esbuild',
  },
});
