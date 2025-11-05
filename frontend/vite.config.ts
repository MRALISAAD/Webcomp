import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      }
    },
    server: {
      port: 5173,
      open: false,
      host: true,
      proxy: env.VITE_PROXY_API
        ? {
            "/api": {
              target: env.VITE_PROXY_API,
              changeOrigin: true
            }
          }
        : undefined
    },
    build: {
      outDir: "dist",
      sourcemap: mode !== "production",
      minify: "esbuild",
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            ui: ["framer-motion", "lucide-react"],
            i18n: ["react-i18next", "i18next"],
          }
        }
      }
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom", "framer-motion"]
    }
  };
});
