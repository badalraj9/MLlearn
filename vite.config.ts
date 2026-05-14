import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api/arxiv": {
        target: "https://export.arxiv.org/api/query",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/arxiv/, ""),
        headers: {
          "User-Agent":
            "MLearn/1.0 (mathematical reading environment; mailto:research@mlearn.dev)",
        },
      },
    },
  },
});
