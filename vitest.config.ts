import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    root: fileURLToPath(new URL("./", import.meta.url)),
    coverage: {
      provider: "v8",
    },
  },
});


