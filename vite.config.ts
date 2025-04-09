import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const baseViteConfig = defineConfig({
    plugins: [react()],
    base: env.VITE_BASE_PATH || "/",
  });
  const testConfig = defineTestConfig({
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

  return mergeConfig(baseViteConfig, testConfig);

}


