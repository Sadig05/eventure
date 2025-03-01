import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react-swc";
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg?react",})],
  server: {
    port: 5173, // You can change this to any port you prefer

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure the path points correctly to "src"
      "@pages": path.resolve(__dirname, "src/pages"),
      "@api": path.resolve(__dirname, "src/api")
    },
  },
});
