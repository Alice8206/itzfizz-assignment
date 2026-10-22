import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built site work from any sub-path (e.g. GitHub Pages /repo-name/)
export default defineConfig({
  plugins: [react()],
  base: "./",
});
