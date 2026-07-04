import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.tsx"],
    include: ["tests/**/*.test.{ts,tsx}"],
    css: false,
  },
  resolve: {
    alias: {
      "@payload-config": path.resolve(__dirname, "tests/mocks/payload-config.ts"),
      "@": path.resolve(__dirname, "."),
    },
  },
});
