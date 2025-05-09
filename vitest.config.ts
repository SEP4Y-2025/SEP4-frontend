import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global test functions like `describe`, `it`, etc.
    environment: "jsdom", // Simulates a browser environment for React components
  },
});