import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, etc.
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Simulates a browser environment for React components
  },
});
