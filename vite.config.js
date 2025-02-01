import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    open:true,
    
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["react-redux"],
  },
  build: {
    outDir: "dist",
  },
});
