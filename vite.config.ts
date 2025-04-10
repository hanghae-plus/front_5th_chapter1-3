import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const mode = process.env.NODE_ENV || "development";
const env = loadEnv(mode, process.cwd(), "");

const viteConfig = defineConfig({
  plugins: [react()],
  base: env.VITE_BASE_URL,
});

const vitestConfig = defineTestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reportsDirectory: "./.coverage",
      reporter: ["lcov", "json", "json-summary"],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
