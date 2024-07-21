import tsconfigPath from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  catch: true,
  plugins: [tsconfigPath()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
});
